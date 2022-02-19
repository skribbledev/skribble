use swc_common::{input::StringInput, sync::Lrc, FileName, SourceMap};
use swc_ecmascript::{
  parser::{lexer::Lexer, Capturing, Parser, Syntax, TsConfig},
  visit::VisitWith,
};

use crate::{
  config::Config,
  constants::JSON_CONFIG,
  scanner::class_name_collector::{ClassNameCollector, ValidImport},
};

pub(crate) fn collect_classes<'config>(
  config: &'config Config,
  source: &str,
) -> ClassNameCollector<'config> {
  let source_map: Lrc<SourceMap> = Lrc::default();

  // This is where the source file should be loaded.
  let source_file =
    source_map.new_source_file(FileName::Custom("test.js".into()), source.to_string());

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

  let mut collector: ClassNameCollector<'config> = ClassNameCollector::new(
    &[
      ValidImport::new("skribble-css/client", "c"),
      ValidImport::new("@skribble-css/client", "c"),
    ],
    config,
  );
  module.visit_with(&mut collector);

  collector
}

pub(crate) fn get_selectors(config: &Config, source: &str) -> Vec<String> {
  let collector = collect_classes(config, source);
  Vec::from_iter(collector.get_class_names().iter().map(|c| c.get_selector()))
}

pub(crate) fn get_selector(config: &Config, source: &str) -> String {
  let class_names = get_selectors(config, source);
  class_names.first().unwrap().to_string()
}

pub(crate) fn create_config(json: Option<String>) -> Result<Config, serde_json::Error> {
  let json_config = match json {
    Some(json) => json,
    None => JSON_CONFIG.to_string(),
  };

  Config::new(&json_config)
}

macro_rules! snapshot_selector {
  ($test_name:ident : $source:expr $(, $macros:ident) *) => {
    #[test]
    $(#[$macros])*
    fn $test_name() {
      insta::assert_snapshot!(
        crate::test_utils::get_selector(&crate::test_utils::create_config(None).unwrap(), $source)
      );
    }
  };
}

macro_rules! test_no_selector {
  ($test_name:ident : $source:expr $(, $macros:ident) *) => {
    #[test]
    $(#[$macros])*
    fn $test_name() {
      assert!(crate::test_utils::get_selectors(&crate::test_utils::create_config(None).unwrap(), $source).is_empty());
    }
  };
}

macro_rules! snapshot_selectors {
  ($test_name:ident : $source:expr $(, $macros:ident) *) => {
    #[test]
    $(#[$macros])*
    fn $test_name() {
      let config = crate::test_utils::create_config(None).unwrap();
      let class_names = crate::test_utils::get_selectors(&config, $source);

     insta::assert_snapshot!(class_names.join("\n"));
    }
  };

}

macro_rules! test_css {
  ($test_name:ident : $source:expr $(, $macros:ident) *) => {
    #[test]
    $(#[$macros])*
    fn $test_name() -> Result<(), serde_json::Error> {
      let config = crate::test_utils::create_config(None)?;
      let mut class_name_collector = crate::test_utils::collect_classes(&config, indoc::indoc!{$source});
      class_name_collector.sort();
      let output = crate::generate_css::generate_css(&config, &class_name_collector.get_class_names());
      insta::assert_snapshot!(output);
      Ok(())
    }
  };
}

pub(crate) use snapshot_selector;
pub(crate) use snapshot_selectors;
pub(crate) use test_css;
pub(crate) use test_no_selector;
