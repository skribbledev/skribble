import assert from 'node:assert';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { readPackageUp } from 'read-pkg-up';
import { promisify } from 'node:util';
import { exec as execCallback } from 'child_process';
import { Logger } from 'tslog';
export const DEFAULT_VERDACCIO_PORT = 5000;

export const exec = promisify(execCallback);

export const DIRNAME = path.dirname(new URL(import.meta.url).pathname);

export const log = new Logger({ name: 'scripts' });

/**
 * Get the base directory relative to the current file.
 */
export function getBase(...paths: string[]): string {
  return path.join(DIRNAME, '../../', ...paths);
}

/**
 * The folder containing the artifacts which are published to github
 */
export const ARTIFACTS_FOLDER = getBase('artifacts');

/**
 * Location to search for the packages where the artifacts will be added (for
 * npm publish).
 */
export const NATIVE_PACKAGES_FOLDER = getBase('packages');

// https://nodejs.org/api/process.html#process_process_arch
type NodeJSArch =
  | 'arm'
  | 'arm64'
  | 'ia32'
  | 'mips'
  | 'mipsel'
  | 'ppc'
  | 'ppc64'
  | 's390'
  | 's390x'
  | 'x32'
  | 'x64';

const CpuToNodeArch: { [index: string]: NodeJSArch } = {
  x86_64: 'x64',
  aarch64: 'arm64',
  i686: 'ia32',
  armv7: 'arm',
};

const SysToNodePlatform: { [index: string]: NodeJS.Platform } = {
  linux: 'linux',
  freebsd: 'freebsd',
  darwin: 'darwin',
  windows: 'win32',
};

export interface PlatformDetail {
  platform: NodeJS.Platform;
  platformArchABI: string;
  arch: NodeJSArch;
  raw: string;
  abi: string | null;
}

export const DefaultPlatforms: PlatformDetail[] = [
  {
    platform: 'win32',
    arch: 'x64',
    abi: 'msvc',
    platformArchABI: 'win32-x64-msvc',
    raw: 'x86_64-pc-windows-msvc',
  },
  {
    platform: 'darwin',
    arch: 'x64',
    abi: null,
    platformArchABI: 'darwin-x64',
    raw: 'x86_64-apple-darwin',
  },
  {
    platform: 'linux',
    arch: 'x64',
    abi: 'gnu',
    platformArchABI: 'linux-x64-gnu',
    raw: 'x86_64-unknown-linux-gnu',
  },
];

/**
 * A triple is a specific format for specifying a target architecture.
 * Triples may be referred to as a target triple which is the architecture for the artifact produced, and the host triple which is the architecture that the compiler is running on.
 * The general format of the triple is `<arch><sub>-<vendor>-<sys>-<abi>` where:
 *   - `arch` = The base CPU architecture, for example `x86_64`, `i686`, `arm`, `thumb`, `mips`, etc.
 *   - `sub` = The CPU sub-architecture, for example `arm` has `v7`, `v7s`, `v5te`, etc.
 *   - `vendor` = The vendor, for example `unknown`, `apple`, `pc`, `nvidia`, etc.
 *   - `sys` = The system name, for example `linux`, `windows`, `darwin`, etc. none is typically used for bare-metal without an OS.
 *   - `abi` = The ABI, for example `gnu`, `android`, `eabi`, etc.
 */
export function parseTriple(triple: string): PlatformDetail {
  const triples = triple.split('-');
  let cpu: string;
  let sys: string;
  let abi: string | null = null;

  if (triples.length === 4) {
    [cpu = '', , sys = '', abi = null] = triples;
  } else if (triples.length === 3) {
    [cpu = '', , sys = ''] = triples;
  } else {
    [cpu = '', sys = ''] = triples;
  }

  const platformName = SysToNodePlatform[sys] ?? (sys as NodeJS.Platform);
  const arch = CpuToNodeArch[cpu] ?? (cpu as NodeJSArch);
  return {
    platform: platformName,
    arch,
    abi,
    platformArchABI: abi ? `${platformName}-${arch}-${abi}` : `${platformName}-${arch}`,
    raw: triple,
  };
}

// x86_64-unknown-linux-gnu (directory override for '/home/runner/work/fast-escape/fast-escape')
// stable-x86_64-apple-darwin (default)
// nightly-2020-08-29-x86_64-apple-darwin (default)
export function getDefaultTargetTriple(rustcfg: string): PlatformDetail {
  const currentTriple = rustcfg
    .trim()
    .replace(/\(.*?\)/, '')
    .trim();
  const allTriples = execSync(`rustup target list`, {
    env: process.env,
  })
    .toString('utf8')
    .split('\n')
    .map((line) =>
      line
        .trim()
        // remove (installed) from x86_64-apple-darwin (installed)
        .replace(/\(.*?\)/, '')
        .trim(),
    )
    .filter((line) => line.length);
  const triple = allTriples.find((triple) => currentTriple.includes(triple));

  if (!triple) {
    throw new TypeError(`Can not parse target triple from ${currentTriple}`);
  }

  return parseTriple(triple);
}

export async function getNapiConfig() {
  const result = await readPackageUp({
    cwd: getBase('packages', 'skribble-css', 'package.json'),
  });

  console.log({ result });
  assert(result, 'Could not find package.json');
  const { packageJson, path } = result;
  const { version: packageVersion, napi, name } = packageJson;
  const additionPlatforms: PlatformDetail[] = (napi?.triples?.additional ?? []).map(
    (element: string) => parseTriple(element),
  );
  const defaultPlatforms = napi?.triples?.defaults === false ? [] : [...DefaultPlatforms];
  const platforms = [...defaultPlatforms, ...additionPlatforms];
  const releaseVersion = process.env.RELEASE_VERSION;
  const releaseVersionWithoutPrefix = releaseVersion?.startsWith('v')
    ? releaseVersion.slice(1)
    : releaseVersion;
  const version = releaseVersionWithoutPrefix ?? packageVersion;
  const packageName = name;
  const binaryName: string = napi?.name ?? 'index';

  return {
    platforms,
    version,
    packageName,
    binaryName,
    packageJsonPath: path,
    content: packageJson,
  };
}
