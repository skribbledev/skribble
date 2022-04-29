use std::fs::read_to_string;

use indexmap::IndexMap;
use json_schemas::{
  tsconfig::{CompilerOptions, Lib, Module},
  AdditionalFields,
  TsConfig,
};

#[test]
fn parse_tsconfig_file() {
  let contents = read_to_string("./tests/fixtures/tsconfig/1/tsconfig.json").unwrap();
  let tsconfig = TsConfig::try_from(contents).unwrap();

  insta::assert_json_snapshot!(tsconfig, @r###"
  {
    "compilerOptions": {
      "lib": [
        "es2015.symbol.wellknown"
      ],
      "module": "es2022"
    },
    "extends": "./.monots/tsconfig.base.json"
  }
  "###);
}

#[test]
fn parse_tsconfig_file_additional_fields() {
  let contents = read_to_string("./tests/fixtures/tsconfig/2/tsconfig.json").unwrap();
  let tsconfig = TsConfig::try_from(contents).unwrap();

  insta::assert_json_snapshot!(tsconfig.other, @r###"
  {
    "extra": "1",
    "superCustom": "2",
    "even_without-camel_casing": true
  }
  "###);
}

#[test]
fn create_tsconfig_file_with_builder_pattern() {
  let mut additional_fields: AdditionalFields = IndexMap::new();
  additional_fields.insert("custom".into(), "value".into());
  let compiler_options = CompilerOptions::builder()
    .module(Module::Es2022)
    .lib(vec![Lib::Es2015SymbolWellKnown])
    .build();

  let tsconfig = TsConfig::builder()
    .extends("./awesome")
    .compiler_options(compiler_options)
    .other(additional_fields)
    .build();

  insta::assert_json_snapshot!(tsconfig, @r###"
  {
    "compilerOptions": {
      "lib": [
        "es2015.symbol.wellknown"
      ],
      "module": "es2022"
    },
    "extends": "./awesome",
    "custom": "value"
  }
  "###)
}
