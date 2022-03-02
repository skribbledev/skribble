use indexmap::{IndexMap, IndexSet};

use crate::{
  config::{
    user::{BreakpointHelper, CssValue, MediaQueries},
    Config,
  },
  constants::INDENTATION,
  scanner::class_name::ClassName,
  utils::indent,
};

/// Transform the tokens and configuration into a valid css string which can be
/// written to a file.
///
/// Generate the css string.
///
/// `just_in_time` is a boolean which determines if the css should be
/// generated based on the class_names found.
pub fn generate_css(config: &Config, class_names: &[&ClassName]) -> String {
  let mut breakpoint_map: IndexMap<Option<String>, Vec<&ClassName>> = IndexMap::new();
  let breakpoints = config.user.breakpoints.to_breakpoints();
  let css_variable_names: IndexSet<String> = get_all_css_variables_used(config, class_names);
  let mut keyframe_names: IndexSet<String> = IndexSet::new();
  let mut group_names: IndexMap<String, Vec<String>> = IndexMap::new();

  // Group class_names by breakpoints.
  for class_name in class_names {
    let breakpoint = &class_name.breakpoint;
    keyframe_names.extend(class_name.keyframes.clone());

    for group_name in class_name.groups.iter() {
      group_names
        .entry(group_name.to_owned())
        .or_default()
        .push(class_name.get_selector());
    }

    match breakpoint_map.get_mut(breakpoint) {
      Some(class_name_list) => {
        class_name_list.push(*class_name);
      }

      None => {
        let class_name_list = vec![*class_name];
        breakpoint_map.insert(breakpoint.to_owned(), class_name_list);
      }
    }
  }

  create_css_output(
    config,
    get_groups_and_keyframes_css(config, &keyframe_names, &group_names).as_str(),
    &css_variable_names,
    breakpoints,
    breakpoint_map,
  )
}

fn get_groups_and_keyframes_css(
  config: &Config,
  keyframe_names: &IndexSet<String>,
  group_names: &IndexMap<String, Vec<String>>,
) -> String {
  let mut styles: Vec<String> = vec![];

  for name in keyframe_names {
    if let Some(keyframe) = config.user.keyframes.get(name) {
      styles.push(keyframe.get_css(name));
    }
  }

  for (name, selectors) in group_names.iter() {
    if let Some(group) = config.user.groups.get(name) {
      styles.push(group.get_css(selectors));
    }
  }

  styles.join("\n\n")
}

fn get_all_css_variables_used(config: &Config, class_names: &[&ClassName]) -> IndexSet<String> {
  let mut css_variable_names: IndexSet<String> = IndexSet::new();

  for class_name in class_names {
    css_variable_names.extend(class_name.variables());
  }

  css_variable_names.extend(get_nested_css_variables(config, &css_variable_names));

  css_variable_names
}

// TODO this needs testing as bad logic could lead to an infinite loop.
fn get_nested_css_variables(
  config: &Config,
  css_variable_names: &IndexSet<String>,
) -> IndexSet<String> {
  let mut nested_css_variable_names: IndexSet<String> = IndexSet::new();

  if css_variable_names.is_empty() {
    return nested_css_variable_names;
  }

  for variable_name in css_variable_names.iter() {
    // Find the variable name in the config.
    if let Some(css_variable) = config.user.variables.get(variable_name) {
      let variables = css_variable.get_css_variables_names(&config.user);
      nested_css_variable_names.extend(variables);
    }
  }

  if !nested_css_variable_names.is_empty() && &nested_css_variable_names != css_variable_names {
    nested_css_variable_names.extend(get_nested_css_variables(config, &nested_css_variable_names));
  }

  nested_css_variable_names
}

fn create_css_output(
  config: &Config,
  initial_css: &str,
  css_variable_names: &IndexSet<String>,
  breakpoints: IndexMap<Option<String>, CssValue>,
  breakpoint_map: IndexMap<Option<String>, Vec<&ClassName>>,
) -> String {
  let (css_variable_selectors, css_variable_breakpoints, css_variable_queries) =
    create_css_variable_containers(config, css_variable_names);

  let mut styles: Vec<String> = vec![];

  if !initial_css.is_empty() {
    styles.push(initial_css.to_owned());
  }

  for (breakpoint_name, css_value) in breakpoints.iter() {
    let mut css_list: Vec<String> = vec![];
    let empty_class_name_list: Vec<&ClassName> = vec![];
    let class_name_list = breakpoint_map
      .get(breakpoint_name)
      .unwrap_or(&empty_class_name_list);
    let media_query_string = create_media_query_string(
      class_name_list,
      &config.user.media_queries,
      &css_variable_queries,
      breakpoint_name,
    );

    if !media_query_string.trim().is_empty() {
      css_list.push(media_query_string.to_owned());
    }

    match breakpoint_name {
      Some(name) => {
        if let Some(css_vars) = css_variable_breakpoints.get(name) {
          let variable_string = get_css_variable_declarations(css_vars);

          if !variable_string.trim().is_empty() {
            css_list.insert(0, variable_string);
          }
        }

        if !css_list.is_empty() {
          styles.push(get_css_from_breakpoints(
            &css_list,
            breakpoint_name,
            css_value,
          ));
        }
      }
      None => {
        let variable_string = get_css_variable_declarations(&css_variable_selectors);
        if !variable_string.trim().is_empty() {
          css_list.insert(0, variable_string);
        }

        if !css_list.is_empty() {
          styles.push(get_css_from_breakpoints(
            &css_list,
            breakpoint_name,
            css_value,
          ));
        }
      }
    }
  }

  let all_styles = styles.join("\n\n");

  if all_styles.trim().is_empty() {
    "".to_string()
  } else {
    format!("{}\n", all_styles)
  }
}

fn create_media_query_string(
  class_name_list: &[&ClassName],
  media_queries: &MediaQueries,
  css_variable_queries: &IndexMap<String, CssVariableSelectors>,
  breakpoint: &Option<String>,
) -> String {
  let mut css_without_queries: Vec<String> = vec![];
  let mut queries_map: IndexMap<String, Vec<String>> = IndexMap::new();
  let mut styles: Vec<String> = Vec::new();

  for class_name in class_name_list {
    match &class_name.media_query {
      Some(query) => match queries_map.get_mut(query) {
        Some(css_list) => {
          css_list.push(class_name.get_css());
        }
        None => {
          let css_list = vec![class_name.get_css()];
          queries_map.insert(query.to_owned(), css_list);
        }
      },
      None => css_without_queries.push(class_name.get_css()),
    }
  }

  let initial_styles = css_without_queries.join("\n\n");

  if !initial_styles.trim().is_empty() {
    styles.push(initial_styles);
  }

  for (query_name, media_query) in media_queries {
    let mut default_css_list: Vec<String> = vec![];
    let css_list = queries_map
      .get_mut(query_name)
      .unwrap_or(&mut default_css_list);

    if breakpoint.is_none() {
      if let Some(css_vars) = css_variable_queries.get(query_name) {
        let variable_string = get_css_variable_declarations(css_vars);

        if !variable_string.trim().is_empty() {
          css_list.insert(0, variable_string);
        }
      }
    }

    if css_list.is_empty() {
      continue;
    }

    let query_styles = get_css_from_media_query(css_list, media_query);

    if !query_styles.trim().is_empty() {
      styles.push(query_styles);
    }
  }

  styles.join("\n\n")
}

type CssVariableSelectors = IndexMap<String, Vec<String>>;
type CssVariablesTuple = (
  CssVariableSelectors,
  IndexMap<String, CssVariableSelectors>,
  IndexMap<String, CssVariableSelectors>,
);

fn create_css_variable_containers(
  config: &Config,
  css_variable_names: &IndexSet<String>,
) -> CssVariablesTuple {
  let mut css_variable_selectors: CssVariableSelectors = IndexMap::new();
  let mut css_variable_breakpoints: IndexMap<String, CssVariableSelectors> = IndexMap::new();
  let mut css_variable_media_queries: IndexMap<String, CssVariableSelectors> = IndexMap::new();

  for (name, populated_variable) in config.css_variables.iter() {
    if !css_variable_names.contains(name) {
      continue;
    }

    update_css_variable_container(
      name,
      &populated_variable.selectors,
      &mut css_variable_selectors,
    );

    if let Some(breakpoints) = &populated_variable.breakpoints {
      update_nested_variable_container(name, breakpoints, &mut css_variable_breakpoints);
    }

    if let Some(media_queries) = &populated_variable.media_queries {
      update_nested_variable_container(name, media_queries, &mut css_variable_media_queries);
    }
  }

  (
    css_variable_selectors,
    css_variable_breakpoints,
    css_variable_media_queries,
  )
}

fn update_nested_variable_container(
  name: &str,
  breakpoints: &IndexMap<String, IndexMap<String, CssValue>>,
  parent_container: &mut IndexMap<String, CssVariableSelectors>,
) {
  for (nested, selectors) in breakpoints.iter() {
    let mut css_variable_selectors: CssVariableSelectors = IndexMap::new();
    update_css_variable_container(name, selectors, &mut css_variable_selectors);
    parent_container.insert(nested.to_string(), css_variable_selectors);
  }
}

fn update_css_variable_container(
  name: &str,
  selectors: &IndexMap<String, CssValue>,
  css_variable_selectors: &mut IndexMap<String, Vec<String>>,
) {
  for (selector, value) in selectors.iter() {
    match css_variable_selectors.get_mut(selector) {
      Some(container) => {
        container.push(format!("{}: {};", name, value.get_string()));
      }

      None => {
        let mut container: Vec<String> = Vec::new();
        container.push(format!("{}: {};", name, value.get_string()));
        css_variable_selectors.insert(selector.to_string(), container);
      }
    }
  }
}

fn get_css_variable_declarations(css_variable_selectors: &IndexMap<String, Vec<String>>) -> String {
  let mut css_variable_declarations: Vec<String> = Vec::new();

  for (selector, css_list) in css_variable_selectors.iter() {
    css_variable_declarations.push(format!(
      "{} {{\n{}\n}}",
      selector,
      indent(&css_list.join("\n"), INDENTATION)
    ));
  }

  css_variable_declarations.join("\n\n")
}

fn get_css_from_breakpoints(
  css_list: &[String],
  named_breakpoint: &Option<String>,
  css_value: &CssValue,
) -> String {
  let inner_styles = css_list.join("\n\n");

  match named_breakpoint {
    Some(_) => {
      let min_width = css_value.get_string();

      format!(
        "@media (min-width: {}) {{\n{}\n}}",
        min_width,
        indent(&inner_styles, INDENTATION)
      )
    }
    None => inner_styles,
  }
}

fn get_css_from_media_query(css_list: &[String], media_query: &str) -> String {
  let inner_styles = css_list.join("\n\n");

  format!(
    "@media {} {{\n{}\n}}",
    media_query,
    indent(&inner_styles, INDENTATION)
  )
}

#[cfg(test)]
mod tests {
  use crate::test_utils::test_css;

  test_css!(generate_css_from_simplest_atoms: r#"
      import { c } from 'skribble-css/client';
      c.px.$px;
      c.py.$1;
      c.p('10px');"#
  );

  test_css!(media_queries: r#"
      import { c } from 'skribble-css/client';
      c.print.px.$px;"#
  );

  test_css!(media_queries_with_breakpoint: r#"
  import { c } from 'skribble-css/client';
  c.md.print.px.$px;"#
  );

  test_css!(media_queries_css_variables: r#"
  import { c } from 'skribble-css/client';
  c.print.text.$media;"# );

  test_css!(media_queries_with_breakpoint_mixed: r#"
  import { c } from 'skribble-css/client';
  c.md.print.px.$px;
  c.px.$px;
  c.print.px.$px;
  "#);
}
