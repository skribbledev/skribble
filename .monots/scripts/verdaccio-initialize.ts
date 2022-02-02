import v from 'verdaccio';
import os from 'os';
import yaml from 'js-yaml';
import fs from 'node:fs/promises';
import path from 'path';
import { DEFAULT_VERDACCIO_PORT, getBase, log } from './helpers';
import minimist from 'minimist';

const startVerdaccioServer = v.default;
const { port = DEFAULT_VERDACCIO_PORT } = minimist(process.argv.slice(2));

/**
 * Initialize a registry in a temporary folder.
 *
 * @returns
 */
async function initializeRegistry(port: number) {
  const tmpFolder = await fs.mkdtemp(path.join(os.tmpdir(), 'e2e-registry-'));
  log.info('temp registry folder %s', tmpFolder);

  const configFileSource = getBase('.monots', 'verdaccio', 'verdaccio.yaml');
  const configFileDestination = path.join(tmpFolder, 'verdaccio.yaml');
  await fs.copyFile(configFileSource, configFileDestination);

  const storagePath = path.join(path.dirname(configFileDestination), 'storage');
  await fs.mkdir(storagePath);
  log.info('verdaccioConfigFile: %s', configFileDestination);
  log.info('verdaccioStoragePath: %s', storagePath);

  const configAsObject = yaml.load(await fs.readFile(configFileDestination, 'utf8')) as object;
  const config = {
    ...configAsObject,
    storage: storagePath,
    self_path: tmpFolder,
  };

  return new Promise((resolve) => {
    log.info('starting the verdaccio server');
    startVerdaccioServer(config, 6000, storagePath, '1.0.0', 'verdaccio', (webServer: any) => {
      log.info('verdaccio port %s', port);
      webServer.listen(port, () => {
        resolve(webServer);
      });
    });
  });
}

async function run() {
  try {
    await initializeRegistry(port);
  } catch (err) {
    log.info('registry failed');
    console.error('exec failed registry', err);
  }
}

run();
