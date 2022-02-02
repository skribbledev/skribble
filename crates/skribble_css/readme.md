# skribble_css

> Generate css atoms from TypeScript objects.

This library answers the question? What if tailwind was integrated into TypeScript.

## TODO

- [ ] `const { c } = await import('skribble-css')` is not supported yet.
- [ ] Scoped values generate false positives for class names.

  ```tsx
  import { c, cx } from 'skribble-css';

  {
    const c = { awesome: '😢' };
    c.awesome; // This still triggers the `ClassNameCollector` struct.
  }
  const Component = () => <div className={cx(c.md.block)} />;
  ```
