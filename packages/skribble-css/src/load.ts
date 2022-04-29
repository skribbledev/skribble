import { loadBinding } from '@node-rs/helper';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Bindings } from './bindings.js';

const DEV_PATH = path.dirname(fileURLToPath(new URL('./', import.meta.url)));
const binding: typeof Bindings = loadBinding(DEV_PATH, 'skribble_css', 'skribble-css');
export const { SkribbleBridge, callThreadsafeFunction } = binding;
