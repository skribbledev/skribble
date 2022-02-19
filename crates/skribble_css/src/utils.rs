use indexmap::IndexSet;

use regex::Regex;
use swc_ecmascript::{
  ast::{Expr, Ident, Lit, MemberProp},
  utils::{id, Id},
};

const ESCAPE_CSS_STRING_REGEX: &str = r#"(#|&|~|=|>|'|:|"|!|;|,|\.|\*|\+|\||\[|\]|\(|\)|/|\^|\$)"#;
const CSS_VARIABLE_REGEX: &str = r#"var\((--[a-zA-Z0-9_\-]+)(?:,.*)?\)"#;

/// Retrieve the css variables from the provided css value.
pub(crate) fn get_css_variables_from_string(value: &str) -> IndexSet<String> {
  let regex = Regex::new(CSS_VARIABLE_REGEX).unwrap();
  regex
    .captures_iter(value)
    .map(|capture| capture[1].to_owned())
    .collect()
}

/// Escape a css string.
pub(crate) fn escape_css_string(value: &str) -> String {
  let regex = Regex::new(ESCAPE_CSS_STRING_REGEX).unwrap();
  regex.replace_all(value, "\\$1").to_string()
}

/// Get the identifiers that are used in the source code.
///
/// Recursively visit each node and children and add the identifiers to the
/// mutable vector.
///
/// The [[root_identifier]] should be used to check if identifier is valid.
///
/// This returns true when valid and false if when invalid.
pub(crate) fn get_identifiers(
  expression: &Expr,
  identifiers: &mut Vec<Ident>,
  import_ids: &IndexSet<Id>,
) -> bool {
  // let object = match expression {
  //   ExprOrSuper::Expr(value) => &**value,
  //   _ => return false,
  // };

  if let Expr::Member(member) = &*expression {
    let is_valid = get_identifiers(&*member.obj, identifiers, import_ids);

    if !is_valid {
      return false;
    }

    let identifier = match &member.prop {
      MemberProp::Ident(value) => value.clone(),
      MemberProp::Computed(computed) => {
        if let Expr::Lit(Lit::Str(item)) = &*computed.expr {
          Ident::new(item.value.clone(), item.span)
        } else {
          return false;
        }
      }
      _ => return false,
    };

    identifiers.push(identifier);
    return true;
  }

  let identifier = match expression {
    Expr::Ident(identifier) => identifier.clone(),
    Expr::Lit(Lit::Str(item)) => Ident::new(item.value.clone(), item.span),
    _ => return false,
  };

  update_identifiers(identifiers, &identifier, import_ids)
}

fn update_identifiers(
  identifiers: &mut Vec<Ident>,
  identifier: &Ident,
  import_ids: &IndexSet<Id>,
) -> bool {
  if !identifiers.is_empty() {
    identifiers.push(identifier.clone());
    return true;
  }

  if is_root_identifier(import_ids, identifier) {
    // Set to valid but don't add the identifier name since it's noisy.
    return true;
  }

  false
}

/// Check if this matches the valid `import_ids`.
pub(crate) fn is_root_identifier(import_ids: &IndexSet<Id>, identifier: &Ident) -> bool {
  import_ids
    .iter()
    .any(|import_id| import_id.eq(&id(identifier)))
}

/// Indent the string with the given amount of spaces.
pub fn indent(content: &str, spaces: u8) -> String {
  let lines = content.split('\n');
  let mut result = String::new();
  let empty_line_regex = Regex::new(r"^\s*$").unwrap();

  for line in lines {
    if empty_line_regex.is_match(line) {
      result.push('\n');
    } else {
      result.push_str(&format!("{}{}\n", " ".repeat(spaces as usize), line));
    }
  }

  result.trim_end().to_string()
}
