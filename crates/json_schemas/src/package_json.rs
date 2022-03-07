use indexmap::IndexMap;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use validator::{Validate, ValidationError, ValidationErrors};

use crate::utils::{
  validate_email_or_url, validate_exports_path, validate_version, AdditionalFields,
  PACKAGE_MANAGER_REGEX, PACKAGE_NAME_REGEX,
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
  #[validate]
  pub exports: Option<Exports>,

  /// Paths to binary files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub bin: Option<Binary>,

  /// When set to "module", the type field allows a package to specify all .js
  /// files within are ES modules. If the "type" field is omitted or set to
  /// "commonjs", all .js files are treated as CommonJS.
  #[serde(default, rename = "type", skip_serializing_if = "Option::is_none")]
  pub type_: Option<Type>,

  /// Set the types property to point to your bundled declaration file.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub types: Option<String>,

  /// Note that the "typings" field is synonymous with "types", and could be
  /// used as well.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub typings: Option<String>,

  /// Contains overrides for the TypeScript version that matches the version
  /// range matching the property key.
  #[serde(
    default,
    rename = "typesVersions",
    skip_serializing_if = "Option::is_none"
  )]
  pub types_versions: Option<IndexMap<String, String>>,

  /// Specify either a single file or an array of filenames to put in place for
  /// the man program to find.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub man: Option<Man>,

  /// Custom directories
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub directories: Option<Directories>,

  /// Specify the place where your code lives. This is helpful for people who
  /// want to contribute.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub repository: Option<String>,

  /// The 'scripts' member is an object hash of script commands that are run at
  /// various times in the lifecycle of your package. The key is the lifecycle
  /// event, and the value is the command to run at that point.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub scripts: Option<IndexMap<String, Option<String>>>,

  /// A 'config' hash can be used to set configuration parameters used in
  /// package scripts that persist across upgrades.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub config: Option<IndexMap<String, Value>>,

  /// Dependencies are specified with a simple hash of package name to version
  /// range. The version range is a string which has one or more space-separated
  /// descriptors. Dependencies can also be identified with a tarball or git
  /// URL.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub dependencies: Option<IndexMap<String, String>>,

  /// Dependencies are specified with a simple hash of package name to version
  /// range. The version range is a string which has one or more space-separated
  /// descriptors. Dependencies can also be identified with a tarball or git
  /// URL.
  #[serde(
    default,
    rename = "devDependencies",
    skip_serializing_if = "Option::is_none"
  )]
  pub dev_dependencies: Option<IndexMap<String, String>>,

  /// Dependencies are specified with a simple hash of package name to version
  /// range. The version range is a string which has one or more space-separated
  /// descriptors. Dependencies can also be identified with a tarball or git
  /// URL.
  #[serde(
    default,
    rename = "optionalDependencies",
    skip_serializing_if = "Option::is_none"
  )]
  pub optional_dependencies: Option<IndexMap<String, String>>,

  /// Dependencies are specified with a simple hash of package name to version
  /// range. The version range is a string which has one or more space-separated
  /// descriptors. Dependencies can also be identified with a tarball or git
  /// URL.
  #[serde(
    default,
    rename = "peerDependencies",
    skip_serializing_if = "Option::is_none"
  )]
  pub peer_dependencies: Option<IndexMap<String, String>>,

  /// Array of package names that will be bundled when publishing the package.
  #[serde(
    default,
    rename = "bundledDependencies",
    skip_serializing_if = "Option::is_none"
  )]
  pub bundled_dependencies: Option<BundledDependencies>,

  /// Resolutions is used to support selective version resolutions, which lets you define custom package versions or ranges inside your dependencies. See: https://classic.yarnpkg.com/en/docs/selective-version-resolutions
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub resolutions: Option<IndexMap<String, String>>,

  /// Defines which package manager is expected to be used when working on the current project. This field is currently experimental and needs to be opted-in; see https://nodejs.org/api/corepack.html
  #[serde(
    default,
    rename = "packageManager",
    skip_serializing_if = "Option::is_none"
  )]
  #[validate(regex = "PACKAGE_MANAGER_REGEX")]
  pub package_manager: Option<String>,

  /// The engines.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub engines: Option<IndexMap<String, String>>,

  /// Whether to strictly enforce the engines specified in the "engines" field.
  #[serde(
    default,
    rename = "engineStrict",
    skip_serializing_if = "Option::is_none"
  )]
  pub engine_strict: Option<bool>,

  /// Specify which operating systems your module will run on.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub os: Option<Vec<String>>,

  /// Specify that your code only runs on certain cpu architectures.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub cpu: Option<Vec<String>>,

  /// If set to true, then npm will refuse to publish it.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub private: Option<Private>,

  /// Example
  #[serde(
    default,
    rename = "publishConfig",
    skip_serializing_if = "Option::is_none"
  )]
  pub publish_config: Option<PublishConfig>,

  /// Example
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub dist: Option<Dist>,

  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub readme: Option<String>,

  /// An ECMAScript module ID that is the primary entry point to your program.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub module: Option<EsNext>,

  /// An custom entrypoint for browsers.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub browser: Option<EsNext>,

  /// Allows packages within a directory to depend on one another using direct
  /// linking of local files. Additionally, dependencies within a workspace are
  /// hoisted to the workspace root when possible to reduce duplication. Note:
  /// It's also a good idea to set \"private\" to true when using this feature.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub workspaces: Option<Workspaces>,

  /// All addition field.
  #[serde(flatten)]
  pub _additional_fields_: A,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(untagged)]
pub enum Repository {
  Path(String),
  Object {
    #[serde(default, rename = "type", skip_serializing_if = "Option::is_none")]
    type_: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    url: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    directory: Option<String>,
  },
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(untagged)]
pub enum Workspaces {
  /// Workspace package paths. Glob patterns are supported.
  List(Vec<String>),
  Object {
    /// Workspace package paths. Glob patterns are supported.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    packages: Option<Vec<String>>,

    /// Packages to block from hoisting to the workspace root. Currently only
    /// supported in Yarn only.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    nohoist: Option<Vec<String>>,
  },
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "lowercase")]
pub enum PublishConfigAccess {
  Public,
  Restricted,
}

#[derive(Serialize, Validate, Deserialize, Debug, Clone)]
pub struct PublishConfig {
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub name: Option<PublishConfigAccess>,

  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub tag: Option<String>,

  #[validate(url)]
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub registry: Option<String>,

  /// All additional custom fields.
  #[serde(flatten)]
  pub _additional_fields_: IndexMap<String, String>,
}

#[derive(Serialize, Validate, Deserialize, Debug, Clone)]
pub struct Dist {
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub shasum: Option<String>,

  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub tarball: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(untagged)]
pub enum Man {
  Path(String),
  Object(Vec<String>),
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(untagged)]
pub enum EsNext {
  Path(String),
  Object(IndexMap<String, String>),
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(untagged)]
pub enum BundledDependencies {
  Bool(bool),
  List(Vec<String>),
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(untagged)]
pub enum Private {
  #[serde(rename = "true")]
  True,
  #[serde(rename = "false")]
  False,
  Bool(bool),
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(untagged)]
pub enum Binary {
  Path(String),
  Object(IndexMap<String, String>),
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "lowercase")]
pub enum Type {
  CommonJS,
  Module,
}

impl Default for Type {
  fn default() -> Self {
    Type::CommonJS
  }
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

    match self {
      Bug::EmailOrUrl(email_or_url) => {
        let error = validate_email_or_url(email_or_url);

        match error {
          Ok(_) => (),
          Err(e) => {
            errors.add("Bug", e);
          }
        }
      }
      Bug::Object(bug) => {
        if let Err(validation_errors) = bug.validate() {
          errors = validation_errors;
        }
      }
    }

    if errors.is_empty() {
      Ok(())
    } else {
      Err(errors)
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

    match self {
      Exports::Path(path) => {
        if let Err(validation_error) = validate_exports_path(path) {
          errors.add("Exports", validation_error);
        }
      }
      Exports::Object(object) => {
        let mut validation_errors = ValidationErrors::new();

        for (name, path) in object._additional_fields_.iter() {
          if name.starts_with('.') {
            validation_errors.add("Exports", ValidationError::new("invalid field name"));
          }

          if let Err(validation_error) = validate_exports_path(path) {
            validation_errors.add("Exports", validation_error);
          }
        }

        let result = if validation_errors.is_empty() {
          Ok(())
        } else {
          Err(validation_errors)
        };

        if let Err(nested_errors) = ValidationErrors::merge(result, "Exports", object.validate()) {
          errors = nested_errors;
        }
      }
      Exports::Nested(map) => {
        for (name, object) in map.iter() {
          if let Err(error) = validate_exports_path(name) {
            errors.add("Exports", error);
          }

          if let Err(validation_errors) = object.validate() {
            for (key, field_errors) in validation_errors.field_errors() {
              for field_error in field_errors {
                errors.add(key, field_error.clone());
              }
            }
          }
        }
      }
    }

    if errors.is_empty() {
      Ok(())
    } else {
      Err(errors)
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

#[derive(Serialize, Validate, Deserialize, Debug, Clone)]
pub struct Directories {
  /// If you specify a 'bin' directory, then all the files in that folder will
  /// be used as the 'bin' hash.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub bin: Option<String>,

  /// Put markdown files in here. Eventually, these will be displayed nicely,
  /// maybe, someday.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub doc: Option<String>,

  /// Put example scripts in here. Someday, it might be exposed in some clever
  /// way.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub example: Option<String>,

  /// Tell people where the bulk of your library is. Nothing special is done
  /// with the lib folder in any way, but it's useful meta info.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub lib: Option<String>,

  /// A folder that is full of man pages. Sugar to generate a 'man' array by
  /// walking the folder.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub man: Option<String>,

  /// Folder full of tests
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub test: Option<String>,

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
