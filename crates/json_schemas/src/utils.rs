use lazy_static::lazy_static;
use regex::Regex;
use semver::VersionReq;
use serde_json::{Map, Value};
use validator::{validate_email, validate_url, ValidationError};

/// Capture fields that aren't defined in the default implementation.
pub type AdditionalFields = Map<String, Value>;

lazy_static! {
  pub(crate) static ref PACKAGE_NAME_REGEX: Regex =
    Regex::new(r#"^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$"#).unwrap();
  pub(crate) static ref PACKAGE_MANAGER_REGEX: Regex =
    Regex::new(r#"(npm|pnpm|yarn)@\d+\.\d+\.\d+(-.+)?"#).unwrap();
}

pub(crate) fn validate_version(version: &str) -> Result<(), ValidationError> {
  VersionReq::parse(version)
    .map_err(|_| ValidationError::new("version must be a valid semver string"))?;

  Ok(())
}

pub(crate) fn validate_exports_path(path: &str) -> Result<(), ValidationError> {
  if !path.starts_with("./") {
    Err(ValidationError::new("exports path must start with './'"))
  } else {
    Ok(())
  }
}

pub(crate) fn validate_email_or_url(email_or_url: &str) -> Result<(), ValidationError> {
  if !(validate_email(email_or_url) || validate_url(email_or_url)) {
    Err(ValidationError::new("invalid email or url"))
  } else {
    Ok(())
  }
}
