use indexmap::IndexMap;
use serde::{Deserialize, Serialize};
use serde_json::Map;
use validator::{Validate, ValidationError, ValidationErrors};

use crate::utils::{
  validate_email_or_url, validate_exports_path, validate_version, AdditionalFields,
  PACKAGE_NAME_REGEX,
};

/// Rust schema for NPM `package.json` files.
#[derive(Serialize, Validate, Deserialize, Debug, Clone)]
pub struct PackageJson<A = AdditionalFields> {
  /// The name of the package.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  #[validate(length(min = 1, max = 214), regex = "PACKAGE_NAME_REGEX")]
  pub name: Option<String>,

  /// Version must be parseable by node-semver, which is bundled with npm as a
  /// dependency.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  #[validate(custom = "validate_version")]
  pub version: Option<String>,

  /// Version must be parseable by node-semver, which is bundled with npm as a
  /// dependency.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub description: Option<String>,

  /// This helps people discover your package as it's listed in 'npm search'.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub keywords: Option<Vec<String>>,

  /// The url to the project homepage.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  #[validate(url)]
  pub homepage: Option<String>,

  /// The url to your project's issue tracker and / or the email address to
  /// which issues should be reported. These are helpful for people who
  /// encounter issues with your package.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  #[validate]
  pub bugs: Option<Bug>,

  /// You should specify a license for your package so that people know how they
  /// are permitted to use it, and any restrictions you're placing on it.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub license: Option<String>,

  /// A person who has been involved in creating or maintaining this package.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  #[validate]
  pub author: Option<Person>,

  /// A list of people who contributed to this package.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  #[validate]
  pub contributors: Option<Vec<Person>>,

  /// A list of people who maintain this package.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  #[validate]
  pub maintainers: Option<Vec<Person>>,

  /// The 'files' field is an array of files to include in your project. If you
  /// name a folder in the array, then it will also include the files inside
  /// that folder.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub files: Option<Vec<String>>,

  /// The main field is a module ID that is the primary entry point to your
  /// program.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub main: Option<String>,

  /// Version must be parseable by node-semver, which is bundled with npm as a
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub example: Option<String>,
  // // /// Example
  // // #[serde(default, skip_serializing_if = "Option::is_none")]
  // // pub example: Option<String>,
  /// All addition field.
  #[serde(flatten)]
  pub _additional_fields_: A,
}

/// A person who has been involved in creating or maintaining this package.
#[derive(Serialize, Validate, Deserialize, Debug, Clone)]
pub struct PersonObject {
  #[validate(length(min = 1))]
  pub name: String,

  #[validate(url)]
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub url: Option<String>,

  #[validate(email)]
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub email: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(untagged)]
pub enum Person {
  String(String),
  Object(PersonObject),
}

impl Validate for Person {
  #[allow(unused_mut)]
  fn validate(&self) -> Result<(), ValidationErrors> {
    let mut errors = ValidationErrors::new();
    let mut result = if errors.is_empty() {
      Ok(())
    } else {
      Err(errors)
    };

    match self {
      Person::Object(person) => ValidationErrors::merge(result, "Person", person.validate()),
      _ => result,
    }
  }
}

/// The url to your project's issue tracker and / or the email address to which
/// issues should be reported. These are helpful for people who encounter issues
/// with your package.
#[derive(Serialize, Validate, Deserialize, Debug, Clone)]
pub struct BugObject {
  /// The url to your project's issue tracker.
  #[validate(url)]
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub url: Option<String>,

  /// The email address to which issues should be reported.
  #[validate(email)]
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub email: Option<String>,
}

/// The url to your project's issue tracker and / or the email address to which
/// issues should be reported. These are helpful for people who encounter issues
/// with your package.
#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(untagged)]
pub enum Bug {
  EmailOrUrl(String),
  Object(BugObject),
}

impl Validate for Bug {
  #[allow(unused_mut)]
  fn validate(&self) -> Result<(), ValidationErrors> {
    let mut errors = ValidationErrors::new();
    let mut result = || {
      if errors.is_empty() {
        Ok(())
      } else {
        Err(errors)
      }
    };

    match self {
      Bug::EmailOrUrl(email_or_url) => {
        let error = validate_email_or_url(email_or_url);

        match error {
          Ok(_) => (),
          Err(e) => errors.add("Bug", e),
        }

        result()
      }
      Bug::Object(bug) => ValidationErrors::merge(result(), "Bug", bug.validate()),
      _ => result(),
    }
  }
}

/// The "exports" field is used to restrict external access to non-exported
/// module files, also enables a module to import itself using "name"
#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(untagged)]
pub enum Exports {
  /// The module path that is resolved when this specifier is imported. Set to
  /// `null` to disallow importing this module.
  Path(String),

  /// The module path that is resolved when the module specifier matches "name",
  /// shadows the "main" field.
  Object(ExportsObject),

  /// A nested exports object.
  Nested(IndexMap<String, ExportsObject>),
}

impl Validate for Exports {
  #[allow(unused_mut)]
  fn validate(&self) -> Result<(), ValidationErrors> {
    let mut errors = ValidationErrors::new();
    let mut result = || {
      if errors.is_empty() {
        Ok(())
      } else {
        Err(errors)
      }
    };

    match self {
      Exports::Path(path) => {
        let error = validate_exports_path(path);

        match error {
          Ok(_) => (),
          Err(e) => errors.add("Exports", e),
        };

        result()
      }
      // Exports::Object(object) => {
      //   for (name, path) in object._additional_fields_.iter() {
      //     if name.starts_with(".") {
      //       errors.add(
      //         format!("Exports:{}", name).as_str(),
      //         ValidationError::new("invalid field name"),
      //       );
      //     }

      //     match validate_exports_path(path) {
      //       Ok(_) => (),
      //       Err(e) => errors.errors(format!("Exports:{}", name).as_str(), e),
      //     }
      //   }

      //   ValidationErrors::merge(result(), "Exports", object.validate())
      // }
      Exports::Nested(map) => {
        for (name, object) in map.iter() {
          let error = validate_exports_path(name);

          match error {
            Ok(_) => (),
            Err(e) => errors.add(format!("Exports:{}", name).as_str(), e),
          };

          match object.validate() {
            Ok(_) => (),
            Err(e) => errors.add(format!("Exports:{}", name).as_str(), e),
          }
        }

        result()
      }
      _ => result(),
    }
  }
}

#[derive(Serialize, Validate, Deserialize, Debug, Clone)]
pub struct ExportsObject {
  /// The module path that is resolved when this specifier is imported as a
  /// CommonJS module using the `require(...)` function.
  #[validate(custom = "validate_exports_path")]
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub require: Option<String>,

  /// The module path that is resolved when this specifier is imported as an
  /// ECMAScript module using an `import` declaration or the dynamic
  /// `import(...)` function.
  #[validate(custom = "validate_exports_path")]
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub import: Option<String>,

  /// The module path that is resolved when this environment is Node.js.
  #[validate(custom = "validate_exports_path")]
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub node: Option<String>,

  /// The module path that is resolved when no other export type matches.
  #[validate(custom = "validate_exports_path")]
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub default: Option<String>,

  /// All additional custom fields.
  #[serde(flatten)]
  pub _additional_fields_: IndexMap<String, String>,
}

// #[derive(Validate, Debug, Clone)]
// struct Email {
//   #[validate(email)]
//   inner: String,
// }

// impl std::ops::Deref for Email {
//   type Target = String;

//   fn deref(&self) -> Target {
//     &self.inner
//   }
// }
