import { loadBinding } from '@node-rs/helper';

import type { Bindings } from './bindings.js';
import { LOCAL_BINDING_FOLDER } from './utils/local-binding-folder.js';

const binding: typeof Bindings = loadBinding(LOCAL_BINDING_FOLDER, 'skribble_css', 'skribble-css');
export const { sum } = binding;
