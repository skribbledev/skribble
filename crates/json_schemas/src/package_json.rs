use serde::{Deserialize, Serialize};

use crate::utils::AdditionalFields;

/// Rust schema for NPM `package.json` files.
#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct TsConfig<A = AdditionalFields> {}

/// A person who has been involved in creating or maintaining this package.
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PersonObject {
  pub name: String,

  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub url: Option<String>,
}
