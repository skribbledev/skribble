import { globby } from 'globby';
import assert from 'node:assert';
import fs from 'node:fs/promises';
import path from 'node:path';

import { ARTIFACTS_FOLDER, getNapiConfig, NATIVE_PACKAGES_FOLDER } from './helpers';

async function run() {
  const { platforms, binaryName } = await getNapiConfig();
  const distDirectories = platforms.map((platform) =>
    path.join(NATIVE_PACKAGES_FOLDER, 'skribble-css', 'packages', platform.platformArchABI),
  );

  const artifacts = await globby([path.join(ARTIFACTS_FOLDER, '**/*.node')], { absolute: true });
  const errors: string[] = [];
  const promises: Array<() => Promise<void>> = [];

  for (const artifact of artifacts) {
    const [resolvedBinaryName, platformArchABI] = path.basename(artifact).split('.');

    if (resolvedBinaryName !== binaryName || !platformArchABI) {
      errors.push(`Expected artifact ${artifact} to be namespaced with ${binaryName}`);
      continue;
    }

    const distDirectory = distDirectories.find((distDirectory) =>
      distDirectory.includes(platformArchABI),
    );

    if (!distDirectory) {
      errors.push(`No dist directory found for ${artifact}`);
      continue;
    }

    promises.push(async () => {
      await fs.copyFile(artifact, path.join(distDirectory, path.basename(artifact)));
    });
  }

  assert(errors.length === 0, errors.join('\n'));
  await Promise.all(promises.map((promise) => promise()));
}

run();
