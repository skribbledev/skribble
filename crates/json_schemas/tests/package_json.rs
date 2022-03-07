use indexmap::IndexMap;
use json_schemas::{package_json::Person, AdditionalFields, PackageJson};
use std::fs::read_to_string;

#[test]
fn parse_package_json_file() {
  let contents = read_to_string("./tests/fixtures/package_json/1/package.json").unwrap();
  let package_json = PackageJson::try_from(contents).unwrap();

  assert_eq!(package_json.name.unwrap(), "test");
  insta::assert_json_snapshot!(package_json.other, @"{}");
}

#[test]
fn parse_package_json_file_additional_fields() {
  let contents = read_to_string("./tests/fixtures/package_json/2/package.json").unwrap();
  let package_json = PackageJson::try_from(contents).unwrap();

  insta::assert_json_snapshot!(package_json.other, @r###"
  {
    "extra": "1",
    "superCustom": "2",
    "even_without-camel_casing": true
  }
  "###);
}

#[test]
fn create_package_json_file_with_builder_pattern() {
  let mut additional_fields: AdditionalFields = IndexMap::new();
  additional_fields.insert("custom".into(), "value".into());

  let package_json = PackageJson::builder()
    .name("awesome")
    .author(Person::String("Tester".into()))
    .other(additional_fields)
    .build();

  insta::assert_json_snapshot!(package_json, @r###"
  {
    "name": "awesome",
    "author": "Tester",
    "custom": "value"
  }
  "###)
}
