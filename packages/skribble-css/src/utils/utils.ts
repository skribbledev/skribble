import invariant from 'tiny-invariant';

/**
 * An object with string keys and values of type `any`
 */
export interface Shape {
  [key: string]: any;
}

/**
 * Get a property from an object or array by a string path or an array path.
 *
 * @param obj - object to retrieve property from
 * @param path - path to property
 */
export function get<Return>(root: Shape, path: string | string[], defaultValue?: unknown): Return {
  try {
    if (typeof path === 'string' && path in root) {
      return (root as any)[path];
    }

    if (Array.isArray(path)) {
      path = `['${path.join("']['")}']`;
    }

    let obj = root;
    path.replace(
      /\[\s*(["'])(.*?)\1\s*]|^\s*(\w+)\s*(?=\.|\[|$)|\.\s*(\w*)\s*(?=\.|\[|$)|\[\s*(-?\d+)\s*]/g,
      (_, __, quotedProp, firstLevel, namedProp, index) => {
        obj = obj[quotedProp || firstLevel || namedProp || index];
        return '';
      },
    );

    return (obj === undefined ? defaultValue : obj) as Return;
  } catch {
    return defaultValue as Return;
  }
}

function setPropInternal<Type extends object = any>(
  path: Array<string | number>,
  obj: any,
  value: any,
  index: number,
): Type {
  if (path.length === index) {
    return value;
  }

  // Create things as we go down if they don't exist
  obj = obj || {};

  const key = path[index];

  invariant(key, 'Invalid path');
  return setClone(obj, key, setPropInternal(path, obj[key], value, ++index));
}

function setClone(obj: any, key: string | number, value: any) {
  const newObj = { ...obj };
  newObj[key] = value;
  return newObj;
}

/**
 * Set the value of a given path for the provided object. Does not mutate the
 * original object.
 */
export function set(
  path: number | string | Array<string | number>,
  obj: Shape,
  value: unknown,
): Shape {
  if (typeof path === 'number') {
    return setClone(obj, path, value);
  }

  if (typeof path === 'string') {
    path = path.split('.');
  }

  return setPropInternal(path, obj, value, 0);
}
