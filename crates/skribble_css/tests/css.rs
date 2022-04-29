use std::{path::PathBuf, sync::Arc};

use skribble_css::{
  config::Config,
  generate_css,
  scanner::class_name_collector::{ClassNameCollector, ValidImport},
};
use swc_common::{input::StringInput, SourceMap};
use swc_ecma_parser::{lexer::Lexer, Capturing, Parser, Syntax, TsConfig};
use swc_ecma_visit::VisitWith;
use testing::fixture;

#[fixture("tests/fixtures/css/*/input.ts")]
fn test_css(input: PathBuf) {
  let config = Config::default();
  // let output = input.parent().unwrap().join("output.css");
  let source_map: Arc<SourceMap> = Arc::default();
  let source_file = source_map
    .load_file(&input)
    .unwrap_or_else(|_| panic!("Could not load source file {:?}", input));
  // let expected = std::fs::read_to_string(&output).expect(
  //   "Could not read output
  // // file",
  // );

  // This is where the source file should be loaded.

  // For now this will be hardcoded.
  let lexer = Lexer::new(
    Syntax::Typescript(TsConfig {
      tsx: true,
      ..Default::default()
    }),
    Default::default(),
    StringInput::from(&*source_file),
    None,
  );

  let mut parser = Parser::new_from(Capturing::new(lexer));

  let module = parser
    .parse_typescript_module()
    .expect("Failed to parse module.");

  let mut collector: ClassNameCollector = ClassNameCollector::new(
    &[
      ValidImport::new("skribble-css/client", "c"),
      ValidImport::new("@skribble-css/client", "c"),
    ],
    &config,
  );
  module.visit_with(&mut collector);

  collector.sort();

  insta::assert_snapshot!(
    input
      .parent()
      .unwrap()
      .file_name()
      .unwrap()
      .to_str()
      .unwrap(),
    generate_css(&config, &collector.get_class_names())
  );
}
