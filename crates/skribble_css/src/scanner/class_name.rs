use indexmap::IndexSet;
use std::{
  cmp::Ordering,
  hash::{Hash, Hasher},
};

use swc_ecmascript::{
  ast::{Ident, MemberExpr, MemberProp},
  utils::Id,
};

use crate::{
  config::{user::CssValue, Config},
  constants::INDENTATION,
  utils::{escape_css_string, get_css_variables_from_string, get_identifiers, indent},
};

#[derive(Debug, Clone)]
pub enum Validity {
  Valid,
  Invalid,
  Undefined,
}

enum ScoreMultiple {
  Value = 1,
  Atom = 100,
  Modifier = 10_000,
  ParentModifier = 100_000,
  MediaQuery = 1_000_000,
  Breakpoint = 10_000_000,
}

#[derive(Debug, Clone)]
pub enum ClassArguments {
  Value(String),
  KeyValue(String, String),
}

impl ClassArguments {
  pub fn from_string(value: &str) -> Option<Self> {
    let mut changes: i8 = 0;
    let mut temp_value = value.trim();

    if temp_value.starts_with('[') {
      changes += 1;
      temp_value = &temp_value[1..];
    }

    if temp_value.ends_with(']') {
      changes += 1;
      temp_value = &temp_value[..temp_value.len() - 1];
    }

    // If brackets are not balanced, return None
    if (changes % 2) != 0 {
      return None;
    }

    let segments = temp_value.split(r"\:").collect::<Vec<_>>();

    match segments.len() {
      1 => segments
        .first()
        .map(|segment| ClassArguments::Value(segment.to_string())),
      2 => {
        let key = if let Some(segment) = segments.first() {
          *segment
        } else {
          return None;
        };

        let value = if let Some(segment) = segments.last() {
          *segment
        } else {
          return None;
        };

        Some(ClassArguments::KeyValue(key.to_owned(), value.to_owned()))
      }
      _ => None,
    }
  }

  pub fn from_value(value: &str) -> Self {
    Self::Value(escape_css_string(value.trim()))
  }

  pub fn from_key_value(key: &str, value: &str) -> Self {
    Self::KeyValue(
      escape_css_string(key.trim()),
      escape_css_string(value.trim()),
    )
  }

  pub fn get_string(&self) -> String {
    match self {
      ClassArguments::Value(value) => value.to_string(),
      ClassArguments::KeyValue(key, value) => format!(r"{}\:{}", key, value),
    }
  }

  pub fn get_value(&self) -> String {
    match self {
      ClassArguments::Value(value) => value.to_string(),
      ClassArguments::KeyValue(_, value) => value.to_string(),
    }
  }
}

/// This struct is used to create the class name and it stores the tokens.
#[derive(Debug, Clone)]
#[readonly::make]
pub struct ClassName<'config> {
  /// The name of the breakpoint provided if it exists.
  pub breakpoint: Option<String>,

  /// The name of the media query.
  pub media_query: Option<String>,

  /// The parent modifiers.
  pub parent_modifier: Option<String>,

  /// The ordered list of modifiers.
  pub modifiers: Vec<String>,

  /// The group for this atom.
  pub groups: Vec<String>,

  /// The keyframes for this atom.
  pub keyframes: Vec<String>,

  /// The name of the style provided. This must be provided for the `class_name`
  /// to be valid.
  pub atom: Option<String>,

  /// The pre-configured value of the atom. These always start with a `$`
  /// symbol.
  pub style_name: Option<String>,

  /// A shorthand style_name which begins with the `$` symbol but doesn't have a
  /// style atom attached.
  ///
  /// ```ts
  /// import { c } from 'skribble-css'
  /// c.$block // $block is the shorthand style name.
  /// c.display.$block // The same as above.
  /// ```
  pub shorthand: Option<String>,

  /// This is the callable argument when the provided value is a callable
  /// expression.
  pub argument: Option<ClassArguments>,

  /// Whether this class name is valid. Starts off as `false`.
  pub validity: Validity,

  /// This is captured when the style_name, or shorthand, or argument is added.
  pub value: Option<CssValue>,

  /// This is used to order the class names.
  pub score: isize,

  /// The configuration provided.
  #[readonly]
  config: &'config Config,
}

impl<'config> ClassName<'config> {
  /// Create a new class name builder.
  pub fn new(config: &'config Config) -> Self {
    Self {
      groups: vec![],
      keyframes: vec![],
      breakpoint: None,
      media_query: None,
      parent_modifier: None,
      modifiers: vec![],
      shorthand: None,
      atom: None,
      style_name: None,
      argument: None,
      validity: Validity::Undefined,
      value: None,
      score: 0,
      config,
    }
  }

  /// Take a string as it appears in the dom (without any of the escape
  /// characters) and turn it into a class name.
  pub fn from_dom_string(config: &'config Config, value: &str) -> Self {
    let mut class_name = Self::new(config);
    // Split the string into the tokens and the arguments / values.
    let segments = value.split("::").collect::<Vec<_>>();

    match segments.len() {
      1 => {
        if let Some(segment) = segments.first() {
          get_value_or_argument_from_segment(segment, &mut class_name);
        }
      }
      2 => {
        if let Some(segment) = segments.first() {
          segment.split(':').for_each(|token| {
            class_name.add_token(token);
          });
        }

        if let Some(segment) = segments.last() {
          get_value_or_argument_from_segment(segment, &mut class_name);
        }
      }
      _ => {
        class_name.validity = Validity::Invalid;
      }
    }

    class_name
  }

  /// Create a class name from a member expression.
  pub fn from_member_expression(
    config: &'config Config,
    member: &MemberExpr,
    import_ids: &IndexSet<Id>,
  ) -> Option<Self> {
    let mut identifiers: Vec<Ident> = Vec::new();
    let is_valid = get_identifiers(&*member.obj, &mut identifiers, import_ids);

    // Exit early if invalid.
    if !is_valid {
      return None;
    }

    if let MemberProp::Ident(identifier) = &member.prop {
      identifiers.push(identifier.clone());
    } else {
      // This shouldn't really be possible, as far as I can tell. I'm returning
      // `None` if there is no end prop on the member expression, but there
      // should always be one.
      return None;
    };

    let mut class_name = ClassName::new(config);

    // Add all the tokens to the class_name.

    for identifier in identifiers {
      class_name.add_token(&identifier.sym);
    }

    Some(class_name)
  }

  /// Get the string representation of the selector for this `ClassName`.
  ///
  /// - Convert `["sm", "focus", "text", "red"]` -> `"sm\:-textRed:focus"`
  /// - Convert `tokens: ["sm", "p"], argument: "100px"` -> `"sm\:p:-\[100px\]"`
  pub fn get_selector(&self) -> String {
    let mut tokens = vec![];

    if let Some(breakpoint) = &self.breakpoint {
      tokens.push(breakpoint.to_string());
    }

    if let Some(media_query) = &self.media_query {
      tokens.push(media_query.to_string());
    }

    if let Some(parent_modifier) = &self.parent_modifier {
      tokens.push(parent_modifier.to_string());
    }

    for modifier in self.modifiers.iter() {
      tokens.push(modifier.to_string())
    }

    if let Some(atom) = &self.atom {
      tokens.push(atom.to_string());
    }

    let mut selector = format!(".{}", tokens.join(r"\:"));

    let prefix = if tokens.is_empty() { "" } else { r"\:\:" };

    if let Some(shorthand) = &self.shorthand {
      // Append the shorthand.
      selector = format!(r"{}{}\${}", selector, prefix, shorthand);
    } else if let Some(style_name) = &self.style_name {
      // Append the style name.
      selector = format!(r"{}{}\${}", selector, prefix, style_name);
    } else if let Some(argument) = &self.argument {
      // Append an argument if it exists.
      selector = format!(r"{}{}\[{}\]", selector, prefix, argument.get_string());
    }

    let mut selectors = vec![selector];

    for modifier in self.modifiers.iter() {
      if let Some(modifiers) = self.config.modifiers_map.get(modifier) {
        let mut new_selectors = vec![];

        for modifier in modifiers {
          for selector in &selectors {
            new_selectors.push(modifier.replace('&', selector));
          }
        }

        if !new_selectors.is_empty() {
          selectors = new_selectors;
        }
      }
    }

    // Handle the parent modifier.
    if let Some(parent_modifier) = &self.parent_modifier {
      if let Some(modifiers) = self.config.user.parent_modifiers.get(parent_modifier) {
        let mut new_selectors = vec![];

        for modifier in modifiers {
          for selector in &selectors {
            new_selectors.push(modifier.replace('&', selector));
          }
        }

        if !new_selectors.is_empty() {
          selectors = new_selectors;
        }
      }
    }

    selectors.join(", ")
  }

  pub fn is_valid(&self) -> bool {
    matches!(&self.validity, Validity::Valid)
  }

  pub fn is_invalid(&self) -> bool {
    matches!(&self.validity, Validity::Invalid)
  }

  fn get_style_declaration(&self) -> String {
    let mut style_declarations: Vec<String> = vec![];

    if let Some(atom) = &self.atom {
      if let Some(style_rules) = &self.config.user.style_rules.get(atom) {
        for rule in *style_rules {
          style_declarations.push(rule.get_style_declaration_as_ref(self.value.as_ref()));
        }
      };
    }

    if let Some(shorthand) = &self.shorthand {
      if let Some(style_rules) = &self.config.user.shorthand.get(shorthand) {
        for rule in *style_rules {
          style_declarations.push(rule.get_style_declaration(None));
        }
      };
    }

    style_declarations.join(";\n")
  }

  pub fn variables(&self) -> IndexSet<String> {
    let mut variables = get_css_variables_from_string(&self.get_style_declaration());

    for name in self.keyframes.iter() {
      if let Some(keyframe) = self.config.user.keyframes.get(name) {
        variables.extend(keyframe.get_css_variables_names(name))
      }
    }

    for name in self.groups.iter() {
      if let Some(group) = self.config.user.groups.get(name) {
        variables.extend(group.get_css_variables_names(&[]))
      }
    }

    variables
  }

  pub fn get_css(&self) -> String {
    let selector = self.get_selector();
    let mut style_declaration = self.get_style_declaration();
    if !style_declaration.is_empty() {
      style_declaration = format!("\n{};\n", indent(&style_declaration, INDENTATION));
    }

    format!("{} {{{}}}", selector, style_declaration)
  }

  /// Add a token to the class name. The token will be transformed to kebab
  /// case.
  pub fn add_token(&mut self, token: &str) {
    if self.is_invalid() {
      println!("Warning: 'ClassName' is already {:?}.", &self.validity);
      return;
    }

    let token_string = token.to_string();

    // Handle the breakpoint case.
    if self.config.user.breakpoints.keys().any(|v| v == token) {
      match &self.breakpoint {
        Some(value) => {
          self.validity = Validity::Invalid;
          println!(
            "Warning: Multiple breakpoints provided: {} and {}",
            value, token
          );
        }
        None => {
          let mut increment = 0;
          if let Some(position) = self
            .config
            .user
            .breakpoints
            .keys()
            .position(|name| name == token)
          {
            increment = calculate_score_increment(ScoreMultiple::Breakpoint, position);
          }
          self.score += increment;
          self.breakpoint = Some(token_string);
        }
      }

      return;
    }

    if self.config.user.media_queries.keys().any(|v| v == token) {
      match &self.media_query {
        Some(value) => {
          self.validity = Validity::Invalid;
          println!(
            "Warning: Multiple media queries provided: {} and {}",
            value, token
          );
        }

        None => {
          let mut increment = 0;
          if let Some(position) = self
            .config
            .user
            .media_queries
            .keys()
            .position(|name| name == token)
          {
            increment = calculate_score_increment(ScoreMultiple::MediaQuery, position);
          }
          self.score += increment;
          self.media_query = Some(token_string);
        }
      }

      return;
    }

    // Handle parent modifiers.
    if self.config.user.parent_modifiers.keys().any(|v| v == token) {
      match &self.parent_modifier {
        Some(_) => {
          self.validity = Validity::Invalid;
          println!("Warning: Multiple parent modifiers provided: {}", token);
          return;
        }
        None => {
          let mut increment = 0;
          if let Some(position) = self
            .config
            .user
            .parent_modifiers
            .keys()
            .position(|name| name == token)
          {
            increment = calculate_score_increment(ScoreMultiple::ParentModifier, position);
          }

          self.score += increment;
          self.parent_modifier = Some(token_string);
        }
      }

      return;
    }

    // Handle modifiers.
    if self.config.modifiers.contains(&token_string) {
      if self.modifiers.contains(&token_string) {
        self.validity = Validity::Invalid;
        println!("Warning: Multiple modifiers provided: {}", token);
        return;
      }

      let mut increment = 0;
      if let Some(position) = self.config.modifiers.iter().position(|name| name == token) {
        increment = calculate_score_increment(ScoreMultiple::Modifier, position);
      }

      self.score += increment;
      self.modifiers.push(token_string);

      if self.modifiers.len() > 1 {
        self.modifiers.sort_by(|a, z| {
          let a_score = self
            .config
            .modifiers
            .iter()
            .position(|name| name == a)
            .unwrap();
          let z_score = self
            .config
            .modifiers
            .iter()
            .position(|name| name == z)
            .unwrap();

          a_score.cmp(&z_score)
        });
      }

      return;
    }

    // Handle style_name
    if token.starts_with('$') {
      // Strip the leading '$' from the token
      let cleaned_token = &token_string[1..];

      if let Some(atom) = &self.atom {
        match &self.style_name {
          Some(value) => {
            self.validity = Validity::Invalid;
            println!(
              "Warning: Multiple style names (beginning with '$') provided: '{}' and '{}'. Only \
               one is permitted.",
              value, token
            );
          }
          None => {
            if let Some((position, _, value)) = self
              .config
              .atoms
              .get(atom)
              .and_then(|meta| meta.values.get_full(cleaned_token))
            {
              self.score += calculate_score_increment(ScoreMultiple::Value, position);
              self.style_name = Some(cleaned_token.to_string());
              self.value = Some(value.clone());
              self.validity = Validity::Valid; // Set to be valid.
            };
          }
        }
      } else {
        match &self.shorthand {
          Some(value) => {
            self.validity = Validity::Invalid;
            println!(
              "Warning: Multiple shorthand values (beginning with '$') provided: '{}' and '{}'. \
               Only one is permitted.",
              value, token
            );
          }
          None => {
            // Value is already defined for shorthand so can be left as none.
            self.shorthand = Some(cleaned_token.to_string());
            self.validity = Validity::Valid; // Set to be valid.
          }
        }
      }

      return;
    }

    // Handle the style atom case.
    match &self.atom {
      Some(value) => {
        self.validity = Validity::Invalid;
        println!(
          "Warning: Multiple atoms provided: '{}' and '{}'. Only one is permitted.",
          value, token
        );
      }
      None => {
        if let Some((position, name, meta)) = self.config.atoms.get_full(token) {
          self.score += calculate_score_increment(ScoreMultiple::Atom, position);
          self.keyframes = meta.keyframes.clone();
          self.groups = meta.groups.clone();
          self.atom = Some(token_string);
        }
      }
    }
  }

  /// Add multiple tokens.
  pub fn add_tokens(&mut self, slice: &[&str]) {
    for token in slice {
      self.add_token(*token);
    }
  }

  /// Add a callable argument to the class name.
  ///
  /// TODO escape the provided argument.
  pub fn add_arguments(&mut self, arguments: ClassArguments) {
    if self.is_invalid() {
      println!("Warning: 'ClassName' is already invalid.");
      return;
    }

    if self.style_name.is_some() || self.shorthand.is_some() {
      println!("Arguments are not supported for this `ClassName`.");
      return;
    }

    let mut increment = 0;
    if let Some(atom) = &self.atom {
      self.config.atoms.get(atom).iter().for_each(|meta| {
        increment = calculate_score_increment(ScoreMultiple::Value, meta.values.len());
      });
    }

    self.score += increment;
    self.value = Some(CssValue::String(arguments.get_value()));
    self.argument = Some(arguments);
    self.validity = Validity::Valid;
  }
}

fn get_value_or_argument_from_segment(segment: &str, class_name: &mut ClassName) {
  if segment.starts_with('$') {
    class_name.add_token(segment);
  } else if let Some(args) = ClassArguments::from_string(segment) {
    class_name.add_arguments(args);
  } else {
    class_name.validity = Validity::Invalid;
  }
}

impl<'config> PartialEq for ClassName<'_> {
  fn eq(&self, other: &Self) -> bool {
    self.get_selector() == other.get_selector()
  }
}

impl<'config> Eq for ClassName<'_> {}

impl<'config> Hash for ClassName<'_> {
  fn hash<H: Hasher>(&self, state: &mut H) {
    self.get_selector().hash(state);
  }
}

impl<'config> Ord for ClassName<'_> {
  fn cmp(&self, other: &Self) -> Ordering {
    self.score.cmp(&other.score)
  }
}

impl<'config> PartialOrd for ClassName<'_> {
  fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
    Some(self.cmp(other))
  }
}

fn calculate_score_increment(multiple: ScoreMultiple, position: usize) -> isize {
  let _multiple = multiple as isize;
  _multiple * (position as isize)
}

#[cfg(test)]
mod tests {
  use crate::test_utils::create_config;

  use super::*;

  #[test]
  fn can_compare() {
    let config = create_config(None).unwrap();
    let mut class_name1 = ClassName::new(&config);
    let mut class_name2 = ClassName::new(&config);

    class_name1.add_tokens(&["p", "$px"]);
    class_name2.add_token("p");
    class_name2.add_arguments(ClassArguments::from_value("100px"));
    assert!(class_name1 < class_name2);
  }

  #[test]
  fn can_add_tokens() {
    let config = create_config(None).unwrap();
    let mut class_name = ClassName::new(&config);

    class_name.add_tokens(&["p", "$px"]);
    pretty_assertions::assert_eq!(class_name.atom, Some("p".to_string()));
    pretty_assertions::assert_eq!(class_name.style_name, Some("px".to_string()));
  }

  #[test]
  fn get_selector_from_shorthand() {
    let config = create_config(None).unwrap();
    let mut class_name = ClassName::new(&config);

    class_name.add_tokens(&["$block"]);
    insta::assert_snapshot!(&class_name.get_selector(), @r".\$block");
  }

  #[test]
  fn get_selector_with_modifiers() {
    let config = create_config(None).unwrap();
    let mut class_name = ClassName::new(&config);

    class_name.add_tokens(&["sm", "focus", "active", "p", "$px"]);
    insta::assert_snapshot!(&class_name.get_selector(), @r###".sm\:active\:focus\:p\:\:\$px:active:focus"###);
  }

  #[test]
  fn get_selector_maintains_modifiers_order() {
    let config = create_config(None).unwrap();
    let mut class_name1 = ClassName::new(&config);
    let mut class_name2 = ClassName::new(&config);

    class_name1.add_tokens(&["sm", "focus", "active", "p", "$px"]);
    class_name2.add_tokens(&["sm", "active", "focus", "p", "$px"]);
    pretty_assertions::assert_eq!(class_name1.get_selector(), class_name2.get_selector());
  }

  #[test]
  fn get_selector_with_multiple_modifiers() {
    let config = create_config(None).unwrap();
    let mut class_name = ClassName::new(&config);

    class_name.add_tokens(&["sm", "readOnly", "p", "$px"]);
    insta::assert_snapshot!(
      &class_name.get_selector(),
      @r###".sm\:readOnly\:p\:\:\$px[aria-readonly=true], .sm\:readOnly\:p\:\:\$px[readonly], .sm\:readOnly\:p\:\:\$px:read-only"###
    );
  }

  #[test]
  fn get_selector_with_parent_modifiers() {
    let config = create_config(None).unwrap();
    let mut class_name = ClassName::new(&config);

    class_name.add_tokens(&["sm", "groupActive", "focus", "active", "p", "$px"]);
    insta::assert_snapshot!(&class_name.get_selector(),@r###".\$group:active .sm\:groupActive\:active\:focus\:p\:\:\$px:active:focus, .group:active .sm\:groupActive\:active\:focus\:p\:\:\$px:active:focus, [role='group']:active .sm\:groupActive\:active\:focus\:p\:\:\$px:active:focus"###);
  }

  #[test]
  fn get_css_from_shorthand() {
    let config = create_config(None).unwrap();
    let mut class_name = ClassName::new(&config);

    class_name.add_tokens(&["$block"]);
    insta::assert_snapshot!(class_name.get_css(), @r###"
    .\$block {
      display: block;
    }
    "###);
  }
}
