use std::{
  env::current_dir,
  fs::read_dir,
  path::{Path, PathBuf},
};

use typed_builder::TypedBuilder;

/// The errors that can be returned when finding a file path.
///
/// Structure taken from https://kazlauskas.me/entries/errors
#[non_exhaustive]
#[derive(thiserror::Error, Debug)]
pub enum Error {
  #[error("an unknown `find_up` error has occurred")]
  Unknown,

  #[error("no results found searching for: {names} from: {cwd} ")]
  NoResults { cwd: PathBuf, names: String },

  #[error("no current directory exists for this operating system")]
  MissingCurrentDirectory(#[source] std::io::Error),

  #[error("unable to read files in the directory: {path:?}")]
  CouldNotReadDirectory {
    source: std::io::Error,
    path: PathBuf,
  },

  #[error("invalid entry received when reading directory: {path:?}")]
  InvalidEntry {
    source: std::io::Error,
    path: PathBuf,
  },
}

/// A result type for find_up operations.
///
/// The error type is using the [`thiserror`] crate to provide a custom error
/// type.
pub type Result<T> = std::result::Result<T, Error>;

/// The type of paths that can be matched.
#[derive(Eq, PartialEq, Debug)]
pub enum Type {
  /// Match file types only.
  File,

  /// Match directories only.
  Directory,
}

impl Default for Type {
  fn default() -> Self {
    Type::File
  }
}

#[derive(TypedBuilder, PartialEq, Debug)]
#[builder(doc)]
pub struct FindUp {
  /// The type of paths that can be matched.
  #[builder(default)]
  path_type: Type,

  /// Disabling matching symbolic links if they point to the chosen path type.
  #[builder(setter(strip_bool))]
  disable_symlinks: bool,

  /// The path to the directory to stop the search before reaching root if there
  /// were no matches this directory.
  #[builder(default = PathBuf::from("/"), setter(into))]
  stop_at: PathBuf,

  /// The minimum number of steps to take before starting the search. This can
  /// be used to prevent finding matches in the current directory by setting
  /// min_steps to 1.
  ///
  /// Default is `0`.
  #[builder(default = 0)]
  min_steps: usize,

  /// The maximum number of steps to take during the search. This can be used to
  /// only search the current directory by setting max_steps to 1.
  ///
  /// Default is [`std::usize::MAX`].
  #[builder(default = std::usize::MAX)]
  max_steps: usize,
}

impl FindUp {
  fn lookup(
    &self,
    names: &[&str],
    dir: &PathBuf,
    steps: usize,
    results: Vec<PathBuf>,
    max_results: usize,
  ) -> Result<Vec<PathBuf>> {
    if dir.is_dir()
      && (dir == &self.stop_at || self.stop_at.starts_with(&dir) || dir == &PathBuf::from("/"))
    {
      return Ok(results);
    }

    if steps >= self.max_steps {
      return Ok(results);
    }

    if steps < self.min_steps {
      if let Some(next) = dir.parent() {
        return self.lookup(names, &next.to_path_buf(), steps + 1, results, max_results);
      }
    }

    let mut results = results;
    let dir_results = read_dir(dir).map_err(|source| {
      Error::CouldNotReadDirectory {
        source,
        path: dir.clone(),
      }
    })?;

    for result in dir_results {
      let entry = result.map_err(|source| {
        Error::InvalidEntry {
          source,
          path: dir.clone(),
        }
      })?;
      let path = entry.path();

      if self.disable_symlinks && path.is_symlink() {
        continue;
      }

      match self.path_type {
        Type::File => {
          if path.is_dir() {
            continue;
          }
        }
        Type::Directory => {
          if path.is_file() {
            continue;
          }
        }
      }

      if let Some(name) = path.file_name().and_then(|n| n.to_str()) {
        if names.contains(&name) {
          results.push(path);
        }

        if results.len() >= max_results {
          return Ok(results);
        }
      }
    }

    if let Some(next) = dir.parent() {
      return self.lookup(names, &next.to_path_buf(), steps + 1, results, max_results);
    }

    Ok(results)
  }

  /// Find a file or directory by walking up parent directories
  pub fn find<P: AsRef<Path>>(&self, name: &str, cwd_ref: Option<P>) -> Result<PathBuf> {
    let names = &[name];
    let cwd = &get_path_buf(cwd_ref)?;
    // Find the first result and return it.
    let results = self.lookup(names, cwd, 0, vec![], 1)?;

    match results.get(0) {
      Some(path) => Ok(path.to_path_buf()),
      None => {
        Err(Error::NoResults {
          cwd: cwd.clone(),
          names: names.join(","),
        })
      }
    }
  }
}

/// Get the root directory or returns an error if the current directory can
/// not be accessed.
fn get_path_buf<P: AsRef<Path>>(cwd_ref: Option<P>) -> Result<PathBuf> {
  if let Some(cwd) = cwd_ref {
    Ok(cwd.as_ref().to_path_buf())
  } else {
    current_dir().map_err(Error::MissingCurrentDirectory)
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn it_can_be_built() {
    assert_eq!(
      FindUp::builder().disable_symlinks().build(),
      FindUp {
        path_type: Default::default(),
        disable_symlinks: true,
        stop_at: Path::new("/").to_path_buf(),
        min_steps: 0,
        max_steps: std::usize::MAX,
      }
    );
  }
}
