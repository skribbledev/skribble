#![deny(clippy::all)]

pub use crate::error::{Error, Result};
pub use crate::generate::{css::generate_css, types::generate_typescript};

pub mod config;
pub mod constants;
pub mod error;
pub mod generate;
pub mod scanner;
mod utils;

#[cfg(test)]
pub(crate) mod test_utils;
