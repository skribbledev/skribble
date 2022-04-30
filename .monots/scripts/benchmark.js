import fs from 'node:fs/promises';
import path from 'node:path';
import { SkribbleBridge } from 'skribble-css';

// Creating a benchmark to test which is faster napi-rs file reading or the node
// file system.

// const PATH = path.join(process.cwd(), 'package.json');
const TIMES = 100_000;
const object = { hello: 'world' };

function nonNapi() {
  JSON.stringify(object);
  // await fs.readFile(PATH);
}

const bridge = new SkribbleBridge();

function napi() {
  bridge.stringify(object);
}

function run() {
  console.time('stringify');
  for (let ii = 0; ii < TIMES; ii++) {
    nonNapi();
  }
  console.timeEnd('stringify');

  console.time('napi');
  for (let ii = 0; ii < TIMES; ii++) {
    napi();
  }
  console.timeEnd('napi');
}

run();
