#![deny(clippy::all)]

use std::{collections::HashMap, thread};

use napi::{
  bindgen_prelude::{JsFunction, Object},
  sys::napi_run_script,
  threadsafe_function::{ErrorStrategy, ThreadsafeFunction, ThreadsafeFunctionCallMode},
  Env, JsObject, JsString,
};
use napi_derive::napi;
use skribble_css::{
  config::{Config, UserConfig},
  Result,
};

/// The data that is maintained by the `SkribbleBridge`
pub struct JsBridgeData {
  /// The configuration that is passed in as a JavaScript Object.
  configs: Vec<Config>,
  extension_handlers: HashMap<String, Box<dyn Fn() -> String>>,
}

impl Default for JsBridgeData {
  fn default() -> Self {
    Self {
      configs: vec![],
      extension_handlers: HashMap::new(),
    }
  }
}

#[napi(js_name = "SkribbleBridge")]
pub struct JsSkribbleBridge {
  data: JsBridgeData,
  // data: String,
}

#[napi]
impl JsSkribbleBridge {
  #[napi(constructor)]
  pub fn new() -> Self {
    JsSkribbleBridge {
      data: JsBridgeData::default(),
    }
  }

  /// Class method
  #[napi]
  pub async fn query(&self, query: String) -> napi::Result<String> {
    // self.engine.query(query).await
    Ok("".into())
  }

  // #[napi]
  // pub fn status(&self) -> napi::Result<u32> {
  //   // self.engine.status()
  //   Ok(self.engine.status)
  // }

  #[napi]
  pub async fn generate_css_for_file(&self, file: String, config: Object) -> napi::Result<()> {
    Ok(())
  }

  #[napi]
  pub fn add_extension_handler(
    &self,
    env: Env,
    name: String,
    callback: JsFunction,
  ) -> napi::Result<()> {
    let js_json = env.get_global()?.get_named_property::<JsObject>("JSON")?;
    let json_stringify = js_json.get_named_property::<JsFunction>("stringify")?;

    let value: String = json_stringify
      .call::<JsString>(Some(&js_json), &[])?
      .coerce_to_string()?
      .into_utf8()?
      .try_into()?;

    // let s: String = value.try_into()?;
    let tsfn: ThreadsafeFunction<u32, ErrorStrategy::CalleeHandled> = callback
      .create_threadsafe_function(0, |ctx| {
        ctx.env.create_uint32(ctx.value + 1).map(|v| vec![v])
      })?;
    for n in 0..100 {
      let tsfn = tsfn.clone();
      thread::spawn(move || {
        tsfn.call(Ok(n), ThreadsafeFunctionCallMode::Blocking);
      });
    }
    Ok(())
  }
}
