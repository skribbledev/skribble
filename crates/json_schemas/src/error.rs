/// The errors resulting from parsing files.
///
/// Structure taken from https://kazlauskas.me/entries/errors
#[non_exhaustive]
#[derive(thiserror::Error, Debug)]
pub enum Error {
  #[error("an unknown `json_schemas` error has occurred")]
  Unknown,

  #[error("failure to parse a package.json from provided content")]
  ParsePackageJson(#[source] serde_json::Error),

  #[error("failure to serialize the current `PackageJson` instance")]
  SerializePackageJson(#[source] serde_json::Error),

  #[error("failure to parse a tsconfig.json from provided content")]
  ParseTsConfig(#[source] serde_json::Error),

  #[error("failure to serialize the current `TsConfig` instance")]
  SerializeTsConfig(#[source] serde_json::Error),
}

/// A result type for `json_schemas`.
pub type Result<T> = std::result::Result<T, Error>;
