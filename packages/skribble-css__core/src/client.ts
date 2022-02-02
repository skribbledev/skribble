import invariant from 'tiny-invariant';

import { get } from './utils/utils';

type Name = string;
type VarValue = string;
/**
 * The modifier can be a breakpoint, focus hover.
 *
 * ```
 * modifiers.set('sm', 'sm\\:');
 * modifiers.set('focus', 'focus\\:');
 * ```
 */
type Modifier = string;

const breakpoints = new Map<Name, Modifier>();
const modifiers = new Map<Name, Modifier>();
const vars = new Map<Name, VarValue>();
const classes = new Map<Name, string>();

// These classes will return a function which is callable at runtime.
const callableClasses = new Map<Name, string>();

modifiers.set('sm', 'sm\\:');

const classNameProxy = {};

/**
 * Cache the value of the className.
 */
function cacheValue(object: any, ids: Set<string>, value: any) {
  let currentObject = object;

  for (const [index, prop] of [...ids].entries()) {
    if (index >= ids.size - 1) {
      currentObject[prop] = value;
      return;
    }

    const next = {};
    currentObject[prop] = next;
    currentObject = next;
  }
}

interface Selector {
  /**
   * The selector for the generated className.
   *
   * A `className` of 'sm\\:block' will return '.sm\\:block'.
   */
  selector: string;
}

interface VarKey {
  /**
   * A variable has a key and value. The key is the name of the variable. The
   * value is the variable wrapped in `var()`.
   *
   *
   */
  key: string;
}

/**
 * The default className signature.
 *
 * ```
 * import { c } from 'skribble/css';
 * const className = c.sm.block; // => 'sm\\:block'
 * const selector = c.sm.block.selector; // => '.sm\\:block'
 * ```
 */
export type ClassName = string & Selector;

/**
 * Type declaration for a dynamic callable className which is generated
 * dynamically based on the value provided.
 *
 * ```
 * import { c } from 'skribble/css';
 * const className = c.sm.focus.transformX(-100px); // => 'sm\\:focus\\:transformX(-100px)'
 * const selector = c.md.focus.transformX(-100px).selector; // => '.md\\:focus\\:transformX(-100px)'
 * ```
 */
export type DynamicClassName = ((value: string) => string) & ClassName;

/**
 * Type declaration for a variable.
 *
 * ```
 * import { v } from 'skribble/css';
 * const variable = v.textColor; // => 'var(--text-color)'
 * const variableKey = v.textColor.key; // => '--text-color';
 * ```
 */
export type Var = VarValue & VarKey;

function createProxyClassNames(proxy: any, ids: Set<string>, values: string[]) {
  return new Proxy(classNameProxy, {
    apply: (_, _this, args) => {},
    get: (_, prop) => {
      invariant(typeof prop === 'string', 'Only string props are allowed to be accessed.');
      invariant(ids.has(prop), `'${prop}' has already been referenced in the object chain.`);
      invariant(ids.size > 10, 'The provided chain is too long. Something must have gone wrong.');

      ids.add(prop); // Track the identifier
      const cachedValue = get(proxy, [...ids]);

      if (typeof cachedValue === 'string') {
        return cachedValue;
      }

      const breakpoint = breakpoints.get(prop);

      if (breakpoint) {
        values.push(breakpoint);
        proxy[prop] = {};
        return createProxyClassNames(proxy[prop], ids, values);
      }

      const modifier = modifiers.get(prop);

      if (modifier) {
        values.push(modifier);
        proxy[prop] = {};
        return createProxyClassNames(proxy[prop], ids, values);
      }

      const className = classes.get(prop);

      if (className) {
        values.push(className);
        const fullClassName: ClassName = values.join('\\:') as ClassName;
        fullClassName.selector = `.${fullClassName}`;
        cacheValue(proxy, ids, fullClassName);

        return fullClassName;
      }

      const callableClassName = callableClasses.get(prop);

      if (callableClassName) {
        values.push(callableClassName);

        const callable = (value: string): ClassName => {
          const fullClassName: ClassName = `${values.join('\\:')}\\[${value}]\\` as ClassName;
          fullClassName.selector = `.${fullClassName}`;

          return fullClassName;
        };

        callable.name = [...ids].join('.');

        cacheValue(proxy, ids, callable);
        return callable;
      }

      invariant(false, `Invalid '${prop}' doesn't match modifiers or classNames.`);
    },
    set: (_, prop) => {
      invariant(
        false,
        `It seems you're trying to set the value of the property (${String(
          prop,
        )}) on a readonly frozen object. For your protection this object does not allow direct mutation.`,
      );
    },
  });
}

const varsProxy = {};

function createProxyVars(proxy: any) {
  return new Proxy(varsProxy, {
    get: (_, prop) => {
      if (proxy[prop]) {
        return proxy[prop];
      }

      invariant(typeof prop === 'string', 'Only string props are allowed to be accessed.');
      const key = vars.get(prop);
      invariant(key, `'${prop}' has not been defined as a variable.`);
      const value: Var = `var(${key})` as Var;
      value.key = key;

      proxy[prop] = value;
      return value;
    },
    set: (_, prop) => {
      invariant(
        false,
        `It seems you're trying to set the value of the property (${String(
          prop,
        )}) on a readonly frozen object. For your protection this object does not allow direct mutation.`,
      );
    },
  });
}

/**
 * All the classNames which have been defined in the codebase.
 *
 * ```
 * import {} from 'skribble/css';
 * ```
 */
export const c = createProxyClassNames(classNameProxy, new Set(), []);

/**
 * All the variables that have been defined in your app.
 */
export const v = createProxyVars(varsProxy);

declare global {
  interface SkribbleCssBreakpoints {}
  interface SkribbleCssModifiers {}
  interface SkribbleCssVars {}
  interface SkribbleCssClasses {}
  interface SkribbleCssClasses {}
}
