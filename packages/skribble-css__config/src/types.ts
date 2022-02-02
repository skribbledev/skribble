import { type PALETTE } from './palette';
export interface SkribbleConfig {
  options: SkribbleConfigOptions;
  breakpoints: Record<string, string>;
  mediaQueries: Record<string, string>;
  parentModifiers: Record<string, string[]>;
  modifiers: SkribbleConfigModifier[];
  colors: Record<string, string | PopulatedCssVariable>;
  variables: Record<string, string | PopulatedCssVariable>;
  atoms: SkribbleConfigAtom[];
  styleRules: Record<string, Array<[key: string, value: CssValue] | string>>;
  /**
   * Shortened aliases for style rules.
   */
  shorthand: Record<string, Array<[key: string, value: CssValue]>>;

  /**
   * @default 'tailwind'
   */
  palette: SkribbleConfigPalette;
}

export type SkribbleConfigPalette = keyof typeof PALETTE | Record<string, string>;

export interface SkribbleConfigOptions {
  /**
   * Set the color format which the colors variables you provide will be
   * transformed into.
   *
   * @default 'rgb'
   */
  colorFormat: 'rgb' | 'hsl';

  /**
   * The value to prefix the css-variables with.
   *
   * @default ''
   */
  variablesPrefix: string;
}

export type SkribbleConfigAtom = SkribbleConfigAtomValues | SkribbleConfigAtomColors;

interface BaseSkribbleConfigAtom {
  styleRules: string[];
}

interface SkribbleConfigAtomValues extends BaseSkribbleConfigAtom {
  values: Record<string, string>;
  colors?: undefined;
}

interface SkribbleConfigAtomColors extends BaseSkribbleConfigAtom {
  values?: undefined;
  colors: SkribbleConfigAtomColorsOptions;
}

export interface SkribbleConfigAtomColorsOptions {
  /**
   * A number between 0 and 1, or a string representing a percentage e.g. `10%`
   */
  opacity: string | number;

  /**
   * Whether to also apply the palette color.
   */
  palette: boolean;
}

export interface SkribbleConfigVariables {
  '--container-max-width': string;
}

export type CssValue = string | number;

/**
 * A css variable that can change it's value based on selectors, media queries,
 * or breakpoints.
 */
export interface PopulatedCssVariable {
  /**
   * The following would set the variable to be `100vw` under the `:root`
   * selector and `50vw` when the parent selector is `html.dark`.
   *
   * ```json
   * {
   *   ":root": "100vw",
   *   "html.small": "50vw",
   * }
   * ```
   */
  selectors: Record<string, CssValue>;
  mediaQueries?: Record<string, Record<string, CssValue>>;

  /**
   * The following would set different root variable values under different.
   * ```json
   * {
   *   "sm": {
   *     ":root": "100vw",
   *   },
   *   "md": {
   *     ":root": "50vw",
   *   }
   * }
   */
  breakpoints?: Record<string, Record<string, CssValue>>;
}

export interface SkribbleConfigModifier {
  [key: string]: string[];
}

export interface SkribbleConfigParentModifiers {
  light: string[];
  dark: string[];
  rtl: string[];
  groupHover: string[];
  groupFocus: string[];
  groupActive: string[];
  groupVisited: string[];
}
