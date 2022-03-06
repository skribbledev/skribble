use core::unicode::conversions::to_lower;

use crate::utils::AdditionalFields;
use serde::{Deserialize, Deserializer, Serialize};
use serde_json::Map;

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct BuildOptions {
  /// Have recompiles in projects that use `incremental` and `watch` mode assume
  /// that changes within a file will only affect files directly depending on
  /// it.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub assume_changes_only_affect_direct_dependencies: Option<bool>,

  /// ~
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub dry: Option<bool>,

  /// Build all projects, including those that appear to be up to date
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub force: Option<bool>,

  /// Save .tsbuildinfo files to allow for incremental compilation of projects.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub incremental: Option<bool>,

  /// Log paths used during the `moduleResolution` process.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub trace_resolution: Option<bool>,

  /// Enable verbose logging
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub verbose: Option<bool>,
}

/// Specify the polling strategy to use when the system runs out of or doesn't
/// support native   file watchers. Requires TypeScript version 3.8 or later.
#[derive(Serialize, Deserialize, Debug, Clone, PartialOrd, Ord, PartialEq, Eq, Hash)]
#[serde(rename_all = "lowercase")]
pub enum FallbackPolling {
  FixedPollingInterval,
  PriorityPollingInterval,
  DynamicPriorityPolling,
  FixedInterval,
  PriorityInterval,
  DynamicPriority,
  FixedChunkSize,
}
impl ToString for FallbackPolling {
  fn to_string(&self) -> String {
    match self {
      FallbackPolling::FixedPollingInterval => "fixedPollingInterval".to_string(),
      FallbackPolling::PriorityPollingInterval => "priorityPollingInterval".to_string(),
      FallbackPolling::DynamicPriorityPolling => "dynamicPriorityPolling".to_string(),
      FallbackPolling::FixedInterval => "fixedInterval".to_string(),
      FallbackPolling::PriorityInterval => "priorityInterval".to_string(),
      FallbackPolling::DynamicPriority => "dynamicPriority".to_string(),
      FallbackPolling::FixedChunkSize => "fixedChunkSize".to_string(),
    }
  }
}

/// Specify emit/checking behavior for imports that are only used for types.
#[derive(Serialize, Deserialize, Debug, Clone, PartialOrd, Ord, PartialEq, Eq, Hash)]
#[serde(rename_all = "lowercase")]
pub enum ImportsNotUsedAsValues {
  Remove,
  Preserve,
  Error,
}
impl ToString for ImportsNotUsedAsValues {
  fn to_string(&self) -> String {
    match self {
      ImportsNotUsedAsValues::Remove => "remove".to_string(),
      ImportsNotUsedAsValues::Preserve => "preserve".to_string(),
      ImportsNotUsedAsValues::Error => "error".to_string(),
    }
  }
}
/// Specify what JSX code is generated.
#[derive(Serialize, Deserialize, Debug, Clone, PartialOrd, Ord, PartialEq, Eq, Hash)]
pub enum Jsx {
  #[serde(rename = "preserve")]
  Preserve,
  #[serde(rename = "react")]
  React,
  #[serde(rename = "react-jsx")]
  ReactJsx,
  #[serde(rename = "react-jsxdev")]
  ReactJsxdev,
  #[serde(rename = "react-native")]
  ReactNative,
}

impl ToString for Jsx {
  fn to_string(&self) -> String {
    match self {
      Jsx::Preserve => "preserve".to_string(),
      Jsx::React => "react".to_string(),
      Jsx::ReactJsx => "react-jsx".to_string(),
      Jsx::ReactJsxdev => "react-jsxdev".to_string(),
      Jsx::ReactNative => "react-native".to_string(),
    }
  }
}

/// TODO implement case insensitive deserialization for this enum.
/// https://damad.be/joost/blog/rust-serde-deserialization-of-an-enum-variant.html
#[derive(Serialize, Deserialize, Debug, Clone, PartialOrd, Ord, PartialEq, Eq, Hash)]
#[serde(remote = "Lib")]
pub enum Lib {
  #[serde(rename = "es5")]
  Es5,
  #[serde(rename = "es6")]
  Es6,
  #[serde(rename = "es2015")]
  Es2015,
  #[serde(rename = "es2015.collection")]
  Es2015Collection,
  #[serde(rename = "es2015.core")]
  Es2015Core,
  #[serde(rename = "es2015.generator")]
  Es2015Generator,
  #[serde(rename = "es2015.iterable")]
  Es2015Iterable,
  #[serde(rename = "es2015.promise")]
  Es2015Promise,
  #[serde(rename = "es2015.proxy")]
  Es2015Proxy,
  #[serde(rename = "es2015.reflect")]
  Es2015Reflect,
  #[serde(rename = "es2015.symbol.wellknown")]
  Es2015SymbolWellKnown,
  #[serde(rename = "es2015.symbol")]
  Es2015Symbol,
  #[serde(rename = "es2016")]
  Es2016,
  #[serde(rename = "es2016.array.include")]
  Es2016ArrayInclude,
  #[serde(rename = "es2017")]
  Es2017,
  #[serde(rename = "es2017.intl")]
  Es2017Intl,
  #[serde(rename = "es2017.object")]
  Es2017Object,
  #[serde(rename = "es2017.sharedmemory")]
  Es2017SharedMemory,
  #[serde(rename = "es2017.string")]
  Es2017String,
  #[serde(rename = "es2017.typedarrays")]
  Es2017TypedArrays,
  #[serde(rename = "es2018")]
  Es2018,
  #[serde(rename = "es2018.asyncgenerator")]
  Es2018AsyncGenerator,
  #[serde(rename = "es2018.asynciterable")]
  Es2018AsyncIterable,
  #[serde(rename = "es2018.intl")]
  Es2018Intl,
  #[serde(rename = "es2018.promise")]
  Es2018Promise,
  #[serde(rename = "es2018.regexp")]
  Es2018Regexp,
  #[serde(rename = "es2019")]
  Es2019,
  #[serde(rename = "es2019.array")]
  Es2019Array,
  #[serde(rename = "es2019.object")]
  Es2019Object,
  #[serde(rename = "es2019.string")]
  Es2019String,
  #[serde(rename = "es2019.symbol")]
  Es2019Symbol,
  #[serde(rename = "es2020")]
  Es2020,
  #[serde(rename = "es2020.bigint")]
  Es2020BigInt,
  #[serde(rename = "es2020.promise")]
  Es2020Promise,
  #[serde(rename = "es2020.string")]
  Es2020String,
  #[serde(rename = "es2020.symbol.wellknown")]
  Es2020SymbolWellKnown,
  #[serde(rename = "esnext")]
  EsNext,
  #[serde(rename = "esnext.array")]
  EsNextArray,
  #[serde(rename = "esnext.asynciterable")]
  EsNextAsyncIterable,
  #[serde(rename = "esnext.bigint")]
  EsNextBigInt,
  #[serde(rename = "esnext.intl")]
  EsNextIntl,
  #[serde(rename = "esnext.promise")]
  EsNextPromise,
  #[serde(rename = "esnext.string")]
  EsNextString,
  #[serde(rename = "esnext.symbol")]
  EsNextSymbol,
  #[serde(rename = "dom")]
  Dom,
  #[serde(rename = "dom.iterable")]
  DomIterable,
  #[serde(rename = "scripthost")]
  ScriptHost,
  #[serde(rename = "webworker")]
  WebWorker,
  #[serde(rename = "webworker.importscripts")]
  WebWorkerImportScripts,
  #[serde(rename = "webworker.iterable")]
  WebWorkerIterable,
  #[serde(rename = "es7")]
  Es7,
  #[serde(rename = "es2021")]
  Es2021,
  #[serde(rename = "es2020.sharedmemory")]
  Es2020SharedMemory,
  #[serde(rename = "es2020.intl")]
  Es2020Intl,
  #[serde(rename = "es2021.promise")]
  Es2021Promise,
  #[serde(rename = "es2021.string")]
  Es2021String,
  #[serde(rename = "es2021.weakref")]
  Es2021WeakRef,
  #[serde(rename = "esnext.weakref")]
  EsNextWeakRef,
  #[serde(rename = "es2021.intl")]
  Es2021Intl,
}

impl<'de> Deserialize<'de> for Lib {
  fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
  where
    D: Deserializer<'de>,
  {
    let s = String::deserialize(deserializer)?.to_lowercase();

    if s == Lib::Es5.to_string().to_lowercase() {
      Ok(Lib::Es5)
    }

    if s == Lib::Es6.to_string().to_lowercase() {
      Ok(Lib::Es6)
    }

    if s == Lib::Es2015.to_string().to_lowercase() {
      Ok(Lib::Es2015)
    }

    if s == Lib::Es2015Collection.to_string().to_lowercase() {
      Ok(Lib::Es2015Collection)
    }

    if s == Lib::Es2015Core.to_string().to_lowercase() {
      Ok(Lib::Es2015Core)
    }

    if s == Lib::Es2015Generator.to_string().to_lowercase() {
      Ok(Lib::Es2015Generator)
    }

    if s == Lib::Es2015Iterable.to_string().to_lowercase() {
      Ok(Lib::Es2015Iterable)
    }

    if s == Lib::Es2015Promise.to_string().to_lowercase() {
      Ok(Lib::Es2015Promise)
    }

    if s == Lib::Es2015Proxy.to_string().to_lowercase() {
      Ok(Lib::Es2015Proxy)
    }

    if s == Lib::Es2015Reflect.to_string().to_lowercase() {
      Ok(Lib::Es2015Reflect)
    }

    if s == Lib::Es2015SymbolWellKnown.to_string().to_lowercase() {
      Ok(Lib::Es2015SymbolWellKnown)
    }

    if s == Lib::Es2015Symbol.to_string().to_lowercase() {
      Ok(Lib::Es2015Symbol)
    }

    if s == Lib::Es2016.to_string().to_lowercase() {
      Ok(Lib::Es2016)
    }

    if s == Lib::Es2016ArrayInclude.to_string().to_lowercase() {
      Ok(Lib::Es2016ArrayInclude)
    }

    if s == Lib::Es2017.to_string().to_lowercase() {
      Ok(Lib::Es2017)
    }

    if s == Lib::Es2017Intl.to_string().to_lowercase() {
      Ok(Lib::Es2017Intl)
    }

    if s == Lib::Es2017Object.to_string().to_lowercase() {
      Ok(Lib::Es2017Object)
    }

    if s == Lib::Es2017SharedMemory.to_string().to_lowercase() {
      Ok(Lib::Es2017SharedMemory)
    }

    if s == Lib::Es2017String.to_string().to_lowercase() {
      Ok(Lib::Es2017String)
    }

    if s == Lib::Es2017TypedArrays.to_string().to_lowercase() {
      Ok(Lib::Es2017TypedArrays)
    }

    if s == Lib::Es2018.to_string().to_lowercase() {
      Ok(Lib::Es2018)
    }

    if s == Lib::Es2018AsyncGenerator.to_string().to_lowercase() {
      Ok(Lib::Es2018AsyncGenerator)
    }

    if s == Lib::Es2018AsyncIterable.to_string().to_lowercase() {
      Ok(Lib::Es2018AsyncIterable)
    }

    if s == Lib::Es2018Intl.to_string().to_lowercase() {
      Ok(Lib::Es2018Intl)
    }

    if s == Lib::Es2018Promise.to_string().to_lowercase() {
      Ok(Lib::Es2018Promise)
    }

    if s == Lib::Es2018Regexp.to_string().to_lowercase() {
      Ok(Lib::Es2018Regexp)
    }

    if s == Lib::Es2019.to_string().to_lowercase() {
      Ok(Lib::Es2019)
    }

    if s == Lib::Es2019Array.to_string().to_lowercase() {
      Ok(Lib::Es2019Array)
    }

    if s == Lib::Es2019Object.to_string().to_lowercase() {
      Ok(Lib::Es2019Object)
    }

    if s == Lib::Es2019String.to_string().to_lowercase() {
      Ok(Lib::Es2019String)
    }

    if s == Lib::Es2019Symbol.to_string().to_lowercase() {
      Ok(Lib::Es2019Symbol)
    }

    if s == Lib::Es2020.to_string().to_lowercase() {
      Ok(Lib::Es2020)
    }

    if s == Lib::Es2020BigInt.to_string().to_lowercase() {
      Ok(Lib::Es2020BigInt)
    }

    if s == Lib::Es2020Promise.to_string().to_lowercase() {
      Ok(Lib::Es2020Promise)
    }

    if s == Lib::Es2020String.to_string().to_lowercase() {
      Ok(Lib::Es2020String)
    }

    if s == Lib::Es2020SymbolWellKnown.to_string().to_lowercase() {
      Ok(Lib::Es2020SymbolWellKnown)
    }

    if s == Lib::EsNext.to_string().to_lowercase() {
      Ok(Lib::EsNext)
    }

    if s == Lib::EsNextArray.to_string().to_lowercase() {
      Ok(Lib::EsNextArray)
    }

    if s == Lib::EsNextAsyncIterable.to_string().to_lowercase() {
      Ok(Lib::EsNextAsyncIterable)
    }

    if s == Lib::EsNextBigInt.to_string().to_lowercase() {
      Ok(Lib::EsNextBigInt)
    }

    if s == Lib::EsNextIntl.to_string().to_lowercase() {
      Ok(Lib::EsNextIntl)
    }

    if s == Lib::EsNextPromise.to_string().to_lowercase() {
      Ok(Lib::EsNextPromise)
    }

    if s == Lib::EsNextString.to_string().to_lowercase() {
      Ok(Lib::EsNextString)
    }

    if s == Lib::EsNextSymbol.to_string().to_lowercase() {
      Ok(Lib::EsNextSymbol)
    }

    if s == Lib::Dom.to_string().to_lowercase() {
      Ok(Lib::Dom)
    }

    if s == Lib::DomIterable.to_string().to_lowercase() {
      Ok(Lib::DomIterable)
    }

    if s == Lib::ScriptHost.to_string().to_lowercase() {
      Ok(Lib::ScriptHost)
    }

    if s == Lib::WebWorker.to_string().to_lowercase() {
      Ok(Lib::WebWorker)
    }

    if s == Lib::WebWorkerImportScripts.to_string().to_lowercase() {
      Ok(Lib::WebWorkerImportScripts)
    }

    if s == Lib::WebWorkerIterable.to_string().to_lowercase() {
      Ok(Lib::WebWorkerIterable)
    }

    if s == Lib::Es7.to_string().to_lowercase() {
      Ok(Lib::Es7)
    }

    if s == Lib::Es2021.to_string().to_lowercase() {
      Ok(Lib::Es2021)
    }

    if s == Lib::Es2020SharedMemory.to_string().to_lowercase() {
      Ok(Lib::Es2020SharedMemory)
    }

    if s == Lib::Es2020Intl.to_string().to_lowercase() {
      Ok(Lib::Es2020Intl)
    }

    if s == Lib::Es2021Promise.to_string().to_lowercase() {
      Ok(Lib::Es2021Promise)
    }

    if s == Lib::Es2021String.to_string().to_lowercase() {
      Ok(Lib::Es2021String)
    }

    if s == Lib::Es2021WeakRef.to_string().to_lowercase() {
      Ok(Lib::Es2021WeakRef)
    }

    if s == Lib::EsNextWeakRef.to_string().to_lowercase() {
      Ok(Lib::EsNextWeakRef)
    }

    if s == Lib::Es2021Intl.to_string().to_lowercase() {
      Ok(Lib::Es2021Intl)
    }

    Lib::deserialize(s.into_deserializer())
  }
}

impl ToString for Lib {
  fn to_string(&self) -> String {
    match self {
      Lib::Es5 => "ES5".to_string(),
      Lib::Es6 => "ES6".to_string(),
      Lib::Es2015 => "ES2015".to_string(),
      Lib::Es2015Collection => "ES2015.Collection".to_string(),
      Lib::Es2015Core => "ES2015.Core".to_string(),
      Lib::Es2015Generator => "ES2015.Generator".to_string(),
      Lib::Es2015Iterable => "ES2015.Iterable".to_string(),
      Lib::Es2015Promise => "ES2015.Promise".to_string(),
      Lib::Es2015Proxy => "ES2015.Proxy".to_string(),
      Lib::Es2015Reflect => "ES2015.Reflect".to_string(),
      Lib::Es2015SymbolWellKnown => "ES2015.Symbol.WellKnown".to_string(),
      Lib::Es2015Symbol => "ES2015.Symbol".to_string(),
      Lib::Es2016 => "ES2016".to_string(),
      Lib::Es2016ArrayInclude => "ES2016.Array.Include".to_string(),
      Lib::Es2017 => "ES2017".to_string(),
      Lib::Es2017Intl => "ES2017.Intl".to_string(),
      Lib::Es2017Object => "ES2017.Object".to_string(),
      Lib::Es2017SharedMemory => "ES2017.SharedMemory".to_string(),
      Lib::Es2017String => "ES2017.String".to_string(),
      Lib::Es2017TypedArrays => "ES2017.TypedArrays".to_string(),
      Lib::Es2018 => "ES2018".to_string(),
      Lib::Es2018AsyncGenerator => "ES2018.AsyncGenerator".to_string(),
      Lib::Es2018AsyncIterable => "ES2018.AsyncIterable".to_string(),
      Lib::Es2018Intl => "ES2018.Intl".to_string(),
      Lib::Es2018Promise => "ES2018.Promise".to_string(),
      Lib::Es2018Regexp => "ES2018.Regexp".to_string(),
      Lib::Es2019 => "ES2019".to_string(),
      Lib::Es2019Array => "ES2019.Array".to_string(),
      Lib::Es2019Object => "ES2019.Object".to_string(),
      Lib::Es2019String => "ES2019.String".to_string(),
      Lib::Es2019Symbol => "ES2019.Symbol".to_string(),
      Lib::Es2020 => "ES2020".to_string(),
      Lib::Es2020BigInt => "ES2020.BigInt".to_string(),
      Lib::Es2020Promise => "ES2020.Promise".to_string(),
      Lib::Es2020String => "ES2020.String".to_string(),
      Lib::Es2020SymbolWellKnown => "ES2020.Symbol.WellKnown".to_string(),
      Lib::EsNext => "ESNext".to_string(),
      Lib::EsNextArray => "ESNext.Array".to_string(),
      Lib::EsNextAsyncIterable => "ESNext.AsyncIterable".to_string(),
      Lib::EsNextBigInt => "ESNext.BigInt".to_string(),
      Lib::EsNextIntl => "ESNext.Intl".to_string(),
      Lib::EsNextPromise => "ESNext.Promise".to_string(),
      Lib::EsNextString => "ESNext.String".to_string(),
      Lib::EsNextSymbol => "ESNext.Symbol".to_string(),
      Lib::Dom => "DOM".to_string(),
      Lib::DomIterable => "DOM.Iterable".to_string(),
      Lib::ScriptHost => "ScriptHost".to_string(),
      Lib::WebWorker => "WebWorker".to_string(),
      Lib::WebWorkerImportScripts => "WebWorker.ImportScripts".to_string(),
      Lib::WebWorkerIterable => "WebWorker.Iterable".to_string(),
      Lib::Es7 => "ES7".to_string(),
      Lib::Es2021 => "ES2021".to_string(),
      Lib::Es2020SharedMemory => "ES2020.SharedMemory".to_string(),
      Lib::Es2020Intl => "ES2020.Intl".to_string(),
      Lib::Es2021Promise => "ES2021.Promise".to_string(),
      Lib::Es2021String => "ES2021.String".to_string(),
      Lib::Es2021WeakRef => "ES2021.WeakRef".to_string(),
      Lib::EsNextWeakRef => "ESNext.WeakRef".to_string(),
      Lib::Es2021Intl => "ES2021.Intl".to_string(),
    }
  }
}

/// Specify what module code is generated.
#[derive(Serialize, Deserialize, Debug, Clone, PartialOrd, Ord, PartialEq, Eq, Hash)]
#[serde(rename_all = "lowercase")]
#[serde(remote = "Module")]
pub enum Module {
  CommonJs,
  Amd,
  System,
  Umd,
  Es6,
  Es2015,
  Es2020,
  EsNext,
  None,
  Es2022,
  Node12,
  NodeNext,
}

impl<'de> Deserialize<'de> for Module {
  fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
  where
    D: Deserializer<'de>,
  {
    let s = String::deserialize(deserializer)?.to_lowercase();

    if s == Module::CommonJs.to_string().to_lowercase() {
      Ok(Module::CommonJs)
    }

    if s == Module::Amd.to_string().to_lowercase() {
      Ok(Module::Amd)
    }

    if s == Module::System.to_string().to_lowercase() {
      Ok(Module::System)
    }

    if s == Module::Umd.to_string().to_lowercase() {
      Ok(Module::Umd)
    }

    if s == Module::Es6.to_string().to_lowercase() {
      Ok(Module::Es6)
    }

    if s == Module::Es2015.to_string().to_lowercase() {
      Ok(Module::Es2015)
    }

    if s == Module::Es2020.to_string().to_lowercase() {
      Ok(Module::Es2020)
    }

    if s == Module::EsNext.to_string().to_lowercase() {
      Ok(Module::EsNext)
    }

    if s == Module::None.to_string().to_lowercase() {
      Ok(Module::None)
    }

    if s == Module::Es2022.to_string().to_lowercase() {
      Ok(Module::Es2022)
    }

    if s == Module::Node12.to_string().to_lowercase() {
      Ok(Module::Node12)
    }

    if s == Module::NodeNext.to_string().to_lowercase() {
      Ok(Module::NodeNext)
    }

    Module::deserialize(s.into_deserializer())
  }
}

impl ToString for Module {
  fn to_string(&self) -> String {
    match self {
      Module::CommonJs => "CommonJS".to_string(),
      Module::Amd => "AMD".to_string(),
      Module::System => "System".to_string(),
      Module::Umd => "UMD".to_string(),
      Module::Es6 => "ES6".to_string(),
      Module::Es2015 => "ES2015".to_string(),
      Module::Es2020 => "ES2020".to_string(),
      Module::EsNext => "ESNext".to_string(),
      Module::None => "None".to_string(),
      Module::Es2022 => "ES2022".to_string(),
      Module::Node12 => "Node12".to_string(),
      Module::NodeNext => "NodeNext".to_string(),
    }
  }
}

/// Specify how TypeScript looks up a file from a given module specifier.
#[derive(Serialize, Deserialize, Debug, Clone, PartialOrd, Ord, PartialEq, Eq, Hash)]
#[serde(rename_all = "lowercase")]
#[serde(remote = "ModuleResolution")]
pub enum ModuleResolution {
  Classic,
  Node,
  Node12,
  NodeNext,
}

impl<'de> Deserialize<'de> for ModuleResolution {
  fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
  where
    D: Deserializer<'de>,
  {
    let s = String::deserialize(deserializer)?.to_lowercase();

    if s == ModuleResolution::Classic.to_string().to_lowercase() {
      Ok(ModuleResolution::Classic)
    }

    if s == ModuleResolution::Node.to_string().to_lowercase() {
      Ok(ModuleResolution::Node)
    }

    if s == ModuleResolution::Node12.to_string().to_lowercase() {
      Ok(ModuleResolution::Node12)
    }

    if s == ModuleResolution::NodeNext.to_string().to_lowercase() {
      Ok(ModuleResolution::NodeNext)
    }

    ModuleResolution::deserialize(s.into_deserializer())
  }
}

impl ToString for ModuleResolution {
  fn to_string(&self) -> String {
    match self {
      ModuleResolution::Classic => "Classic".to_string(),
      ModuleResolution::Node => "Node".to_string(),
      ModuleResolution::Node12 => "Node12".to_string(),
      ModuleResolution::NodeNext => "NodeNext".to_string(),
    }
  }
}

/// Set the newline character for emitting files.
#[derive(Serialize, Deserialize, Debug, Clone, PartialOrd, Ord, PartialEq, Eq, Hash)]
#[serde(rename_all = "lowercase")]
#[serde(remote = "NewLine")]
pub enum NewLine {
  Crlf,
  Lf,
}

impl<'de> Deserialize<'de> for NewLine {
  fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
  where
    D: Deserializer<'de>,
  {
    let s = String::deserialize(deserializer)?.to_lowercase();

    if s == NewLine::Crlf.to_string().to_lowercase() {
      Ok(NewLine::Crlf)
    }

    if s == NewLine::Lf.to_string().to_lowercase() {
      Ok(NewLine::Lf)
    }

    NewLine::deserialize(s.into_deserializer())
  }
}

impl ToString for NewLine {
  fn to_string(&self) -> String {
    match self {
      NewLine::Crlf => "crlf".to_string(),
      NewLine::Lf => "lf".to_string(),
    }
  }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Plugin {
  /// Plugin name.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub name: Option<String>,

  /// All custom plugin options fields are available here.
  #[serde(flatten)]
  pub _additional_fields: AdditionalFields,
}

/// Set the JavaScript language version for emitted JavaScript and include
/// compatible library declarations.
#[derive(Serialize, Deserialize, Debug, Clone, PartialOrd, Ord, PartialEq, Eq, Hash)]
#[serde(remote = "Target")]
pub enum Target {
  #[serde(rename = "es3")]
  Es3,
  #[serde(rename = "es5")]
  Es5,
  #[serde(rename = "es6")]
  Es6,
  #[serde(rename = "es2015")]
  Es2015,
  #[serde(rename = "es2016")]
  Es2016,
  #[serde(rename = "es2017")]
  Es2017,
  #[serde(rename = "es2018")]
  Es2018,
  #[serde(rename = "es2019")]
  Es2019,
  #[serde(rename = "es2020")]
  Es2020,
  #[serde(rename = "es2021")]
  Es2021,
  #[serde(rename = "es2022")]
  Es2022,
  #[serde(rename = "esnext")]
  EsNext,
}

impl<'de> Deserialize<'de> for Target {
  fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
  where
    D: Deserializer<'de>,
  {
    let s = String::deserialize(deserializer)?.to_lowercase();

    if s == Target::Es3.to_string().to_lowercase() {
      Ok(Target::Es3)
    }

    if s == Target::Es5.to_string().to_lowercase() {
      Ok(Target::Es5)
    }

    if s == Target::Es6.to_string().to_lowercase() {
      Ok(Target::Es6)
    }

    if s == Target::Es2015.to_string().to_lowercase() {
      Ok(Target::Es2015)
    }

    if s == Target::Es2016.to_string().to_lowercase() {
      Ok(Target::Es2016)
    }

    if s == Target::Es2017.to_string().to_lowercase() {
      Ok(Target::Es2017)
    }

    if s == Target::Es2018.to_string().to_lowercase() {
      Ok(Target::Es2018)
    }

    if s == Target::Es2019.to_string().to_lowercase() {
      Ok(Target::Es2019)
    }

    if s == Target::Es2020.to_string().to_lowercase() {
      Ok(Target::Es2020)
    }

    if s == Target::Es2021.to_string().to_lowercase() {
      Ok(Target::Es2021)
    }

    if s == Target::Es2022.to_string().to_lowercase() {
      Ok(Target::Es2022)
    }

    if s == Target::EsNext.to_string().to_lowercase() {
      Ok(Target::EsNext)
    }

    Target::deserialize(s.into_deserializer())
  }
}

impl ToString for Target {
  fn to_string(&self) -> String {
    match self {
      Target::Es3 => "ES3".to_string(),
      Target::Es5 => "ES5".to_string(),
      Target::Es6 => "ES6".to_string(),
      Target::Es2015 => "ES2015".to_string(),
      Target::Es2016 => "ES2016".to_string(),
      Target::Es2017 => "ES2017".to_string(),
      Target::Es2018 => "ES2018".to_string(),
      Target::Es2019 => "ES2019".to_string(),
      Target::Es2020 => "ES2020".to_string(),
      Target::Es2021 => "ES2021".to_string(),
      Target::Es2022 => "ES2022".to_string(),
      Target::EsNext => "ESNext".to_string(),
    }
  }
}

/// Specify the strategy for watching directories under systems that lack
/// recursive file-watching functionality. Requires TypeScript version 3.8 or
/// later.
#[derive(Serialize, Deserialize, Debug, Clone, PartialOrd, Ord, PartialEq, Eq, Hash)]
#[serde(rename_all = "lowercase")]
#[serde(remote = "WatchDirectory")]
pub enum WatchDirectory {
  UseFsEvents,
  FixedPollingInterval,
  DynamicPriorityPolling,
  FixedChunkSizePolling,
}

impl<'de> Deserialize<'de> for WatchDirectory {
  fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
  where
    D: Deserializer<'de>,
  {
    use WatchDirectory::*;

    let s = String::deserialize(deserializer)?.to_lowercase();

    if s == UseFsEvents.to_string().to_lowercase() {
      Ok(UseFsEvents)
    }

    if s == FixedPollingInterval.to_string().to_lowercase() {
      Ok(FixedPollingInterval)
    }

    if s == DynamicPriorityPolling.to_string().to_lowercase() {
      Ok(DynamicPriorityPolling)
    }

    if s == FixedChunkSizePolling.to_string().to_lowercase() {
      Ok(FixedChunkSizePolling)
    }

    WatchDirectory::deserialize(s.into_deserializer())
  }
}

impl ToString for WatchDirectory {
  fn to_string(&self) -> String {
    match self {
      WatchDirectory::UseFsEvents => "useFsEvents".to_string(),
      WatchDirectory::FixedPollingInterval => "fixedPollingInterval".to_string(),
      WatchDirectory::DynamicPriorityPolling => "dynamicPriorityPolling".to_string(),
      WatchDirectory::FixedChunkSizePolling => "fixedChunkSizePolling".to_string(),
    }
  }
}

/// Specify the strategy for watching individual files. Requires TypeScript
/// version 3.8 or later.
#[derive(Serialize, Deserialize, Debug, Clone, PartialOrd, Ord, PartialEq, Eq, Hash)]
#[serde(rename_all = "lowercase")]
#[serde(remote = "WatchFile")]
pub enum WatchFile {
  FixedPollingInterval,
  PriorityPollingInterval,
  DynamicPriorityPolling,
  UseFsEvents,
  UseFsEventsOnParentDirectory,
  FixedChunkSizePolling,
}

impl<'de> Deserialize<'de> for WatchFile {
  fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
  where
    D: Deserializer<'de>,
  {
    let s = String::deserialize(deserializer)?.to_lowercase();
    use WatchFile::*;

    if s == FixedPollingInterval.to_string().to_lowercase() {
      Ok(FixedPollingInterval)
    }

    if s == PriorityPollingInterval.to_string().to_lowercase() {
      Ok(PriorityPollingInterval)
    }

    if s == DynamicPriorityPolling.to_string().to_lowercase() {
      Ok(DynamicPriorityPolling)
    }

    if s == UseFsEvents.to_string().to_lowercase() {
      Ok(UseFsEvents)
    }

    if s == UseFsEventsOnParentDirectory.to_string().to_lowercase() {
      Ok(UseFsEventsOnParentDirectory)
    }

    if s == FixedChunkSizePolling.to_string().to_lowercase() {
      Ok(FixedChunkSizePolling)
    }

    WatchFile::deserialize(s.into_deserializer())
  }
}

impl ToString for WatchFile {
  fn to_string(&self) -> String {
    match self {
      WatchFile::FixedPollingInterval => "fixedPollingInterval".to_string(),
      WatchFile::PriorityPollingInterval => "priorityPollingInterval".to_string(),
      WatchFile::DynamicPriorityPolling => "dynamicPriorityPolling".to_string(),
      WatchFile::UseFsEvents => "useFsEvents".to_string(),
      WatchFile::UseFsEventsOnParentDirectory => "useFsEventsOnParentDirectory".to_string(),
      WatchFile::FixedChunkSizePolling => "fixedChunkSizePolling".to_string(),
    }
  }
}

/// Instructs the TypeScript compiler how to compile .ts files.
#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct CompilerOptions {
  /// Allow JavaScript files to be a part of your program. Use the `checkJS`
  /// option to get errors from these files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub allow_js: Option<bool>,

  /// Allow 'import x from y' when a module doesn't have a default export.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub allow_synthetic_default_imports: Option<bool>,

  /// Allow accessing UMD globals from modules.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub allow_umd_global_access: Option<bool>,

  /// Disable error reporting for unreachable code.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub allow_unreachable_code: Option<bool>,

  /// Disable error reporting for unused labels.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub allow_unused_labels: Option<bool>,

  /// Ensure 'use strict' is always emitted.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub always_strict: Option<bool>,

  /// Have recompiles in '--incremental' and '--watch' assume that changes
  /// within a file will only affect files directly depending on it. Requires
  /// TypeScript version 3.8 or later.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub assume_changes_only_affect_direct_dependencies: Option<bool>,

  /// Specify the base directory to resolve non-relative module names.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub base_url: Option<String>,

  /// No longer supported. In early versions, manually set the text encoding for
  /// reading files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub charset: Option<String>,

  /// Enable error reporting in type-checked JavaScript files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub check_js: Option<bool>,

  /// Enable constraints that allow a TypeScript project to be used with project
  /// references.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub composite: Option<bool>,

  /// Generate .d.ts files from TypeScript and JavaScript files in your project.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub declaration: Option<bool>,

  /// Specify the output directory for generated declaration files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub declaration_dir: Option<String>,

  /// Create sourcemaps for d.ts files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub declaration_map: Option<bool>,

  /// Output compiler performance information after building.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub diagnostics: Option<bool>,

  /// Reduce the number of projects loaded automatically by TypeScript.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub disable_referenced_project_load: Option<bool>,

  /// Remove the 20mb cap on total source code size for JavaScript files in the
  /// TypeScript language server.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub disable_size_limit: Option<bool>,

  /// Opt a project out of multi-project reference checking when editing.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub disable_solution_searching: Option<bool>,

  /// Disable preferring source files instead of declaration files when
  /// referencing composite projects
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub disable_source_of_project_reference_redirect: Option<bool>,

  /// Emit more compliant, but verbose and less performant JavaScript for
  /// iteration.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub downlevel_iteration: Option<bool>,

  /// Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub emit_bom: Option<bool>,

  /// Only output d.ts files and not JavaScript files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub emit_declaration_only: Option<bool>,

  /// Emit design-type metadata for decorated declarations in source files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub emit_decorator_metadata: Option<bool>,

  /// Emit additional JavaScript to ease support for importing CommonJS modules.
  /// This enables `allowSyntheticDefaultImports` for type compatibility.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub es_module_interop: Option<bool>,

  /// Differentiate between undefined and not present when type checking
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub exact_optional_property_types: Option<bool>,

  /// Enable experimental support for TC39 stage 2 draft decorators.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub experimental_decorators: Option<bool>,

  /// Output more detailed compiler performance information after building.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub extended_diagnostics: Option<bool>,

  /// Specify the polling strategy to use when the system runs out of or doesn't
  /// support native file watchers. Requires TypeScript version 3.8 or later.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub fallback_polling: Option<FallbackPolling>,

  /// Ensure that casing is correct in imports.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub force_consistent_casing_in_file_names: Option<bool>,

  /// Emit a v8 CPU profile of the compiler run for debugging.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub generate_cpu_profile: Option<String>,

  /// Allow importing helper functions from tslib once per project, instead of
  /// including them per-file.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub import_helpers: Option<bool>,

  /// Specify emit/checking behavior for imports that are only used for types.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub imports_not_used_as_values: Option<ImportsNotUsedAsValues>,

  /// Enable incremental compilation. Requires TypeScript version 3.4 or later.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub incremental: Option<bool>,

  /// Include sourcemap files inside the emitted JavaScript.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub inline_source_map: Option<bool>,

  /// Include source code in the sourcemaps inside the emitted JavaScript.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub inline_sources: Option<bool>,

  /// Ensure that each file can be safely transpiled without relying on other
  /// imports.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub isolated_modules: Option<bool>,

  /// Specify what JSX code is generated.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub jsx: Option<Jsx>,

  /// Specify the JSX factory function used when targeting React JSX emit, e.g.
  /// 'React.createElement' or 'h'
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub jsx_factory: Option<String>,

  /// Specify the JSX Fragment reference used for fragments when targeting React
  /// JSX emit e.g. 'React.Fragment' or 'Fragment'.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub jsx_fragment_factory: Option<String>,

  /// Specify module specifier used to import the JSX factory functions when
  /// using `jsx: react-jsx`.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub jsx_import_source: Option<String>,

  /// Make keyof only return strings instead of string, numbers or symbols.
  /// Legacy option.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub keyof_strings_only: Option<bool>,

  /// Specify a set of bundled library declaration files that describe the
  /// target runtime environment.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub lib: Option<Vec<Lib>>,

  /// Print the names of emitted files after a compilation.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub list_emitted_files: Option<bool>,

  /// Print all of the files read during the compilation.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub list_files: Option<bool>,

  /// Print names of files that are part of the compilation and then stop
  /// processing.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub list_files_only: Option<bool>,

  /// Specify the location where debugger should locate map files instead of
  /// generated locations.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub map_root: Option<String>,

  /// The maximum dependency depth to search under `node_modules` and load
  /// JavaScript files.
  ///
  /// This flag is can only be used when `allowJs` is enabled, and is used if
  /// you want to have TypeScript infer types for all of the JavaScript inside
  /// your `node_modules`.
  ///
  /// Ideally this should stay at 0 (the default), and `d.ts` files should be
  /// used to explicitly define the shape of modules. However, there are cases
  /// where you may want to turn this on at the expense of speed and potential
  /// accuracy.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub max_node_module_js_depth: Option<f64>,

  /// Specify what module code is generated.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub module: Option<Module>,

  /// Specify how TypeScript looks up a file from a given module specifier.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub module_resolution: Option<ModuleResolution>,

  /// Set the newline character for emitting files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub new_line: Option<NewLine>,

  /// Disable emitting file from a compilation.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_emit: Option<bool>,

  /// Disable generating custom helper functions like `__extends` in compiled
  /// output.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_emit_helpers: Option<bool>,

  /// Disable emitting files if any type checking errors are reported.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_emit_on_error: Option<bool>,

  /// Disable truncating types in error messages.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_error_truncation: Option<bool>,

  /// Enable error reporting for fallthrough cases in switch statements.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_fallthrough_cases_in_switch: Option<bool>,

  /// Enable error reporting for expressions and declarations with an implied
  /// `any` type..
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_implicit_any: Option<bool>,

  /// Ensure overriding members in derived classes are marked with an override
  /// modifier.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_implicit_override: Option<bool>,

  /// Enable error reporting for codepaths that do not explicitly return in a
  /// function.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_implicit_returns: Option<bool>,

  /// Enable error reporting when `this` is given the type `any`.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_implicit_this: Option<bool>,

  /// Disable adding 'use strict' directives in emitted JavaScript files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_implicit_use_strict: Option<bool>,

  /// Disable including any library files, including the default lib.d.ts.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_lib: Option<bool>,

  /// Enforces using indexed accessors for keys declared using an indexed type
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_property_access_from_index_signature: Option<bool>,

  /// Disallow `import`s, `require`s or `<reference>`s from expanding the number
  /// of files TypeScript should add to a project.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_resolve: Option<bool>,

  /// Disable strict checking of generic signatures in function types.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_strict_generic_checks: Option<bool>,

  /// Add `undefined` to a type when accessed using an index.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_unchecked_indexed_access: Option<bool>,

  /// Enable error reporting when a local variables aren't read.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_unused_locals: Option<bool>,

  /// Raise an error when a function parameter isn't read
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub no_unused_parameters: Option<bool>,

  /// Specify an output folder for all emitted files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub out_dir: Option<String>,

  /// Specify a file that bundles all outputs into one JavaScript file. If
  /// `declaration` is true, also designates a file that bundles all .d.ts
  /// output.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub out_file: Option<String>,

  /// A series of entries which re-map imports to lookup locations relative to
  /// the `baseUrl`. There is a larger coverage of paths in
  /// the handbook.
  ///
  /// `paths` lets you declare how TypeScript should resolve an import in your
  /// `require`/`import`s.
  #[serde(default, skip_serializing_if = "Map::is_empty")]
  pub paths: Map<String, Vec<String>>,

  /// Specify a list of language service plugins to include.
  #[serde(default, skip_serializing_if = "Vec::is_empty")]
  pub plugins: Vec<Plugin>,

  /// Disable erasing `const enum` declarations in generated code.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub preserve_const_enums: Option<bool>,

  /// Disable resolving symlinks to their realpath. This correlates to the same
  /// flag in node.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub preserve_symlinks: Option<bool>,

  /// Preserve unused imported values in the JavaScript output that would
  /// otherwise be removed
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub preserve_value_imports: Option<bool>,

  /// Disable wiping the console in watch mode
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub preserve_watch_output: Option<bool>,

  /// Enable color and formatting in output to make compiler errors easier to
  /// read
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub pretty: Option<bool>,

  /// Specify the object invoked for `createElement`. This only applies when
  /// targeting `react` JSX emit.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub react_namespace: Option<String>,

  /// Disable emitting comments.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub remove_comments: Option<bool>,

  /// Enable importing .json files
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub resolve_json_module: Option<bool>,

  /// Specify the root folder within your source files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub root_dir: Option<String>,

  /// Allow multiple folders to be treated as one when resolving modules.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub root_dirs: Option<Vec<String>>,

  /// Skip type checking .d.ts files that are included with TypeScript.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub skip_default_lib_check: Option<bool>,

  /// Skip type checking all .d.ts files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub skip_lib_check: Option<bool>,

  /// Create source map files for emitted JavaScript files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub source_map: Option<bool>,

  /// Specify the root path for debuggers to find the reference source code.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub source_root: Option<String>,

  /// Enable all strict type checking options.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub strict: Option<bool>,

  /// Check that the arguments for `bind`, `call`, and `apply` methods match the
  /// original function.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub strict_bind_call_apply: Option<bool>,

  /// When assigning functions, check to ensure parameters and the return values
  /// are subtype-compatible.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub strict_function_types: Option<bool>,

  /// When type checking, take into account `null` and `undefined`.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub strict_null_checks: Option<bool>,

  /// Check for class properties that are declared but not set in the
  /// constructor.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub strict_property_initialization: Option<bool>,

  /// Disable emitting declarations that have `@internal` in their JSDoc
  /// comments.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub strip_internal: Option<bool>,

  /// Disable reporting of excess property errors during the creation of object
  /// literals.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub suppress_excess_property_errors: Option<bool>,

  /// Suppress `noImplicitAny` errors when indexing objects that lack index
  /// signatures.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub suppress_implicit_any_index_errors: Option<bool>,

  /// Set the JavaScript language version for emitted JavaScript and include
  /// compatible library declarations.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub target: Option<Target>,

  /// Enable tracing of the name resolution process. Requires TypeScript version
  /// 2.0 or later.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub trace_resolution: Option<bool>,

  /// Specify the folder for .tsbuildinfo incremental compilation files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub ts_build_info_file: Option<String>,

  /// Specify multiple folders that act like `./node_modules/@types`.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub type_roots: Option<Vec<String>>,

  /// Specify type package names to be included without being referenced in a
  /// source file.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub types: Option<Vec<String>>,

  /// Emit ECMAScript-standard-compliant class fields.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub use_define_for_class_fields: Option<bool>,

  /// Default catch clause variables as `unknown` instead of `any`.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub use_unknown_in_catch_variables: Option<bool>,

  /// Watch input files.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub watch: Option<bool>,

  /// Specify the strategy for watching directories under systems that lack
  /// recursive file-watching functionality. Requires TypeScript version 3.8
  /// or later.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub watch_directory: Option<WatchDirectory>,

  /// Specify the strategy for watching individual files. Requires TypeScript
  /// version 3.8 or later.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub watch_file: Option<WatchFile>,
}

/// Project reference.
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Reference {
  /// Path to referenced tsconfig or to folder containing tsconfig.
  #[serde(default)]
  pub path: String,

  /// Enable prepending the output of a dependency using the prepend option
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub prepend: Option<bool>,
}

/// Auto type (.d.ts) acquisition options for this project. Requires TypeScript
/// version 2.1 or later.
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct TypeAcquisition {
  /// Enable auto type acquisition
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub enable: Option<bool>,

  /// Specifies a list of type declarations to be excluded from auto type
  /// acquisition. Ex. "jquery", "lodash"
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub exclude: Option<Vec<String>>,

  /// Specifies a list of type declarations to be included in auto type
  /// acquisition. Ex. "jquery", "lodash"
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub include: Option<Vec<String>>,
}

/// Settings for the watch mode in TypeScript.
#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct WatchOptions {
  /// Remove a list of directories from the watch process.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub exclude_directories: Option<Vec<String>>,

  /// Remove a list of files from the watch mode's processing.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub exclude_files: Option<Vec<String>>,

  /// Specify what approach the watcher should use if the system runs out of
  /// native file watchers.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub fallback_polling: Option<String>,

  /// ~
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub force: Option<String>,

  /// Synchronously call callbacks and update the state of directory watchers on
  /// platforms that don`t support recursive watching natively.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub synchronous_watch_directory: Option<bool>,

  ///Specify how directories are watched on systems that lack recursive
  /// file-watching functionality.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub watch_directory: Option<String>,

  /// Specify how the TypeScript watch mode works.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub watch_file: Option<String>,
}

/// JSON schema for the TypeScript compiler's configuration file
#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct TsConfig<A = AdditionalFields> {
  /// These options make up the bulk of TypeScript’s configuration and it covers
  /// how the language should work.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub compiler_options: Option<CompilerOptions>,

  /// Enable Compile-on-Save for this project.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub compile_on_save: Option<bool>,

  /// Path to base configuration file to inherit from. Requires TypeScript
  /// version 2.1 or later.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub extends: Option<String>,

  /// Type Acquisition is only important for JavaScript projects. In TypeScript
  /// projects you need to include the types in your projects explicitly.
  /// However, for JavaScript projects, the TypeScript tooling will download
  /// types for your modules in the background and outside of your node_modules
  /// folder.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub type_acquisition: Option<TypeAcquisition>,

  pub build_options: Option<BuildOptions>,

  /// You can configure the how TypeScript `--watch` works. This section is
  /// mainly for handling case where `fs.watch` and `fs.watchFile` have
  /// additional constraints like on Linux. You can read more at [Configuring Watch](https://www.typescriptlang.org/docs/handbook/configuring-watch.html).
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub watch_options: Option<WatchOptions>,

  /// If no 'files' or 'include' property is present in a tsconfig.json, the
  /// compiler defaults to including all files in the containing directory and
  /// subdirectories except those specified by 'exclude'. When a 'files'
  /// property is specified, only those files and those specified by 'include'
  /// are included.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub files: Option<Vec<String>>,

  /// Specifies a list of glob patterns that match files to be included in
  /// compilation. If     no 'files' or 'include' property is present in a
  /// tsconfig.json, the compiler defaults     to including all files in the
  /// containing directory and subdirectories except those     specified by
  /// 'exclude'. Requires TypeScript version 2.0 or later.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub include: Option<Vec<String>>,

  /// Specifies a list of files to be excluded from compilation. The 'exclude'
  /// property only     affects the files included via the 'include' property
  /// and not the 'files' property.   Glob patterns require TypeScript version
  /// 2.0 or later.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub exclude: Option<Vec<String>>,

  /// Referenced projects. Requires TypeScript version 3.0 or later.
  #[serde(default, skip_serializing_if = "Option::is_none")]
  pub references: Option<Vec<Reference>>,

  #[serde(flatten)]
  pub _additional_fields_: A,
}
