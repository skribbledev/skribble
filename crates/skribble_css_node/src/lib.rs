#![deny(clippy::all)]
use skribble_css::config::Config;

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn sum(a: i32, b: i32) -> i32 {
  a + b
}

// pub fn generate_css_from_file(config: Config, source: ) ->  {

// }
