import { DEFAULT_CONFIG } from './default-config.js';
import type { SkribbleConfig } from './types.js';

export interface DefineConfigProps extends Partial<SkribbleConfig> {}

export function defineConfig(props: DefineConfigProps): SkribbleConfig {
  return DEFAULT_CONFIG;
}

export { DEFAULT_CONFIG } from './default-config.js';
