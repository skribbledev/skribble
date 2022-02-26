import type { Properties } from 'csstype';

import { type PALETTE } from './palette';

export interface SkribbleConfig {
  options: SkribbleConfigOptions;

  /**
   * Create the keyframes for the css.
   */
  keyframes: SkribbleConfigKeyframes;

  /**
   * CSS Variable Groups that atoms can add themselves to when activated.
   */
  groups: Record<string, Array<[key: string, value: CssValue]>>;

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

export type SkribbleConfigKeyframes = Record<string, SkribbleConfigKeyframe>;
export type SkribbleConfigKeyframe = Record<string, Properties>;

/**
 * Store the filters in a css variable and reference the filter
 *
 * ```json
 * {
 *   "filters": {
 *     "roughen": "url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><filter id="waves" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB"><feTurbulence type="turbulence" baseFrequency="0.01 0.01" numOctaves="1" seed="1" stitchTiles="noStitch" result="turbulence"/><feDisplacementMap in="SourceGraphic" in2="turbulence" scale="20" xChannelSelector="G" yChannelSelector="A"result="displacementMap"/></filter></svg>#waves')"
 *   },
 * }
 * ```
 *
 * ```css
 * :root {
 *    --filter-roughen: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><filter id="waves" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB"><feTurbulence type="turbulence" baseFrequency="0.01 0.01" numOctaves="1" seed="1" stitchTiles="noStitch" result="turbulence"/><feDisplacementMap in="SourceGraphic" in2="turbulence" scale="20" xChannelSelector="G" yChannelSelector="A"result="displacementMap"/></filter></svg>#waves');
 * }
 *
 * .filter\:\:\$roughen {
 *   filter: var(--filter-roughen);
 * }
 * ```
 */
export type SkribbleConfigFilters = Record<string, string>;

export type SkribbleConfigPalette = keyof typeof PALETTE | Record<string, string>;

export interface SkribbleConfigOptions {
  /**
   * Set the color format which the colors variables you provide will be
   * transformed into.
   *
   * @default 'rgb'
   */
  colorFormat: 'rgb' | 'hsl';
}

export type SkribbleConfigAtom = SkribbleConfigAtomValues | SkribbleConfigAtomColors;

interface BaseSkribbleConfigAtom {
  styleRules: string[];
  /**
   * Groups that should be added when any of the style rules are used here.
   */
  groups?: string[];

  /**
   * The keyframes that should be included when this atom is used.
   */
  keyframes?: string[];

  /**
   * A higher priority will cause an atom to be added later in the css
   * stylesheet and hence have priority over other atoms.
   *
   * @default 100
   */
  priority?: number;
}

interface SkribbleConfigAtomValues extends BaseSkribbleConfigAtom {
  values: Record<string, string | (Properties & Record<string, string>)>;
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
