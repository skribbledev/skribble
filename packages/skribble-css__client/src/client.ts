import type { SkribbleCss, WithCustomClassName } from '@skribble-css/types';

import { overrides } from './overrides';

let shouldCache = true;

const cache = new Map<string, string | WithCustomClassName<SkribbleCss>>();

/**
 * Determine whether class names should be cached. By default caching is turned
 * on. Set to `false` to turn it off.
 *
 * This can cause a speed up since every time a class name is accessed it
 * creates a new proxy.
 *
 * I haven't tested this, but potentially for a sufficiently large code base the
 * cache could become large enough to reduce performance. A threshold would be
 * useful.
 */
export function setCaching(should: boolean) {
  shouldCache = should;
}

/**
 * All the classNames which have been defined in the codebase.
 *
 * ```ts
 * import { c } from 'skribble-css/client';
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

function initialProxy(...args: unknown[]) {
  return generateArgsList(args);
}

/**
 * Create the class name proxy.
 */
function createProxyClassNames(v?: Set<string>): WithCustomClassName<SkribbleCss> {
  // const values: Set<string> = new Set(v ? [...v] : []);

  const proxy = new Proxy(initialProxy, {
    apply: (_, __, args) => {
      const values: Set<string> = v ? v : new Set();
      const props = [...values];
      const last = props[values.size - 1];

      const id = `${props.join('.')}--${args.join('.')}`;

      if (shouldCache) {
        const cachedValue = cache.get(id);

        if (typeof cachedValue === 'string') {
          return cachedValue;
        }
      }

      let className = '';

      if (last?.startsWith('$')) {
        throw new TypeError(`'${props.join('.')}' is not a function.`);
      }

      if (args.length === 0) {
        throw new TypeError(`'${props.join('.')}' must have at least one argument.`);
      }

      if (props.length > 0) {
        className += `${props.join(':')}::`;
      }

      className += generateArgsList(args);

      if (shouldCache) {
        cache.set(id, className);
      }

      return className;
    },

    get: (_, prop) => {
      const values: Set<string> = v ? v : new Set();

      if (typeof prop !== 'string') {
        return String.prototype[prop as keyof string];
      }

      if (typeof String.prototype[prop as keyof string] === 'function') {
        return (String.prototype[prop as keyof string] as any).bind('');
      }

      const id = [...values, prop].join('.');

      if (shouldCache) {
        const cachedValue = cache.get(id);

        if (cachedValue) {
          return cachedValue;
        }
      }

      // This is a value prop which completes the chain.
      if (prop.startsWith('$')) {
        return values.size > 0 ? `${[...values].join(':')}::${prop}` : prop;
      }

      const proxy = createProxyClassNames(new Set([...values, prop]));

      if (shouldCache) {
        cache.set(id, proxy);
      }

      return proxy;
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
      if (!item) {
        continue;
      }

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
  // const shorthandTarget: Record<string, number> = {};
  const valueTarget: Record<string, number> = {};
  const argumentsTarget: Record<string, number> = {};

  for (const [index, className] of classNames.entries()) {
    // Split by the divider `::`
    let [prefix = '', value = '', ...rest] = className.split('::');

    if (rest.length > 0 || !prefix) {
      continue;
    }

    if (!value) {
      value = prefix;
      prefix = '';
    }

    if (
      // Value Target - `$px`
      value.startsWith('$') ||
      //Argument Target - `[10px]`
      isArgument(value, 1)
    ) {
      const indexToRemove = valueTarget[prefix];

      if (typeof indexToRemove === 'number') {
        removalStatus[indexToRemove] = true;
      }

      const split = prefix.split(':');
      const modifiers = split.slice(0, -2);
      const alias = prefix && split.slice(-1)[0];
      const children = alias ? overrides.get(alias) : [];

      for (const child of children) {
        const key = [...modifiers, child].join(':');
        const childIndexToRemove = valueTarget[key];

        if (typeof childIndexToRemove === 'number') {
          removalStatus[childIndexToRemove] = true;
        }
      }

      valueTarget[prefix] = index;
    }

    // Arguments Target - `[padding:10px]`
    if (isArgument(value, 2)) {
      const [key] = value.split(':');
      prefix += key;
      const indexToRemove = argumentsTarget[prefix];

      if (typeof indexToRemove === 'number') {
        removalStatus[indexToRemove] = true;
      }

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
