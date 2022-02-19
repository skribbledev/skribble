use heck::ToKebabCase;
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};

use crate::constants::JSON_CONFIG;

use self::{
  color_utils::{get_rgba_color_from_string, wrap_css_variable},
  user::{
    Atom, AtomColor, AtomColorOptions, AtomValue, CssValue, CssVariable, PopulatedCssVariable,
  },
};
pub use user::UserConfig;
pub(crate) mod color_utils;

pub mod user;

type AtomMap = IndexMap<String, AtomMeta>;
/// Metadata for the atom which includes the groups and keyframes.
#[derive(Serialize, Deserialize, Debug, PartialEq)]
pub struct AtomMeta {
  pub keyframes: Vec<String>,
  pub groups: Vec<String>,
  pub values: IndexMap<String, CssValue>,
}

/// The built in configuration
#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct Config {
  /// The user configuration.
  pub user: UserConfig,

  pub modifiers_map: IndexMap<String, Vec<String>>,

  /// All the modifier names.
  pub modifiers: Vec<String>,

  /// All the atoms defined in the configuration.
  pub atoms: AtomMap,

  /// All the css variables defined in the configuration.
  pub css_variables: IndexMap<String, PopulatedCssVariable>,
}

impl Config {
  pub fn new(source: &str) -> serde_json::Result<Self> {
    let user = UserConfig::new(source)?;
    let mut modifiers_map: IndexMap<String, Vec<String>> = IndexMap::new();
    let mut css_variables: IndexMap<String, PopulatedCssVariable> = IndexMap::new();

    let modifiers: Vec<String> = user
      .modifiers
      .iter()
      .flat_map(|value| value.keys().map(|key| key.to_owned()))
      .collect();

    for modifier in user.modifiers.iter() {
      modifier.iter().for_each(|(key, values)| {
        modifiers_map.insert(key.clone(), values.clone());
      })
    }

    for (css_variable_name, css_variable) in user.variables.iter() {
      css_variables.insert(css_variable_name.to_owned(), css_variable.populate(&user));
    }

    let mut atoms: AtomMap = IndexMap::new();

    for atom in user.atoms.iter() {
      match atom {
        Atom::Color(AtomColor {
          keyframes,
          groups,
          colors,
          style_rules,
        }) => {
          for rule in style_rules {
            let values: IndexMap<String, CssValue> = values_from_color_options(
              rule,
              colors,
              &user.colors,
              &user.palette,
              &mut css_variables,
            );

            match atoms.get_mut(rule) {
              Some(atom) => {
                for (key, value) in &values {
                  atom.values.insert(key.to_owned(), value.to_owned());
                }
              }
              None => {
                let mut atom = AtomMeta {
                  keyframes: keyframes.clone(),
                  groups: groups.clone(),
                  values: IndexMap::new(),
                };

                for (key, value) in &values {
                  atom.values.insert(key.to_owned(), value.to_owned());
                }

                atoms.insert(rule.to_owned(), atom);
              }
            };
          }
        }
        Atom::Value(AtomValue {
          keyframes,
          groups,
          style_rules,
          values,
        }) => {
          for rule in style_rules {
            match atoms.get_mut(rule) {
              Some(atom) => {
                for (key, value) in values {
                  atom.values.insert(key.to_owned(), value.to_owned());
                }
              }
              None => {
                let mut atom = AtomMeta {
                  keyframes: keyframes.clone(),
                  groups: groups.clone(),
                  values: IndexMap::new(),
                };

                for (key, value) in values {
                  atom.values.insert(key.to_owned(), value.to_owned());
                }

                atoms.insert(rule.to_owned(), atom);
              }
            };
          }
        }
      }
    }

    let config = Self {
      user,
      modifiers,
      modifiers_map,
      atoms,
      css_variables,
    };

    Ok(config)
  }
}

fn values_from_color_options(
  rule: &str,
  options: &AtomColorOptions,
  colors: &IndexMap<String, CssVariable>,
  palette: &IndexMap<String, String>,
  css_variables: &mut IndexMap<String, PopulatedCssVariable>,
) -> IndexMap<String, CssValue> {
  let mut values: IndexMap<String, CssValue> = IndexMap::new();

  if options.palette {
    for (name, value) in palette.iter() {
      values.insert(
        name.to_owned(),
        CssValue::String(get_rgba_color_from_string(value, &options.opacity)),
      );
    }
  }

  for (name, css_variable) in colors.iter() {
    let populated_css_variable = css_variable.populate_color(palette, &options.opacity);
    let css_variable_name = format!("--color-{}-{}", rule.to_kebab_case(), name.to_kebab_case());
    values.insert(
      name.clone(),
      CssValue::String(wrap_css_variable(&css_variable_name)),
    );
    css_variables.insert(css_variable_name, populated_css_variable);
  }

  values
}

impl Default for Config {
  fn default() -> Self {
    Self::new(JSON_CONFIG).unwrap()
  }
}

#[cfg(test)]
mod tests {
  use super::Config;

  #[test]
  fn can_create_config() {
    Config::default();
  }
}
