#![deny(clippy::all)]
use napi_derive::napi;
use skribble_css::{config::Config, generate_typescript};

#[napi]
pub fn sum(a: i32, b: i32) -> i32 {
  a + b
}
