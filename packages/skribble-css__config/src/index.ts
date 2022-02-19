import { DEFAULT_CONFIG } from './default-config.js';
import type { SkribbleConfig } from './config-types.js';

export interface DefineConfigProps extends Partial<SkribbleConfig> {}

export function defineConfig(props: DefineConfigProps): SkribbleConfig {
  return DEFAULT_CONFIG;
}

export { DEFAULT_CONFIG } from './default-config.js';
