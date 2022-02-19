use crate::{
  config::Config,
  constants::INDENTATION,
  scanner::class_name::{ClassArguments, ClassName},
  utils::indent,
};
use heck::ToPascalCase;
use indoc::indoc;

const TYPESCRIPT_UTILITIES: &str = indoc! {r#"
  /**
   * The default className signature.
   *
   * ```
   * import { c } from 'skribble-css/client';
   * const className = c.sm.block; // => 'sm:block'
   * ```
   */
  export type ClassName = string;

  /**
   * Type declaration for a dynamic callable className which is generated
   * dynamically based on the value provided.
   *
   * ```
   * import { c } from 'skribble-css/client';
   * const className = c.sm.focus.transformX(-100px); // => 'sm:focus:transformX(-100px)'
   * ```
   */
  export type DynamicClassName = (value: string) => ClassName;

  /**
   * This is used for the atom selectors which are also callable.
   */
  export type WithDynamicClassName<Atom> = Atom & DynamicClassName;

  /**
   * This is used for the breakpoints, media queries and modifiers to add a
   * completely custom class name.
   *
   * Currently spaces are not supported in the values.
   *
   * ```ts
   * import { c } from 'skribble-css/client';
   * const className = c.sm.focus('padding', '10px'); // => 'sm:focus-[padding:10px]'
   */
  export type CustomClassName = (style: string, value: string) => ClassName;

  /**
   * This is used for the breakpoints, media queries and modifiers to add a
   * completely custom class name.
   */
  export type WithCustomClassName<Style> = Style & CustomClassName;
"#};

/// Create documentation comments which are wrapped in a `css` code block.
fn tsdoc_comments(example: &str) -> String {
  format!(
    "/**\n * ```css\n * {}\n * ```\n */\n",
    example
      .split('\n')
      .filter(|v| !v.trim().is_empty())
      .collect::<Vec<&str>>()
      .join("\n * ")
      // Don't allow the code comment to close.
      .replace("*/", "*\\/")
  )
}

/// This converts the provided configuration into a content for a TypeScript
/// declaration file.
///
/// ```ts
/// interface SkribbleCss {
///   sm: SkribbleBreakpointCss;
///   md: SkribbleBreakpointCss;
///   lg: SkribbleBreakpointCss;
///   xl: SkribbleBreakpointCss;
///   focus: SkribbleFocusModifierCss;
///   active: SkribbleActiveModifierCss;
/// }
///
/// type SkribbleBreakpointCss = Omit<SkribbleCss, 'sm' | 'md' | 'lg' | 'xl'>;
/// type SkribbleFocusModifierCss = Omit<SkribbleCss, 'focus'>;
/// ```
pub fn generate_typescript(config: &Config) -> String {
  // Holder for the main content.
  let mut skribble_css_content: Vec<String> = vec![TYPESCRIPT_UTILITIES.to_string()];

  // Holder for the main interface.
  let mut skribble_css_interface: Vec<String> = vec![];

  // Holder for the individual types for each breakpoint.
  let mut types: Vec<String> = vec![];

  // Hold the omitted keys for the generate types.
  let mut omitted_keys: Vec<String> = vec![];

  // => START BREAKPOINTS
  let mut breakpoint_keys: Vec<String> = vec![];

  // Add breakpoints to the skribble_css_interface.
  for (breakpoint, min_width) in config.user.breakpoints.iter() {
    let comments = tsdoc_comments(
      format!("@media (min-width: {}) {{\n  &\n}}", min_width.get_string()).as_str(),
    );

    // Should check if the breakpoint name is safe (begins with a number, but for
    // now just wrap in a string)
    skribble_css_interface.push(format!(
      "{}'{}': WithCustomClassName<SkribbleBreakpointCss>;",
      comments, breakpoint
    ));
    breakpoint_keys.push(format!("'{}'", breakpoint));
  }

  types.push(format!(
    "type BreakpointKeys = {};",
    breakpoint_keys.join(" | ")
  ));
  omitted_keys.push("BreakpointKeys".to_owned());
  types.push(format!(
    "type SkribbleBreakpointCss = Omit<SkribbleCss, {}>;",
    omitted_keys.join(" | ")
  ));
  // => END BREAKPOINTS

  // => START MEDIA QUERIES
  let mut media_query_keys: Vec<String> = vec![];

  // Add breakpoints to the skribble_css_interface.
  for (media_query, value) in config.user.media_queries.iter() {
    let comments = tsdoc_comments(format!("@media {} {{\n  &\n}}", value).as_str());

    skribble_css_interface.push(format!(
      "{}'{}': WithCustomClassName<SkribbleMediaQueryCss>;",
      comments, media_query
    ));
    media_query_keys.push(format!("'{}'", media_query));
  }

  types.push(format!(
    "type MediaQueryKeys = {};",
    media_query_keys.join(" | ")
  ));
  omitted_keys.push("MediaQueryKeys".to_owned());
  types.push(format!(
    "type SkribbleMediaQueryCss = Omit<SkribbleCss, {}>;",
    omitted_keys.join(" | ")
  ));
  // => END MEDIA QUERIES

  // => START PARENT MODIFIERS
  let mut parent_modifier_keys: Vec<String> = vec![];

  for (parent_modifier, value) in config.user.parent_modifiers.iter() {
    let comments = tsdoc_comments(format!("{} {{}}", value.join(", ")).as_str());

    skribble_css_interface.push(format!(
      "{}'{}': WithCustomClassName<SkribbleParentModifierCss>;",
      comments, parent_modifier,
    ));
    parent_modifier_keys.push(format!("'{}'", parent_modifier));
  }

  types.push(format!(
    "type ParentModifierKeys = {};",
    parent_modifier_keys.join(" | ")
  ));
  omitted_keys.push("ParentModifierKeys".to_owned());
  types.push(format!(
    "type SkribbleParentModifierCss = Omit<SkribbleCss, {}>;",
    omitted_keys.join(" | "),
  ));
  // => END PARENT MODIFIERS

  // => START MODIFIERS
  for (index, group) in config.user.modifiers.iter().enumerate() {
    let mut modifier_keys: Vec<String> = vec![];
    for (modifier, value) in group.iter() {
      let comments = tsdoc_comments(format!("{} {{}}", value.join(", ")).as_str());

      skribble_css_interface.push(format!(
        "{}'{}': WithCustomClassName<SkribbleModifierCssGroup{}>;",
        comments, modifier, index
      ));
      modifier_keys.push(format!("'{}'", modifier));
    }

    let modifier_keys_name = format!("ModifierKeys{}", index);
    types.push(format!(
      "type {} = {};",
      modifier_keys_name,
      modifier_keys.join(" | ")
    ));
    omitted_keys.push(modifier_keys_name);

    types.push(format!(
      "type SkribbleModifierCssGroup{} = Omit<SkribbleCss, {}>;",
      index,
      omitted_keys.join(" | ")
    ));
  }
  // => END MODIFIERS

  // => START SHORTHAND
  for shorthand in config.user.shorthand.keys() {
    let mut class_name = ClassName::new(config);
    class_name.add_token(format!("${}", shorthand).as_str());
    let comments = tsdoc_comments(class_name.get_css().as_str());
    let shorthand_name = format!("${}", shorthand);
    skribble_css_interface.push(format!("{}'{}': ClassName;", comments, shorthand_name));
  }
  // => END SHORTHAND

  // => START ATOMS
  let mut interfaces: Vec<String> = vec![];
  for (atom, meta) in config.atoms.iter() {
    let mut class_name = ClassName::new(config);

    class_name.add_token(atom);
    let mut interface: Vec<String> = vec![];
    let interface_name = format!("{}AtomStyle", atom.to_pascal_case());

    for (name, _) in meta.values.iter() {
      let mut style_class_name = class_name.clone();
      let style_name = format!("${}", name);
      style_class_name.add_token(style_name.as_str());
      let style_comments = tsdoc_comments(style_class_name.get_css().as_str());
      interface.push(format!("{}'{}': ClassName;", style_comments, style_name));
    }

    class_name.add_arguments(ClassArguments::Value("<value>".to_owned()));
    let comments = tsdoc_comments(class_name.get_css().as_str());

    interfaces.push(format!(
      "interface {} {{\n{}\n}}",
      interface_name,
      indent(&interface.join("\n"), INDENTATION)
    ));

    skribble_css_interface.push(format!(
      "{}'{}': WithDynamicClassName<{}>;",
      comments, atom, interface_name
    ));
  }
  // => END ATOMS

  // => START STRINGIFY
  let types_string = types.join("\n");
  let interface_string = interfaces.join("\n\n");
  let skribble_css_interface_string = format!(
    "export interface SkribbleCss {{\n{}\n}}",
    indent(&skribble_css_interface.join("\n"), INDENTATION)
  );
  // => END STRINGIFY

  // => FINISH
  skribble_css_content.push(skribble_css_interface_string);
  skribble_css_content.push(types_string);
  skribble_css_content.push(interface_string);
  format!("{}\n", skribble_css_content.join("\n\n"))
}

#[cfg(test)]
mod tests {
  use crate::test_utils::create_config;

  use super::*;

  #[test]
  fn can_generate_typescript() {
    let config = create_config(None).unwrap();
    insta::assert_snapshot!(generate_typescript(&config));
  }
}
