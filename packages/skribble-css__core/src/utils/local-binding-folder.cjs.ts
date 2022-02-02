import path from 'node:path';

/**
 * The local binding folder using `__dirname` for the commonjs module.
 */
// eslint-disable-next-line unicorn/prefer-module
export const LOCAL_BINDING_FOLDER = path.dirname(__dirname);
