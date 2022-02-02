import path from 'node:path';

/**
 * The ESM export for the `LOCAL_BINDING_FOLDER` which is during development.
 */
export const LOCAL_BINDING_FOLDER = path.dirname(path.dirname(new URL(import.meta.url).pathname));
