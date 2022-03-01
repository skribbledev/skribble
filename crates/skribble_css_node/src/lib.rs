#![deny(clippy::all)]
use skribble_css::{config::Config, generate_typescript};

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn sum(a: i32, b: i32) -> i32 {
  a + b
}

// pub fn generate_css_from_file(config: Config, source: ) ->  {

// }

// pub fn generate_typescript()
