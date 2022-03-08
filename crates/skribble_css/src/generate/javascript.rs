use indexmap::IndexMap;

use crate::config::Config;

/// Generate the overrides based entirely on the project configuration.
pub fn generate_static_javascript(_config: &Config) {
  let _atom_map: IndexMap<String, String> = IndexMap::new();
  let _shorthand_map: IndexMap<String, String> = IndexMap::new();

  // config.atoms.
}

fn get_overrides_from_config(_config: &Config) {}
