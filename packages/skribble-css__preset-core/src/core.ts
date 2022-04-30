import type { ColorPalette } from '@skribble-css/types';
import { SkribbleThemeConfig } from '@skribble-css/types';

/**
 * Register a palette that can be chosen in the theme.
 *
 * ```ts
 * import {register} from '@skribble-css/preset-core';
 * declare module '@skribble-css/types' {
 *   interface ColorPaletteNames {
 *     custom: string;
 *   }
 * }
 * ```
 */
export function registerPalette(name: string, value: ColorPalette): void {}

export function createPreset(creator: any): any {}
