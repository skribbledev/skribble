use heck::ToKebabCase;
use indexmap::{IndexMap, IndexSet};
use serde::{Deserialize, Serialize};

use crate::{
  constants::{INDENTATION, ROOT_SELECTOR},
  utils::{get_css_variables_from_string, indent},
  Error, Result,
};

use super::color_utils::convert_css_value_to_color;

pub type MediaQueries = IndexMap<String, String>;
pub type Modifiers = IndexMap<String, Vec<String>>;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct UserConfig {
  /// General options.
  pub options: Options,

  /// Set up the style rules which determine the styles that each atom name will
  /// correspond to.
  pub style_rules: IndexMap<String, Vec<StyleRule>>,

  /// Shorthand properties.
  pub shorthand: IndexMap<String, Vec<StyleRule>>,

  /// Group properties.
  pub groups: IndexMap<String, Group>,

  /// Color palette taken from tailwind colors / openColor or something custom.
  pub palette: IndexMap<String, String>,

  pub keyframes: IndexMap<String, Keyframes>,

  /// The breakpoints used to provide responsive styles.
  pub breakpoints: IndexMap<String, CssValue>,

  /// Custom media queries. Each item in the vector is a media query grouping.
  ///
  /// Each grouping is mutually exclusive when applied.
  ///
  /// ```json
  /// {
  ///   "mediaQueries": [
  ///     { "print": "print" },
  ///     { "portrait": "(orientation: portrait)", "landscape": "(orientation: landscape)" }
  ///   ]
  /// }
  /// ```
  pub media_queries: MediaQueries,

  /// Modifiers are used to nest styles within a selector.
  pub parent_modifiers: Modifiers,

  /// Modifiers are used to nest styles within a selector.
  pub modifiers: Vec<Modifiers>,

  /// The colors used. They will be transformed into the format specified in the
  /// `Options` struct.
  pub colors: IndexMap<String, CssVariable>,

  /// All the atomic styles available.
  pub atoms: Vec<Atom>,

  /// Custom CSS variables.
  pub variables: IndexMap<String, CssVariable>,
}

impl UserConfig {
  pub fn new(json: &str) -> Result<Self> {
    let config: Self =
      serde_json::from_str(json).map_err(|source| Error::InvalidConfig { source })?;
    Ok(config)
  }
}

type Frames = IndexMap<String, IndexMap<String, String>>;

#[derive(Serialize, Deserialize, Debug, PartialEq, Clone)]
#[serde(untagged)]
pub enum Keyframes {
  Frame(Frames),
}

impl Keyframes {
  pub fn get_css(&self, name: &str) -> String {
    match self {
      Keyframes::Frame(frames) => {
        let mut sections: Vec<String> = vec![];

        for (key, styles) in frames.iter() {
          let mut declarations: Vec<String> = vec![];

          for (property, value) in styles.iter() {
            let property_name = if property.starts_with('-') {
              property.to_owned()
            } else {
              property.to_kebab_case()
            };

            declarations.push(format!("{}: {};", property_name, value));
          }

          sections.push(format!(
            "{} {{\n{}\n}}",
            key,
            indent(&declarations.join("\n"), INDENTATION)
          ));
        }

        format!(
          "@keyframes {} {{\n{}\n}}",
          name,
          indent(&sections.join("\n"), INDENTATION)
        )
      }
    }
  }

  /// Get the css variable names from the keyframes.
  pub fn get_css_variables_names(&self, name: &str) -> IndexSet<String> {
    get_css_variables_from_string(self.get_css(name).as_str())
  }
}

#[derive(Serialize, Deserialize, Debug, PartialEq, Clone)]
#[serde(untagged)]
pub enum Group {
  Props(Vec<StyleRule>),
}

impl Group {
  /// Provide the list of selectors and get the css declaration back.
  pub fn get_css(&self, selectors: &[String]) -> String {
    match self {
      Group::Props(props) => {
        let mut declarations: Vec<String> = vec![];

        for prop in props.iter() {
          declarations.push(format!("{};", prop.get_style_declaration(None)));
        }

        format!(
          "{} {{\n{}\n}}",
          selectors.join(",\n"),
          indent(&declarations.join("\n"), INDENTATION)
        )
      }
    }
  }

  /// Get the css variable names from the keyframes.
  pub fn get_css_variables_names(&self, selectors: &[String]) -> IndexSet<String> {
    get_css_variables_from_string(self.get_css(selectors).as_str())
  }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(untagged)]
pub enum Atom {
  Color(AtomColor),
  Value(AtomValue),
}

impl Atom {
  pub fn to_atom_value(&self) -> AtomValue {
    match self {
      Atom::Color(color) => AtomValue {
        keyframes: color.keyframes.clone(),
        groups: color.groups.clone(),
        style_rules: Vec::new(),
        values: IndexMap::new(),
      },
      Atom::Value(value) => value.clone(),
    }
  }
}

#[derive(Serialize, Deserialize, Debug, PartialEq, Clone)]
pub struct AtomValue {
  #[serde(default)]
  pub keyframes: Vec<String>,
  #[serde(default)]
  pub groups: Vec<String>,
  #[serde(rename = "styleRules")]
  pub style_rules: Vec<String>,
  pub values: IndexMap<String, AtomCssValue>,
}

#[derive(Serialize, Deserialize, Debug, PartialEq, Clone)]
#[serde(untagged)]
pub enum AtomCssValue {
  Value(CssValue),
  /// Provide an object with the values.
  Object(IndexMap<String, CssValue>),
}

/// Rather than values being used this will make available the values defined
/// from the colors object.
#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct AtomColor {
  #[serde(default)]
  pub keyframes: Vec<String>,
  #[serde(default)]
  pub groups: Vec<String>,
  pub style_rules: Vec<String>,
  pub colors: AtomColorOptions,
}

/// The options provided to an `AtomColor` configuration object.
#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct AtomColorOptions {
  /// The CSS Variable which is used to set the color opacity.
  pub opacity: String,

  /// When true the built in palette will also be available as values for the
  /// colors.
  pub palette: bool,
}

/// Options to use in the configuration.
#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct Options {
  #[serde(default)]
  pub color_format: ColorFormat,
}

pub trait BreakpointHelper {
  fn to_breakpoints(&self) -> IndexMap<Option<String>, CssValue>;
}

impl BreakpointHelper for IndexMap<String, CssValue> {
  fn to_breakpoints(&self) -> IndexMap<Option<String>, CssValue> {
    let mut breakpoints = IndexMap::new();
    breakpoints.insert(None, CssValue::String("".to_string()));

    for (name, value) in self.iter() {
      breakpoints.insert(Some(name.to_string()), value.clone());
    }

    breakpoints
  }
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct NamespacedAtoms {
  /// px, py, pt, pb, pl, pr, p - all are callable as `p(value)` or namespaced
  /// as `p[0]`.
  pub padding: IndexMap<String, CssValue>,

  /// mx, my, mt, mb, ml, mr, m - all are callable as `m(value)` or namespaced
  /// as `m[0]`.
  pub margin: IndexMap<String, CssValue>,
}

type CssSelectorStyle = IndexMap<String, String>;
type CssSelectorQuery = IndexMap<String, CssSelectorStyle>;

/// Options to use in the configuration.
#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub enum Css {
  Style(CssSelectorStyle),
  Query(CssSelectorQuery),
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub enum ColorFormat {
  #[serde(rename = "rgb")]
  Rgb,
  #[serde(rename = "hsl")]
  Hsl,
}
impl Default for ColorFormat {
  fn default() -> ColorFormat {
    ColorFormat::Hsl
  }
}

/// The min width can either be a string or a number. If a number it will be
/// interpreted as a pixel measurement.
#[derive(Serialize, Deserialize, Debug, PartialEq, Clone, Eq, Hash, PartialOrd, Ord)]
#[serde(untagged)]
pub enum CssValue {
  Number(u32),
  String(String),
}

impl CssValue {
  pub fn get_string(&self) -> String {
    match self {
      CssValue::Number(value) => value.to_string(),
      CssValue::String(value) => value.clone(),
    }
  }
}

/// Colors and variables can be defined to be different under different
/// selectors. The default value provided
#[derive(Serialize, Deserialize, Debug, PartialEq, Clone)]
#[serde(untagged)]
#[allow(clippy::large_enum_variant)]
pub enum CssVariable {
  Value(CssValue),
  Object(PopulatedCssVariable),
}

impl CssVariable {
  pub fn populate(&self, user: &UserConfig) -> PopulatedCssVariable {
    let mut populated = PopulatedCssVariable {
      selectors: IndexMap::new(),
      breakpoints: None,
      media_queries: None,
    };

    match self {
      CssVariable::Value(value) => {
        match value.get_string().as_str() {
          // Handle the special case of the container variable.
          "container" => {
            self.container(&mut populated, user);
          }
          _ => {
            populated
              .selectors
              .insert(ROOT_SELECTOR.to_owned(), value.clone());
          }
        }

        populated
      }
      CssVariable::Object(value) => value.clone(),
    }
  }

  pub fn get_css_variables_names(&self, user: &UserConfig) -> IndexSet<String> {
    let populated = self.populate(user);
    let mut css_variables: IndexSet<String> = IndexSet::new();

    for value in populated.selectors.values() {
      let variables = get_css_variables_from_string(value.get_string().as_str());
      css_variables.extend(variables);
    }

    if let Some(breakpoints) = populated.breakpoints {
      for breakpoint in breakpoints.values() {
        for value in breakpoint.values() {
          let variables = get_css_variables_from_string(value.get_string().as_str());
          css_variables.extend(variables);
        }
      }
    }

    if let Some(media_queries) = populated.media_queries {
      for media_query in media_queries.values() {
        for value in media_query.values() {
          let variables = get_css_variables_from_string(value.get_string().as_str());
          css_variables.extend(variables);
        }
      }
    }

    css_variables
  }

  /// Populate the colors.
  pub fn populate_color(
    &self,
    palette: &IndexMap<String, String>,
    opacity: &str,
  ) -> PopulatedCssVariable {
    let mut populated = PopulatedCssVariable {
      selectors: IndexMap::new(),
      breakpoints: None,
      media_queries: None,
    };
    match self {
      CssVariable::Value(original_value) => {
        populated.selectors.insert(
          ROOT_SELECTOR.to_owned(),
          CssValue::String(convert_css_value_to_color(original_value, palette, opacity)),
        );

        populated
      }
      CssVariable::Object(value) => {
        populated.selectors = self.clone_with_color(palette, opacity, &value.selectors);

        if let Some(breakpoints) = &value.breakpoints {
          populated.breakpoints = Some(self.clone_parent_with_color(palette, opacity, breakpoints));
        }

        if let Some(media_queries) = &value.media_queries {
          populated.media_queries =
            Some(self.clone_parent_with_color(palette, opacity, media_queries));
        }

        populated
      }
    }
  }

  /// Create a container css variable which has values for each breakpoint
  /// corresponding to the min width.
  fn container(&self, populated: &mut PopulatedCssVariable, user: &UserConfig) {
    populated.selectors.insert(
      ROOT_SELECTOR.to_string(),
      CssValue::String("none".to_string()),
    );
    let mut breakpoint_variables: NestedCssVariableSelectors = IndexMap::new();

    for (breakpoint_name, breakpoint_value) in &user.breakpoints {
      let mut breakpoint_selectors: CssVariableSelectors = IndexMap::new();
      breakpoint_selectors.insert(ROOT_SELECTOR.to_owned(), breakpoint_value.clone());
      breakpoint_variables.insert(breakpoint_name.to_owned(), breakpoint_selectors);
    }

    populated.breakpoints = Some(breakpoint_variables);
  }

  fn clone_with_color(
    &self,
    palette: &IndexMap<String, String>,
    opacity: &str,
    original_selectors: &CssVariableSelectors,
  ) -> CssVariableSelectors {
    let mut variable_selector = IndexMap::new();

    for (selector_name, selector_value) in original_selectors.iter() {
      variable_selector.insert(
        selector_name.clone(),
        CssValue::String(convert_css_value_to_color(selector_value, palette, opacity)),
      );
    }

    variable_selector
  }

  fn clone_parent_with_color(
    &self,
    palette: &IndexMap<String, String>,
    opacity: &str,
    original: &IndexMap<String, CssVariableSelectors>,
  ) -> IndexMap<String, CssVariableSelectors> {
    let mut container = IndexMap::new();

    for (name, child) in original.iter() {
      container.insert(
        name.to_owned(),
        self.clone_with_color(palette, opacity, child),
      );
    }

    container
  }
}

pub type CssVariableSelectors = IndexMap<String, CssValue>;
pub type NestedCssVariableSelectors = IndexMap<String, CssVariableSelectors>;

#[derive(Serialize, Deserialize, Debug, PartialEq, Clone)]
#[serde(rename_all = "camelCase")]
pub struct PopulatedCssVariable {
  pub selectors: CssVariableSelectors,
  pub media_queries: Option<NestedCssVariableSelectors>,
  pub breakpoints: Option<NestedCssVariableSelectors>,
}

impl PopulatedCssVariable {}

#[derive(Serialize, Deserialize, Debug, PartialEq, Clone, Eq, Hash, PartialOrd, Ord)]
#[serde(untagged)]
pub enum StyleRule {
  /// The rule has a value.
  WithValue(String, CssValue),
  Name(String),
}

impl StyleRule {
  pub(crate) fn get_style_declaration(&self, css_value: Option<CssValue>) -> String {
    match self {
      StyleRule::WithValue(name, value) => format!("{}: {}", name, value.get_string()),
      StyleRule::Name(name) => {
        let value = if let Some(v) = css_value {
          v.get_string()
        } else {
          "".to_string()
        };

        format!("{}: {}", name, value)
      }
    }
  }

  pub(crate) fn get_style_declaration_as_ref(&self, css_value: Option<&CssValue>) -> String {
    match self {
      StyleRule::WithValue(name, value) => format!("{}: {}", name, value.get_string()),
      StyleRule::Name(name) => {
        if let Some(value) = css_value {
          format!("{}: {}", name, value.get_string())
        } else {
          "".to_string()
        }
      }
    }
  }

  // pub(crate) fn get_property_value(&self, css_value: Option<&CssValue>) ->
  // Option<(String, String)> {   match self {
  //     StyleRule::WithValue(name, value) => format!("{}: {}", name,
  // value.get_string()),     StyleRule::Name(name) => {
  //       if let Some(value) = css_value {
  //         format!("{}: {}", name, value.get_string())
  //       } else {
  //         "".to_string()
  //       }
  //     }
  //   }
  // }
}
#[cfg(test)]
mod tests {

  use crate::constants::JSON_CONFIG;

  use super::*;

  #[test]
  fn check_config_can_serialize() {
    let config: UserConfig = serde_json::from_str(JSON_CONFIG).unwrap();
    let json = serde_json::to_string(&config).unwrap();
    assert_eq!(config, serde_json::from_str(&json).unwrap());
  }
}
