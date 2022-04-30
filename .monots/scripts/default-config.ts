import { defineConfig } from '@skribble-css/config';
import { getBase } from './helpers';
import fs from 'node:fs/promises';
import cp from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(cp.exec);

async function run() {
  const json = defineConfig({});
  const file = getBase('crates/skribble_css/src/config/_config_user.json');

  await fs.writeFile(file, JSON.stringify(json));
  await exec(`pnpm prettier --write ${file}`);
}

run();
