#![deny(clippy::all)]

pub use crate::generate_css::generate_css;

pub mod config;
pub mod constants;
mod generate_css;
pub mod generate_typescript;
pub mod scanner;
mod utils;

#[cfg(test)]
pub(crate) mod test_utils;
