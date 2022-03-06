use std::{env, fs, path::Path};

use schemars::schema::Schema;
use typify::TypeSpace;

fn main() {
  let env_schema_name = env::var("SCHEMA").ok();

  if env_schema_name.is_none() {
    // Don't perform a build.
    return;
  }

  let temp = env_schema_name.unwrap();
  let schema_name = temp.as_str();

  // let content = include_str!("./schemas/schema_package.json");
  // let content = include_str!("./schemas/schema_example.json");
  // let content = include_str!("./schemas/schema_tsconfig.json");
  let content = fs::read_to_string(format!("./schemas/schema_{}.json", schema_name)).unwrap();
  let schema = serde_json::from_str::<schemars::schema::RootSchema>(content.as_str()).unwrap();

  let mut type_space = TypeSpace::default();
  type_space.add_ref_types(schema.definitions).unwrap();
  let base_type = &schema.schema;
  // Only convert the top-level type if it has a name
  if (|| base_type.metadata.as_ref()?.title.as_ref())().is_some() {
    let _ = type_space.add_type(&Schema::Object(schema.schema)).unwrap();
  }

  let content = format!(
    "{}\n\n{}",
    "use serde::{Deserialize, Serialize};",
    type_space.to_string()
  );

  let mut out_file = Path::new("./src").to_path_buf();
  out_file.push(format!("_{}.rs", schema_name));
  fs::write(out_file, &content).unwrap();
}
