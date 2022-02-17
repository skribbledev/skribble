import type { IAllContributorsPluginOptions } from '@auto-it/all-contributors';
import type { INpmConfig } from '@auto-it/npm';
import type { AutoRc } from 'auto';

const npmOptions: INpmConfig = {
  exact: true,
  canaryScope: '@auto-canary',
};

const allContributorsOptions: IAllContributorsPluginOptions = {
  types: {
    plugin: '**/plugin/**/*',
    code: ['**/src/**/*', '**/package.json', '**/tsconfig.json'],
    doc: ['**/*.md', '**/*.mdx'],
    test: ['**/*.spec.{ts,tsx}', 'crates/**/tests/*'],
  },
};

/** Auto configuration */
export default function rc(): AutoRc {
  return {
    plugins: [
      'released',
      ['npm', npmOptions],
      ['crates', {}],
      ['all-contributors', allContributorsOptions],
      'magic-zero', // https://intuit.github.io/auto/docs/generated/magic-zero
    ],
  };
}
