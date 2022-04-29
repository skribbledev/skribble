#![deny(clippy::all)]

use dashmap::DashMap;
use std::thread;

// use anyhow::{Context, Result};
use napi::{
  bindgen_prelude::{JsFunction, Object},
  threadsafe_function::{ErrorStrategy, ThreadsafeFunction, ThreadsafeFunctionCallMode},
  Env, Error, JsObject, Result, Status,
};
use napi_derive::napi;
use skribble_css::config::Config;

/// The data that is maintained by the `SkribbleBridge`
#[derive(Default)]
pub struct JsBridgeData {
  /// The configuration that is passed in as a JavaScript Object.
  configs: Vec<Config>,
  extension_handlers: DashMap<String, JsFunction>,
  func: Option<ThreadsafeFunction<String>>,
  handler: Option<JsFunction>,
}

#[napi(js_name = "SkribbleBridge")]
pub struct JsSkribbleBridge {
  data: JsBridgeData,
}

unsafe impl Sync for JsSkribbleBridge {}
unsafe impl Send for JsSkribbleBridge {}

#[napi]
impl JsSkribbleBridge {
  #[napi(constructor)]
  pub fn new() -> Self {
    JsSkribbleBridge {
      data: JsBridgeData::default(),
    }
  }

  #[napi]
  pub fn status(&self) -> napi::Result<u32> {
    // self.engine.status()
    Ok(1)
  }

  #[napi]
  pub fn add_config(&mut self, env: Env, object: Object) -> Result<()> {
    let json = object_to_string(&env, &object)?;
    let config = Config::new(json.as_str())
      .map_err(|err| Error::new(Status::InvalidArg, format!("{:?}", err)))?;

    self.data.configs.push(config);

    Ok(())
  }

  #[napi]
  pub fn stringify(&self, env: Env, object: JsObject) -> Result<String> {
    let js_json = env.get_global()?.get_named_property::<JsObject>("JSON")?;
    let json_stringify = js_json.get_named_property::<JsFunction>("stringify")?;

    let value: String = json_stringify
      .call::<JsObject>(Some(&js_json), &[object])?
      .coerce_to_string()?
      .into_utf8()?
      .try_into()?;

    Ok(value)
  }

  // pub fn add_instance(&mut self, name: String, instance: )

  #[napi]
  pub fn add_extension_handler(&mut self, name: String, callback: JsFunction) -> Result<()> {
    let tsfn: ThreadsafeFunction<String> = callback.create_threadsafe_function(0, |ctx| {
      ctx.env.create_string_from_std(ctx.value).map(|v| vec![v])
    })?;

    self.data.func = Some(tsfn);
    self.data.extension_handlers.insert(name, callback);

    Ok(())
  }

  #[napi]
  pub fn call_handler(&mut self, env: Env, name: String) -> Option<JsObject> {
    println!("RUST: calling handler: {}", name);

    // if let Some(original_fn) = self.data.func.as_ref(){
    let tsfn = self.data.func.as_ref().unwrap().clone();
    // env.create_

    let handle = thread::spawn(move || {
      println!("RUST: inside handler callback");
      tsfn.call(
        Ok("a_key_here".to_string()),
        ThreadsafeFunctionCallMode::NonBlocking,
      );
    });

    handle.join().unwrap();

    let js_skribble_object = env
      .get_global()
      .expect("expected global object")
      .get_named_property::<JsObject>("__skribble_css")
      .expect("expected __skribble_css but not found");

    js_skribble_object
      .get_named_property::<JsObject>("a_key_here")
      .ok()

    // }
    // None
  }

  #[napi]
  pub fn add_handler2(&mut self, callback: JsFunction) -> Result<()> {
    println!("RUST: add_handler2()");
    self.data.handler = Some(callback);

    Ok(())
  }

  #[napi]
  pub fn call_handler2(&mut self, env: Env, cb: JsFunction) -> Result<JsObject> {
    let mut result = env.create_object()?;
    println!("RUST: call_handler2()");

    let _callback = self.data.handler.as_ref().unwrap();

    let context = env.create_object()?;
    let mut object = env.create_object()?;
    object.set("code", env.create_string("this is the code")?)?;
    object.set("path", env.create_string("/path/to/something")?)?;
    println!("RUST: making the function call");
    let result_value = cb
      .call::<JsObject>(Some(&context), &[object])
      .expect("could not be called.");

    println!("RUST: updating return object");
    result
      .set("name", env.create_string("1")?)
      .expect("could not set NAME");
    result
      .set("value", result_value)
      .expect("could not set VALUE");

    // if let Some(original_fn) = self.data.func.as_ref(){
    // env.create_

    Ok(result)
  }

  #[napi]
  pub fn call_extension_handlers(&mut self, env: Env, callback: JsFunction) -> Result<JsObject> {
    let mut result = env.create_object()?;

    // for entry in self.data.extension_handlers.iter() {
    //   let name: &String = entry.key();
    //   let callback: &JsFunction = entry.value();
    //   let mut object = env.create_object()?;
    //   let context = env.create_object()?;

    //   object.set("code", env.create_string("this is the code")?)?;
    //   object.set("path", env.create_string("/path/to/something")?)?;

    //   let result_value = callback
    //     .call(Some(&context), &[object])
    //     .unwrap();

    //   result
    //     .set("name", env.create_string(name.as_str())?)
    //     .expect("could not set NAME");
    //   result
    //     .set("value", result_value)
    //     .expect("could not set VALUE");
    // }

    let mut object = env.create_object()?;
    let context = env.create_object()?;
    // context.create_named_method(name, function)

    object.set("code", env.create_string("this is the code")?)?;
    object.set("path", env.create_string("/path/to/something")?)?;
    let result_value = callback.call(Some(&context), &[object]).unwrap();
    result
      .set("name", env.create_string("1")?)
      .expect("could not set NAME");
    result
      .set("value", result_value)
      .expect("could not set VALUE");

    Ok(result)
  }
}

impl Default for JsSkribbleBridge {
  fn default() -> Self {
    Self::new()
  }
}

fn object_to_string(env: &Env, object: &Object) -> Result<String> {
  let js_json = env.get_global()?.get_named_property::<JsObject>("JSON")?;
  let json_stringify = js_json.get_named_property::<JsFunction>("stringify")?;

  let value: String = json_stringify
    .call(Some(&js_json), &[object])?
    .coerce_to_string()?
    .into_utf8()?
    .try_into()?;

  Ok(value)
}

#[napi]
pub fn call_threadsafe_function(callback: JsFunction) -> Result<()> {
  let tsfn: ThreadsafeFunction<u32, ErrorStrategy::CalleeHandled> = callback
    .create_threadsafe_function(0, |ctx| ctx.env.create_uint32(ctx.value).map(|v| vec![v]))?;

  for n in 0..100 {
    let tsfn = tsfn.clone();
    thread::spawn(move || {
      tsfn.call(Ok(n), ThreadsafeFunctionCallMode::Blocking);
    });
  }
  Ok(())
}
