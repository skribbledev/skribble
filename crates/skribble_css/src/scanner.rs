pub mod class_name;
pub mod class_name_collector;
mod class_name_order;

#[cfg(test)]
mod tests {
  use crate::test_utils::{snapshot_selector, snapshot_selectors, test_no_selector};

  snapshot_selector!(generate_class_name:
    "import { c } from 'skribble-css/client';
    const d = c.md.focus.$block;");

  snapshot_selectors!(generate_custom_class:
    "import { c } from 'skribble-css/client';
    c('padding', '10px');
    c.md('padding', '6px');
    c.sm('padding', '16px');"
  );

  snapshot_selectors!(generate_class_names:
    "import { c } from 'skribble-css/client';
    const d = c.md.focus.$block;
    const e = c.sm.focus.$block;
    const f = c.lg.focus.$block;");

  snapshot_selectors!(dedupe_class_names:
    "import { c } from 'skribble-css/client';
    const a = c.md.focus.$block;
    const b = c.md.focus.$block;
    const d = c.sm.focus.$block;
    const e = c.sm.focus.$block;
    const f = c.lg.focus.$block;
    const g = c.lg.focus.$block;");

  snapshot_selector!(import_as: "\
    import { c as b } from 'skribble-css/client';
    b.sm.focus.$grid
    "
  );

  snapshot_selector!(inside_scope: "\
    import { c as b } from 'skribble-css/client';
    {
      b.lg.focus.$block;
    }"
  );

  test_no_selector!(no_shorthand_or_style_name:
    "import { c } from 'skribble-css/client';
    c.sm.focus.grid;"
  );

  snapshot_selector!(inside_function_scope:
    "import { c } from 'skribble-css/client';

    function fun () {
      c.lg.focus.$block;
    }");

  snapshot_selector!(default_parameter:
    "import { c } from 'skribble-css/client';

    function awesome(a = c.lg.focus.$block) {
     //
    }"
  );

  test_no_selector!(ignore_external_identifiers_in_callable_fns:
  "import { c } from 'skribble-css/client';
    // This is ignored.
    import { ehh } from 'ehh';

    c.md.p(ehh);"
  );

  snapshot_selector!(identifiers_can_be_evaluated:
  "import { c } from 'skribble-css/client';

    const ehh  = '10px';

    c.md.p(ehh);",
    ignore
  );

  snapshot_selectors!(generate_from_arrays:
    "import { c } from 'skribble-css/client';
    const array = [c.md.focus.$block,c.sm.focus.$block,c.lg.focus.$block];"
  );

  snapshot_selectors!(generate_from_objects: "\
    import { c } from 'skribble-css/client';
    const obj = {
      a: c.md.focus.$block,
      b: c.sm.focus.$block,
      c: c.lg.focus.$block
    };"
  );

  snapshot_selectors!(generate_from_object_keys: "\
    import { c } from 'skribble-css/client';

    const obj = {
      [c.md.focus.$block]: true,
      [c.sm.focus.$block]: true,
      [c.lg.focus.$block]: false,
    };"
  );

  snapshot_selector!(support_literals_in_expression: "
    import { c } from 'skribble-css/client';
    c['md'].p(1n);"
  );

  snapshot_selector!(jsx: "\
    import { c } from 'skribble-css/client';

    const Component = () => {
      return <div className={c.sm.m.$1} />;
    };"
  );

  snapshot_selector!(function_args: "\
    import clsx from 'clsx';
    import { c } from 'skribble-css/client';
    clsx(c.sm.m.$1)
    "
  );

  snapshot_selector!(jsx_prop_within_function: "\
    // import clsx from 'clsx';
    import { c } from 'skribble-css/client';

    const Component = () => {
      return <div className={clsx(c.sm.m.$1)} />;
    };"
  );

  snapshot_selector!(jsx_array_prop: "\
    import Other from 'library';
    import { c } from 'skribble-css/client';

    const Component = () => {
      return <Other style={[c.sm.m.$1]} />;
    };"
  );

  snapshot_selector!(jsx_array_object: "\
    import Other from 'library';
    import { c } from 'skribble-css/client';

    const Component = () => {
      return <Other style={{ a: c.sm.m.$1 }} />;
    };"
  );

  snapshot_selector!(jsx_array_object_computed: "\
    import Other from 'library';
    import { c } from 'skribble-css/client';

    const Component = () => {
      return <Other style={{ [c.sm.m.$1]: true }} />;
    };"
  );

  snapshot_selector!(supports_leading_underscore: "\
    import Other from 'library';
    import { c } from 'skribble-css/client';

    c.sm.p.$1;"
  );

  snapshot_selector!(support_colors: "\
    import { c } from 'skribble-css/client';

    c.text.$primary;"
  );

  snapshot_selector!(escape_custom_css_value: "\
    import { c } from 'skribble-css/client';

    c.focus.text('rgb(0,0,0)');"
  );

  // Scoping should mean that the variable is overwritten here.
  test_no_selector!(scope_can_override_import: "\
  import { c } from 'skribble-css/client';
  {
    const c = { md: 'md' };
    const d = c.md.c
  }", ignore, should_panic);
}
