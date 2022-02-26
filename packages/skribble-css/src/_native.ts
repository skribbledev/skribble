import { loadBinding } from '@node-rs/helper';

import { LOCAL_BINDING_FOLDER } from './utils/local-binding-folder.js';

const binding: Binding = loadBinding(LOCAL_BINDING_FOLDER, 'skribble_css', 'skribble-css');

const sync = binding.sync;
const sleep = binding.sleep;

interface Binding {
  /**
   * Sleep synchronously for a set timeout.
   */
  sync: (ms: number) => void;

  /**
   * Sleep asynchronously for a set timeout.
   */
  sleep: (ms: number) => Promise<void>;
}

export { sleep, sync };
