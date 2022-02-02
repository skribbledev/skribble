import delay from 'delay';
import { ChildProcess, spawn } from 'child_process';
import os from 'os';
import fs from 'node:fs/promises';
import path from 'path';
import waitOn from 'wait-on';
import { getPackages, Package } from '@manypkg/get-packages';
import getPort from 'get-port';

import { getBase, log, exec, DEFAULT_VERDACCIO_PORT } from './helpers';

const CHILD_PROCESS_PATH = getBase('.monots', 'scripts', 'verdaccio-initialize.ts');
const REGISTRY_URL = 'http://localhost:5000';

let port: number = DEFAULT_VERDACCIO_PORT;

async function initRegistry() {
  const options = { cwd: getBase(), stdio: 'inherit' } as const;
  port = await getPort({ port: DEFAULT_VERDACCIO_PORT });
  console.log({ CHILD_PROCESS_PATH });
  const childProcess = spawn(
    'node',
    [
      '--experimental-specifier-resolution',
      'node',
      '--loader',
      'ts-node/esm',
      '--port',
      `${port}`,
      CHILD_PROCESS_PATH,
    ],
    options,
  );

  return childProcess;
}

async function waitOnRegistry() {
  log.info('waiting on registry ...');
  await waitOn({ resources: [REGISTRY_URL] });
  log.info('registry detected on port 5000');
}

async function getWorkspacePackages(): Promise<Package[]> {
  const { packages } = await getPackages(getBase());
  return packages.filter(
    ({ packageJson }) => packageJson.name.match(/@?skribble/) && packageJson.private !== true,
  );
}

async function publishPackages(packages: Package[]) {
  const promises: Array<() => Promise<void>> = [];

  for (const pkg of packages) {
    log.info('publishing ... %s', pkg.dir);
    const cwdPkg = path.join(process.cwd(), pkg.dir);
    log.info('publish on cwd %s', cwdPkg);
    promises.push(async () => {
      const output = await exec(`npm publish --registry ${REGISTRY_URL}`, { cwd: cwdPkg });
      log.info('publish package stdout %s', output);
    });
  }

  await Promise.all(promises.map((p) => p()));
}

async function cleanUpTemp(origin: string, tmp: string) {
  log.info('cleaning tmp folder: %s', origin);
  await fs.rmdir(tmp, { recursive: true });
}

function createTempFolder(prefix: string) {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

let registryChildProcess: ChildProcess;

async function run() {
  const tmpFolder = await createTempFolder('skribble-verdaccio-');

  try {
    // 1. initialize the registry
    registryChildProcess = await initRegistry();
    await waitOnRegistry();

    // 2. publish packages to registry
    const packages = await getWorkspacePackages();
    publishPackages(packages);

    console.log('do something here!');
    await delay(100000);
  } catch (err) {
    cleanUpTemp('catch', tmpFolder);
    registryChildProcess.kill();
    process.exit(1);
  }

  process.on('SIGINT', () => {
    cleanUpTemp('signint', tmpFolder);
    registryChildProcess.kill();
  });

  process.exit(0);
}

run();
