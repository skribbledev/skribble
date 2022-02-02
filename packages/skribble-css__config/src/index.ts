import { SkribbleConfig } from './types.js';
import { DEFAULT_CONFIG } from './default-config.js';

export interface DefineConfigProps extends Partial<SkribbleConfig> {}

export function defineConfig(props: DefineConfigProps): SkribbleConfig {
  return DEFAULT_CONFIG;
}
