import type { SkribbleCss, WithCustomClassName } from './types';

/**
 * All the classNames which have been defined in the codebase.
 *
 * ```ts
 * import { c } from 'skribble-css';
 *
 * const Component = () => {
 *   return <div className={c.text.$lg} />;
 * }
 * ```
 */
export const c = createProxyClassNames();

/**
 * A utility function for constructing className strings conditionally. It also
 * has the added benefit of solving the specificity problem for the skribble css
 * classes.
 *
 * Typically with libraries like `tailwind` and `unocss` the style that is
 * rendered depends on the setup of the css file. This means that overriding a
 * style is determined outside of the JS file.
 *
 * With Skribble, this problem is addressed by checking the classnames and
 * removing any that use the same styles.
 */
export function cx(...values: ClassValue[]): string {
  const strings: string[] = [];

  for (const value of values) {
    if (!value) {
      continue;
    }

    const extracted = getCxValue(value);
    extracted && strings.push(extracted);
  }

  return deduplicateClassNames(strings).join(' ');
}

/**
 * Use this to set the rules of specificity for your configuration file.
 */
export const specificity = new Map([
  ['p', new Set(['px', 'py', 'pt', 'pr', 'pl', 'pb'])],
  ['px', new Set(['pl', 'pr'])],
  ['py', new Set(['pt', 'pb'])],
  ['m', new Set(['mx', 'my', 'mt', 'mr', 'ml', 'mb'])],
  ['mx', new Set(['mr', 'ml'])],
  ['mb', new Set(['mt', 'mb'])],
  ['pbl', new Set(['pbls', 'pble'])],
  ['pin', new Set(['pins', 'pine'])],
]);

export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;

export interface ClassDictionary {
  [id: string]: any;
}

export interface ClassArray extends Array<ClassValue> {}

function generateArgsList(args: unknown[]) {
  return `[${args
    .filter((arg): arg is string => typeof arg === 'string')
    .map((arg) => arg.trim())
    .join(':')}]`;
}

const initialProxy = (...args: unknown[]) => generateArgsList(args);

/**
 * Create the class name proxy.
 */
function createProxyClassNames(v?: Set<string>): WithCustomClassName<SkribbleCss> {
  const proxy = new Proxy(initialProxy, {
    apply: (_, __, args) => {
      const values: Set<string> = v ? v : new Set();
      const props = [...values];
      const last = props[values.size - 1];

      if (last?.startsWith('$')) {
        throw new TypeError(`'${props.join('.')}' is not a function.`);
      }

      let className = '';

      if (args.length === 0) {
        throw new TypeError(`'${props.join('.')}' must have at least one argument.`);
      }

      if (props.length > 0) {
        className += `${props.join(':')}:-`;
      }

      return (className += generateArgsList(args));
    },

    get: (_, prop) => {
      const values: Set<string> = v ? v : new Set();

      if (typeof prop !== 'string') {
        return String.prototype[prop as keyof string];
      }

      if (typeof String.prototype[prop as keyof string] === 'function') {
        return (String.prototype[prop as keyof string] as Function).bind('');
      }

      // This is a value prop which ends the chain.
      if (prop.startsWith('$')) {
        return `${[...values].join(':')}:-${prop}`;
      }

      values.add(prop);
      return createProxyClassNames(values);
    },

    set: (object, prop) => {
      throw new TypeError(
        `Cannot assign to read only property '${String(prop)}' of object '#${object}'`,
      );
    },
  });

  return proxy as any;
}

function getCxValue(value: NonNullable<ClassValue>): string {
  const output: string[] = [];

  if (typeof value === 'string' || typeof value === 'number') {
    return `${value}`;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      if (!item) continue;

      const extracted = getCxValue(item);
      extracted && output.push(extracted);
    }

    return output.join(' ');
  }

  if (typeof value === 'object') {
    for (const [key, val] of Object.entries(value)) {
      val && output.push(key);
    }

    return output.join(' ');
  }

  return '';
}

function deduplicateClassNames(classNames: readonly string[]) {
  const newClassNames: string[] = [];
  const removalStatus = [...classNames.map(() => false)];
  const shorthandTarget: Record<string, number> = {};
  const valueTarget: Record<string, number> = {};
  const argumentsTarget: Record<string, number> = {};

  for (const [index, className] of classNames.entries()) {
    // Split by the divider `:-`
    let [prefix = '', value = '', ...rest] = className.split(':-');

    if (rest.length > 0 || !prefix) {
      continue;
    }

    if (!value) {
      value = prefix;
      prefix = '';
    }

    // Shorthand Target - `$$block`
    if (value.startsWith('$$')) {
      const indexToRemove = shorthandTarget[prefix];
      if (typeof indexToRemove === 'number') removalStatus[indexToRemove] = true;
      shorthandTarget[prefix] = index;
    }

    if (
      // Value Target - `$px`
      value.startsWith('$') ||
      //Argument Target - `[10px]`
      isArgument(value, 1)
    ) {
      const indexToRemove = valueTarget[prefix];
      if (typeof indexToRemove === 'number') removalStatus[indexToRemove] = true;
      const split = prefix.split(':');
      const modifiers = split.slice(0, -2);
      const alias = prefix && split.slice(-1)[0];
      const children = alias ? [...(specificity.get(alias) ?? [])] : [];

      for (const child of children) {
        const key = [...modifiers, child].join(':');
        const childIndexToRemove = valueTarget[key];
        if (typeof childIndexToRemove === 'number') removalStatus[childIndexToRemove] = true;
      }

      valueTarget[prefix] = index;
    }

    // Arguments Target - `[padding:10px]`
    if (isArgument(value, 2)) {
      const [key] = value.split(':');
      prefix += key;
      const indexToRemove = argumentsTarget[prefix];
      if (typeof indexToRemove === 'number') removalStatus[indexToRemove] = true;
      argumentsTarget[prefix] = index;
    }
  }

  for (const [index, className] of classNames.entries()) {
    if (removalStatus[index]) {
      continue;
    }

    newClassNames.push(className);
  }

  return newClassNames;
}

function isArgument(value: string, length: 1 | 2): boolean {
  return value.startsWith('[') && value.endsWith(']') && value.split(':').length === length;
}
