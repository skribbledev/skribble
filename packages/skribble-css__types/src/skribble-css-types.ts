/**
 * The default className signature.
 *
 * ```
 * import { c } from 'skribble-css/client';
 * const className = c.sm.block; // => 'sm:block'
 * ```
 */
export type ClassName = string;

/**
 * Type declaration for a dynamic callable className which is generated
 * dynamically based on the value provided.
 *
 * ```
 * import { c } from 'skribble-css/client';
 * const className = c.sm.focus.transformX(-100px); // => 'sm:focus:transformX(-100px)'
 * ```
 */
export type DynamicClassName = (value: string) => ClassName;

/**
 * This is used for the atom selectors which are also callable.
 */
export type WithDynamicClassName<Atom> = Atom & DynamicClassName;

/**
 * This is used for the breakpoints, media queries and modifiers to add a
 * completely custom class name.
 *
 * Currently spaces are not supported in the values.
 *
 * ```ts
 * import { c } from 'skribble-css/client';
 * const className = c.sm.focus('padding', '10px'); // => 'sm:focus-[padding:10px]'
 */
export type CustomClassName = (style: string, value: string) => ClassName;

/**
 * This is used for the breakpoints, media queries and modifiers to add a
 * completely custom class name.
 */
export type WithCustomClassName<Style> = Style & CustomClassName;

export interface SkribbleCss {
  /**
   * ```css
   * @media (min-width: 640px) {
   *   &
   * }
   * ```
   */
  sm: WithCustomClassName<SkribbleBreakpointCss>;
  /**
   * ```css
   * @media (min-width: 768px) {
   *   &
   * }
   * ```
   */
  md: WithCustomClassName<SkribbleBreakpointCss>;
  /**
   * ```css
   * @media (min-width: 1024px) {
   *   &
   * }
   * ```
   */
  lg: WithCustomClassName<SkribbleBreakpointCss>;
  /**
   * ```css
   * @media (min-width: 1280px) {
   *   &
   * }
   * ```
   */
  xl: WithCustomClassName<SkribbleBreakpointCss>;
  /**
   * ```css
   * @media (min-width: 1536px) {
   *   &
   * }
   * ```
   */
  xxl: WithCustomClassName<SkribbleBreakpointCss>;
  /**
   * ```css
   * @media print {
   *   &
   * }
   * ```
   */
  print: WithCustomClassName<SkribbleMediaQueryCss>;
  /**
   * ```css
   * @media (orientation: portrait) {
   *   &
   * }
   * ```
   */
  portrait: WithCustomClassName<SkribbleMediaQueryCss>;
  /**
   * ```css
   * @media (orientation: landscape) {
   *   &
   * }
   * ```
   */
  landscape: WithCustomClassName<SkribbleMediaQueryCss>;
  /**
   * ```css
   * @media (prefers-color-scheme: dark) {
   *   &
   * }
   * ```
   */
  darkScheme: WithCustomClassName<SkribbleMediaQueryCss>;
  /**
   * ```css
   * @media (prefers-color-scheme: light) {
   *   &
   * }
   * ```
   */
  lightScheme: WithCustomClassName<SkribbleMediaQueryCss>;
  /**
   * ```css
   * @media (prefers-reduced-motion: no-preference) {
   *   &
   * }
   * ```
   */
  motionSafe: WithCustomClassName<SkribbleMediaQueryCss>;
  /**
   * ```css
   * @media (prefers-reduced-motion: reduce) {
   *   &
   * }
   * ```
   */
  motionReduce: WithCustomClassName<SkribbleMediaQueryCss>;
  /**
   * ```css
   * .light & {}
   * ```
   */
  light: WithCustomClassName<SkribbleParentModifierCss>;
  /**
   * ```css
   * .dark & {}
   * ```
   */
  dark: WithCustomClassName<SkribbleParentModifierCss>;
  /**
   * ```css
   * [dir=rtl] & {}
   * ```
   */
  rtl: WithCustomClassName<SkribbleParentModifierCss>;
  /**
   * ```css
   * .\$group:hover &, .group:hover &, [role='group']:hover & {}
   * ```
   */
  groupHover: WithCustomClassName<SkribbleParentModifierCss>;
  /**
   * ```css
   * .\$group:focus &, .group:focus &, [role='group']:focus & {}
   * ```
   */
  groupFocus: WithCustomClassName<SkribbleParentModifierCss>;
  /**
   * ```css
   * .\$group:active &, .group:active &, [role='group']:active & {}
   * ```
   */
  groupActive: WithCustomClassName<SkribbleParentModifierCss>;
  /**
   * ```css
   * .\$group:visited &, .group:visited &, [role='group']:visited & {}
   * ```
   */
  groupVisited: WithCustomClassName<SkribbleParentModifierCss>;
  /**
   * ```css
   * &:hover {}
   * ```
   */
  hover: WithCustomClassName<SkribbleModifierCssGroup0>;
  /**
   * ```css
   * &:active {}
   * ```
   */
  active: WithCustomClassName<SkribbleModifierCssGroup1>;
  /**
   * ```css
   * &:focus {}
   * ```
   */
  focus: WithCustomClassName<SkribbleModifierCssGroup2>;
  /**
   * ```css
   * &:focus-within {}
   * ```
   */
  focusWithin: WithCustomClassName<SkribbleModifierCssGroup3>;
  /**
   * ```css
   * &:focus-visible {}
   * ```
   */
  focusVisible: WithCustomClassName<SkribbleModifierCssGroup4>;
  /**
   * ```css
   * &[disabled], &[aria-disabled=true], &:disabled {}
   * ```
   */
  disabled: WithCustomClassName<SkribbleModifierCssGroup5>;
  /**
   * ```css
   * &[aria-disabled=false], &:disabled {}
   * ```
   */
  notDisabled: WithCustomClassName<SkribbleModifierCssGroup5>;
  /**
   * ```css
   * &:enabled {}
   * ```
   */
  enabled: WithCustomClassName<SkribbleModifierCssGroup5>;
  /**
   * ```css
   * &:empty {}
   * ```
   */
  empty: WithCustomClassName<SkribbleModifierCssGroup6>;
  /**
   * ```css
   * &:read-write {}
   * ```
   */
  readWrite: WithCustomClassName<SkribbleModifierCssGroup7>;
  /**
   * ```css
   * &[aria-readonly=true], &[readonly], &:read-only {}
   * ```
   */
  readOnly: WithCustomClassName<SkribbleModifierCssGroup7>;
  /**
   * ```css
   * &[aria-readonly=false], &[readonly=false], &:not(:read-only) {}
   * ```
   */
  notReadOnly: WithCustomClassName<SkribbleModifierCssGroup7>;
  /**
   * ```css
   * &[aria-expanded=true] {}
   * ```
   */
  expanded: WithCustomClassName<SkribbleModifierCssGroup8>;
  /**
   * ```css
   * &:indeterminate, &[aria-checked=mixed] {}
   * ```
   */
  indeterminate: WithCustomClassName<SkribbleModifierCssGroup9>;
  /**
   * ```css
   * &[aria-checked=true], &:checked {}
   * ```
   */
  checked: WithCustomClassName<SkribbleModifierCssGroup9>;
  /**
   * ```css
   * &[aria-checked=false], &:not(:checked) {}
   * ```
   */
  unchecked: WithCustomClassName<SkribbleModifierCssGroup9>;
  /**
   * ```css
   * &[aria-grabbed=true] {}
   * ```
   */
  grabbed: WithCustomClassName<SkribbleModifierCssGroup10>;
  /**
   * ```css
   * &[aria-pressed=true] {}
   * ```
   */
  pressed: WithCustomClassName<SkribbleModifierCssGroup11>;
  /**
   * ```css
   * &[aria-invalid=grammar] {}
   * ```
   */
  invalidGrammar: WithCustomClassName<SkribbleModifierCssGroup12>;
  /**
   * ```css
   * &[aria-invalid=spelling] {}
   * ```
   */
  invalidSpelling: WithCustomClassName<SkribbleModifierCssGroup13>;
  /**
   * ```css
   * &[aria-invalid=false], &:valid {}
   * ```
   */
  valid: WithCustomClassName<SkribbleModifierCssGroup14>;
  /**
   * ```css
   * &[aria-invalid=true], &:invalid {}
   * ```
   */
  invalid: WithCustomClassName<SkribbleModifierCssGroup14>;
  /**
   * ```css
   * &[aria-busy=true] {}
   * ```
   */
  loading: WithCustomClassName<SkribbleModifierCssGroup15>;
  /**
   * ```css
   * &[aria-selected=true] {}
   * ```
   */
  selected: WithCustomClassName<SkribbleModifierCssGroup16>;
  /**
   * ```css
   * &[hidden] {}
   * ```
   */
  hidden: WithCustomClassName<SkribbleModifierCssGroup17>;
  /**
   * ```css
   * &:-webkit-autofill {}
   * ```
   */
  autofill: WithCustomClassName<SkribbleModifierCssGroup18>;
  /**
   * ```css
   * &:even {}
   * ```
   */
  even: WithCustomClassName<SkribbleModifierCssGroup19>;
  /**
   * ```css
   * &:odd {}
   * ```
   */
  odd: WithCustomClassName<SkribbleModifierCssGroup19>;
  /**
   * ```css
   * &:nth-of-type(even) {}
   * ```
   */
  evenOfType: WithCustomClassName<SkribbleModifierCssGroup20>;
  /**
   * ```css
   * &:nth-of-type(odd) {}
   * ```
   */
  oddOfType: WithCustomClassName<SkribbleModifierCssGroup20>;
  /**
   * ```css
   * &:first {}
   * ```
   */
  first: WithCustomClassName<SkribbleModifierCssGroup21>;
  /**
   * ```css
   * &:not(:first-child) {}
   * ```
   */
  notFirst: WithCustomClassName<SkribbleModifierCssGroup21>;
  /**
   * ```css
   * &:last {}
   * ```
   */
  last: WithCustomClassName<SkribbleModifierCssGroup21>;
  /**
   * ```css
   * &:not(:last-child) {}
   * ```
   */
  notLast: WithCustomClassName<SkribbleModifierCssGroup21>;
  /**
   * ```css
   * &:first-of-type {}
   * ```
   */
  firstOfType: WithCustomClassName<SkribbleModifierCssGroup22>;
  /**
   * ```css
   * &:not(:first-of-type) {}
   * ```
   */
  notFirstOfType: WithCustomClassName<SkribbleModifierCssGroup22>;
  /**
   * ```css
   * &:last-of-type {}
   * ```
   */
  lastOfType: WithCustomClassName<SkribbleModifierCssGroup22>;
  /**
   * ```css
   * &:not(:last-of-type) {}
   * ```
   */
  notLastOfType: WithCustomClassName<SkribbleModifierCssGroup22>;
  /**
   * ```css
   * &:visited {}
   * ```
   */
  visited: WithCustomClassName<SkribbleModifierCssGroup23>;
  /**
   * ```css
   * &:optional {}
   * ```
   */
  optional: WithCustomClassName<SkribbleModifierCssGroup24>;
  /**
   * ```css
   * &[aria-current=page] {}
   * ```
   */
  activeLink: WithCustomClassName<SkribbleModifierCssGroup25>;
  /**
   * ```css
   * &[aria-current=location] {}
   * ```
   */
  activeLocation: WithCustomClassName<SkribbleModifierCssGroup25>;
  /**
   * ```css
   * &[aria-current=date] {}
   * ```
   */
  activeDate: WithCustomClassName<SkribbleModifierCssGroup25>;
  /**
   * ```css
   * &[aria-current=time] {}
   * ```
   */
  activeTime: WithCustomClassName<SkribbleModifierCssGroup25>;
  /**
   * ```css
   * &[aria-current=step] {}
   * ```
   */
  activeStep: WithCustomClassName<SkribbleModifierCssGroup25>;
  /**
   * ```css
   * &:fullscreen {}
   * ```
   */
  fullScreen: WithCustomClassName<SkribbleModifierCssGroup26>;
  /**
   * ```css
   * &:target {}
   * ```
   */
  target: WithCustomClassName<SkribbleModifierCssGroup27>;
  /**
   * ```css
   * &:placeholder-shown {}
   * ```
   */
  placeholderShown: WithCustomClassName<SkribbleModifierCssGroup28>;
  /**
   * ```css
   * [aria-required=true], &:required {}
   * ```
   */
  required: WithCustomClassName<SkribbleModifierCssGroup29>;
  /**
   * ```css
   * [arira-required=false], &:not(:required) {}
   * ```
   */
  notRequired: WithCustomClassName<SkribbleModifierCssGroup29>;
  /**
   * ```css
   * &:default {}
   * ```
   */
  default: WithCustomClassName<SkribbleModifierCssGroup30>;
  /**
   * ```css
   * &:only-child {}
   * ```
   */
  onlyChild: WithCustomClassName<SkribbleModifierCssGroup31>;
  /**
   * ```css
   * &:not(:only-child) {}
   * ```
   */
  notOnlyChild: WithCustomClassName<SkribbleModifierCssGroup31>;
  /**
   * ```css
   * &:only-of-type {}
   * ```
   */
  onlyOfType: WithCustomClassName<SkribbleModifierCssGroup32>;
  /**
   * ```css
   * &:not(:only-of-type) {}
   * ```
   */
  notOnlyOfType: WithCustomClassName<SkribbleModifierCssGroup32>;
  /**
   * ```css
   * &:root {}
   * ```
   */
  root: WithCustomClassName<SkribbleModifierCssGroup33>;
  /**
   * ```css
   * &:link {}
   * ```
   */
  link: WithCustomClassName<SkribbleModifierCssGroup34>;
  /**
   * ```css
   * &::placeholder {}
   * ```
   */
  placeholder: WithCustomClassName<SkribbleModifierCssGroup35>;
  /**
   * ```css
   * &::selection {}
   * ```
   */
  selection: WithCustomClassName<SkribbleModifierCssGroup35>;
  /**
   * ```css
   * &::first-letter {}
   * ```
   */
  firstLetter: WithCustomClassName<SkribbleModifierCssGroup35>;
  /**
   * ```css
   * &::first-line {}
   * ```
   */
  firstLine: WithCustomClassName<SkribbleModifierCssGroup35>;
  /**
   * ```css
   * &::before {}
   * ```
   */
  before: WithCustomClassName<SkribbleModifierCssGroup35>;
  /**
   * ```css
   * &::after {}
   * ```
   */
  after: WithCustomClassName<SkribbleModifierCssGroup35>;
  /**
   * ```css
   * .\$group {}
   * ```
   */
  $group: ClassName;
  /**
   * ```css
   * .\$container {
   *   width: 100%;
   *   max-width: var(--container-max-width);
   * }
   * ```
   */
  $container: ClassName;
  /**
   * ```css
   * .\$italic {
   *   font-style: italic;
   * }
   * ```
   */
  $italic: ClassName;
  /**
   * ```css
   * .\$nonItalic {
   *   font-style: normal;
   * }
   * ```
   */
  $nonItalic: ClassName;
  /**
   * ```css
   * .\$oblique {
   *   font-style: oblique -10deg;
   * }
   * ```
   */
  $oblique: ClassName;
  /**
   * ```css
   * .\$antialiased {
   *   -webkit-font-smoothing: antialiased;
   *   -moz-osx-font-smoothing: grayscale;
   * }
   * ```
   */
  $antialiased: ClassName;
  /**
   * ```css
   * .\$subpixelAntialiased {
   *   -webkit-font-smoothing: auto;
   *   -moz-osx-font-smoothing: auto;
   * }
   * ```
   */
  $subpixelAntialiased: ClassName;
  /**
   * ```css
   * .\$block {
   *   display: block;
   * }
   * ```
   */
  $block: ClassName;
  /**
   * ```css
   * .\$inlineBlock {
   *   display: inline-block;
   * }
   * ```
   */
  $inlineBlock: ClassName;
  /**
   * ```css
   * .\$inline {
   *   display: inline;
   * }
   * ```
   */
  $inline: ClassName;
  /**
   * ```css
   * .\$flowRoot {
   *   display: flow-root;
   * }
   * ```
   */
  $flowRoot: ClassName;
  /**
   * ```css
   * .\$content {
   *   display: content;
   * }
   * ```
   */
  $content: ClassName;
  /**
   * ```css
   * .\$hidden {
   *   display: hidden;
   * }
   * ```
   */
  $hidden: ClassName;
  /**
   * ```css
   * .\$invisible {
   *   visibility: hidden;
   * }
   * ```
   */
  $invisible: ClassName;
  /**
   * ```css
   * .\$visible {
   *   visibility: visible;
   * }
   * ```
   */
  $visible: ClassName;
  /**
   * ```css
   * .\$removeFilter {
   *   --group-nested-filter: none;
   * }
   * ```
   */
  $removeFilter: ClassName;
  /**
   * ```css
   * .\$removeBackdrop {
   *   --group-nested-backdrop: none;
   * }
   * ```
   */
  $removeBackdrop: ClassName;
  /**
   * ```css
   * .\$transformGpu {
   *   --group-nested-transform: var(--group-nested-transform-gpu);
   * }
   * ```
   */
  $transformGpu: ClassName;
  /**
   * ```css
   * .\$transformCpu {
   *   --group-nested-transform: var(--group-nested-transform-cpu);
   * }
   * ```
   */
  $transformCpu: ClassName;
  /**
   * ```css
   * .text\:\:\[<value>\] {
   *   --text-opacity: 1;
   *   color: <value>;
   * }
   * ```
   */
  text: WithDynamicClassName<TextAtomStyle>;
  /**
   * ```css
   * .bg\:\:\[<value>\] {
   *   --bg-opacity: 1;
   *   color: <value>;
   * }
   * ```
   */
  bg: WithDynamicClassName<BgAtomStyle>;
  /**
   * ```css
   * .border\:\:\[<value>\] {}
   * ```
   */
  border: WithDynamicClassName<BorderAtomStyle>;
  /**
   * ```css
   * .font\:\:\[<value>\] {
   *   font-family: <value>;
   * }
   * ```
   */
  font: WithDynamicClassName<FontAtomStyle>;
  /**
   * ```css
   * .blur\:\:\[<value>\] {
   *   --filter-blur: <value>;
   * }
   * ```
   */
  blur: WithDynamicClassName<BlurAtomStyle>;
  /**
   * ```css
   * .backdropBlur\:\:\[<value>\] {
   *   --backdrop-blur: <value>;
   * }
   * ```
   */
  backdropBlur: WithDynamicClassName<BackdropBlurAtomStyle>;
  /**
   * ```css
   * .brightness\:\:\[<value>\] {
   *   --filter-brightness: <value>;
   * }
   * ```
   */
  brightness: WithDynamicClassName<BrightnessAtomStyle>;
  /**
   * ```css
   * .backdropBrightness\:\:\[<value>\] {
   *   --backdrop-brightness: <value>;
   * }
   * ```
   */
  backdropBrightness: WithDynamicClassName<BackdropBrightnessAtomStyle>;
  /**
   * ```css
   * .contrast\:\:\[<value>\] {
   *   --filter-contrast: <value>;
   * }
   * ```
   */
  contrast: WithDynamicClassName<ContrastAtomStyle>;
  /**
   * ```css
   * .backdropContrast\:\:\[<value>\] {
   *   --backdrop-contrast: <value>;
   * }
   * ```
   */
  backdropContrast: WithDynamicClassName<BackdropContrastAtomStyle>;
  /**
   * ```css
   * .dropShadow\:\:\[<value>\] {
   *   --filter-drop-shadow: <value>;
   * }
   * ```
   */
  dropShadow: WithDynamicClassName<DropShadowAtomStyle>;
  /**
   * ```css
   * .backdropDropShadow\:\:\[<value>\] {
   *   --backdrop-drop-shadow: <value>;
   * }
   * ```
   */
  backdropDropShadow: WithDynamicClassName<BackdropDropShadowAtomStyle>;
  /**
   * ```css
   * .grayScale\:\:\[<value>\] {}
   * ```
   */
  grayScale: WithDynamicClassName<GrayScaleAtomStyle>;
  /**
   * ```css
   * .backdropGrayScale\:\:\[<value>\] {}
   * ```
   */
  backdropGrayScale: WithDynamicClassName<BackdropGrayScaleAtomStyle>;
  /**
   * ```css
   * .hueRotate\:\:\[<value>\] {
   *   --filter-hue-rotate: <value>;
   * }
   * ```
   */
  hueRotate: WithDynamicClassName<HueRotateAtomStyle>;
  /**
   * ```css
   * .backdropHueRotate\:\:\[<value>\] {
   *   --backdrop-hue-rotate: <value>;
   * }
   * ```
   */
  backdropHueRotate: WithDynamicClassName<BackdropHueRotateAtomStyle>;
  /**
   * ```css
   * .invert\:\:\[<value>\] {
   *   --filter-invert: <value>;
   * }
   * ```
   */
  invert: WithDynamicClassName<InvertAtomStyle>;
  /**
   * ```css
   * .backdropInvert\:\:\[<value>\] {
   *   --backdrop-invert: <value>;
   * }
   * ```
   */
  backdropInvert: WithDynamicClassName<BackdropInvertAtomStyle>;
  /**
   * ```css
   * .saturate\:\:\[<value>\] {
   *   --filter-saturate: <value>;
   * }
   * ```
   */
  saturate: WithDynamicClassName<SaturateAtomStyle>;
  /**
   * ```css
   * .backdropSaturate\:\:\[<value>\] {
   *   --backdrop-saturate: <value>;
   * }
   * ```
   */
  backdropSaturate: WithDynamicClassName<BackdropSaturateAtomStyle>;
  /**
   * ```css
   * .sepia\:\:\[<value>\] {
   *   --filter-sepia: <value>;
   * }
   * ```
   */
  sepia: WithDynamicClassName<SepiaAtomStyle>;
  /**
   * ```css
   * .backdropSepia\:\:\[<value>\] {
   *   --backdrop-sepia: <value>;
   * }
   * ```
   */
  backdropSepia: WithDynamicClassName<BackdropSepiaAtomStyle>;
  /**
   * ```css
   * .filter\:\:\[<value>\] {
   *   --filter-custom: <value>;
   * }
   * ```
   */
  filter: WithDynamicClassName<FilterAtomStyle>;
  /**
   * ```css
   * .backdrop\:\:\[<value>\] {
   *   --backdrop-custom: <value>;
   * }
   * ```
   */
  backdrop: WithDynamicClassName<BackdropAtomStyle>;
  /**
   * ```css
   * .p\:\:\[<value>\] {
   *   padding: <value>;
   * }
   * ```
   */
  p: WithDynamicClassName<PAtomStyle>;
  /**
   * ```css
   * .py\:\:\[<value>\] {
   *   padding-top: <value>;
   *   padding-bottom: <value>;
   * }
   * ```
   */
  py: WithDynamicClassName<PyAtomStyle>;
  /**
   * ```css
   * .px\:\:\[<value>\] {
   *   padding-right: <value>;
   *   padding-left: <value>;
   * }
   * ```
   */
  px: WithDynamicClassName<PxAtomStyle>;
  /**
   * ```css
   * .pt\:\:\[<value>\] {
   *   padding-top: <value>;
   * }
   * ```
   */
  pt: WithDynamicClassName<PtAtomStyle>;
  /**
   * ```css
   * .pr\:\:\[<value>\] {
   *   padding-right: <value>;
   * }
   * ```
   */
  pr: WithDynamicClassName<PrAtomStyle>;
  /**
   * ```css
   * .pb\:\:\[<value>\] {
   *   padding-bottom: <value>;
   * }
   * ```
   */
  pb: WithDynamicClassName<PbAtomStyle>;
  /**
   * ```css
   * .pl\:\:\[<value>\] {
   *   padding-left: <value>;
   * }
   * ```
   */
  pl: WithDynamicClassName<PlAtomStyle>;
  /**
   * ```css
   * .pbl\:\:\[<value>\] {
   *   padding-block: <value>;
   * }
   * ```
   */
  pbl: WithDynamicClassName<PblAtomStyle>;
  /**
   * ```css
   * .pin\:\:\[<value>\] {
   *   padding-inline: <value>;
   * }
   * ```
   */
  pin: WithDynamicClassName<PinAtomStyle>;
  /**
   * ```css
   * .pins\:\:\[<value>\] {
   *   padding-inline-start: <value>;
   * }
   * ```
   */
  pins: WithDynamicClassName<PinsAtomStyle>;
  /**
   * ```css
   * .pine\:\:\[<value>\] {
   *   padding-inline-end: <value>;
   * }
   * ```
   */
  pine: WithDynamicClassName<PineAtomStyle>;
  /**
   * ```css
   * .pbls\:\:\[<value>\] {
   *   padding-block-start: <value>;
   * }
   * ```
   */
  pbls: WithDynamicClassName<PblsAtomStyle>;
  /**
   * ```css
   * .pble\:\:\[<value>\] {
   *   padding-block-end: <value>;
   * }
   * ```
   */
  pble: WithDynamicClassName<PbleAtomStyle>;
  /**
   * ```css
   * .m\:\:\[<value>\] {
   *   margin: <value>;
   * }
   * ```
   */
  m: WithDynamicClassName<MAtomStyle>;
  /**
   * ```css
   * .my\:\:\[<value>\] {
   *   margin-top: <value>;
   *   margin-bottom: <value>;
   * }
   * ```
   */
  my: WithDynamicClassName<MyAtomStyle>;
  /**
   * ```css
   * .mx\:\:\[<value>\] {
   *   margin-right: <value>;
   *   margin-left: <value>;
   * }
   * ```
   */
  mx: WithDynamicClassName<MxAtomStyle>;
  /**
   * ```css
   * .mt\:\:\[<value>\] {
   *   margin-top: <value>;
   * }
   * ```
   */
  mt: WithDynamicClassName<MtAtomStyle>;
  /**
   * ```css
   * .mr\:\:\[<value>\] {
   *   margin-right: <value>;
   * }
   * ```
   */
  mr: WithDynamicClassName<MrAtomStyle>;
  /**
   * ```css
   * .mb\:\:\[<value>\] {
   *   margin-bottom: <value>;
   * }
   * ```
   */
  mb: WithDynamicClassName<MbAtomStyle>;
  /**
   * ```css
   * .ml\:\:\[<value>\] {
   *   margin-left: <value>;
   * }
   * ```
   */
  ml: WithDynamicClassName<MlAtomStyle>;
  /**
   * ```css
   * .fontSize\:\:\[<value>\] {
   *   font-size: <value>;
   * }
   * ```
   */
  fontSize: WithDynamicClassName<FontSizeAtomStyle>;
  /**
   * ```css
   * .lineHeight\:\:\[<value>\] {
   *   line-height: <value>;
   * }
   * ```
   */
  lineHeight: WithDynamicClassName<LineHeightAtomStyle>;
  /**
   * ```css
   * .dir\:\:\[<value>\] {
   *   direction: <value>;
   * }
   * ```
   */
  dir: WithDynamicClassName<DirAtomStyle>;
  /**
   * ```css
   * .display\:\:\[<value>\] {}
   * ```
   */
  display: WithDynamicClassName<DisplayAtomStyle>;
  /**
   * ```css
   * .visibility\:\:\[<value>\] {}
   * ```
   */
  visibility: WithDynamicClassName<VisibilityAtomStyle>;
  /**
   * ```css
   * .opacity\:\:\[<value>\] {
   *   opacity: <value>;
   * }
   * ```
   */
  opacity: WithDynamicClassName<OpacityAtomStyle>;
  /**
   * ```css
   * .z\:\:\[<value>\] {
   *   z-index: <value>;
   * }
   * ```
   */
  z: WithDynamicClassName<ZAtomStyle>;
  /**
   * ```css
   * .textOrientation\:\:\[<value>\] {
   *   text-orientation: <value>;
   * }
   * ```
   */
  textOrientation: WithDynamicClassName<TextOrientationAtomStyle>;
  /**
   * ```css
   * .writingMode\:\:\[<value>\] {
   *   writing-mode: <value>;
   * }
   * ```
   */
  writingMode: WithDynamicClassName<WritingModeAtomStyle>;
  /**
   * ```css
   * .scale\:\:\[<value>\] {
   *   --transform-scale-x: <value>;
   *   --transform-scale-y: <value>;
   * }
   * ```
   */
  scale: WithDynamicClassName<ScaleAtomStyle>;
  /**
   * ```css
   * .scaleX\:\:\[<value>\] {
   *   --transform-scale-x: <value>;
   * }
   * ```
   */
  scaleX: WithDynamicClassName<ScaleXAtomStyle>;
  /**
   * ```css
   * .scaleY\:\:\[<value>\] {
   *   --transform-scale-y: <value>;
   * }
   * ```
   */
  scaleY: WithDynamicClassName<ScaleYAtomStyle>;
  /**
   * ```css
   * .rotate\:\:\[<value>\] {
   *   --transform-rotate: <value>;
   * }
   * ```
   */
  rotate: WithDynamicClassName<RotateAtomStyle>;
  /**
   * ```css
   * .skewX\:\:\[<value>\] {
   *   --transform-skew-x: <value>;
   * }
   * ```
   */
  skewX: WithDynamicClassName<SkewXAtomStyle>;
  /**
   * ```css
   * .skewY\:\:\[<value>\] {
   *   --transform-skew-y: <value>;
   * }
   * ```
   */
  skewY: WithDynamicClassName<SkewYAtomStyle>;
  /**
   * ```css
   * .origin\:\:\[<value>\] {
   *   transform-origin: <value>;
   * }
   * ```
   */
  origin: WithDynamicClassName<OriginAtomStyle>;
  /**
   * ```css
   * .translateX\:\:\[<value>\] {
   *   --transform-translate-x: <value>;
   * }
   * ```
   */
  translateX: WithDynamicClassName<TranslateXAtomStyle>;
  /**
   * ```css
   * .translateY\:\:\[<value>\] {
   *   --transform-translate-y: <value>;
   * }
   * ```
   */
  translateY: WithDynamicClassName<TranslateYAtomStyle>;
  /**
   * ```css
   * .animation\:\:\[<value>\] {
   *   animation: <value>;
   * }
   * ```
   */
  animation: WithDynamicClassName<AnimationAtomStyle>;
}

type BreakpointKeys = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type SkribbleBreakpointCss = Omit<SkribbleCss, BreakpointKeys>;
type MediaQueryKeys =
  | 'print'
  | 'portrait'
  | 'landscape'
  | 'darkScheme'
  | 'lightScheme'
  | 'motionSafe'
  | 'motionReduce';
type SkribbleMediaQueryCss = Omit<SkribbleCss, BreakpointKeys | MediaQueryKeys>;
type ParentModifierKeys =
  | 'light'
  | 'dark'
  | 'rtl'
  | 'groupHover'
  | 'groupFocus'
  | 'groupActive'
  | 'groupVisited';
type SkribbleParentModifierCss = Omit<
  SkribbleCss,
  BreakpointKeys | MediaQueryKeys | ParentModifierKeys
>;
type ModifierKeys0 = 'hover';
type SkribbleModifierCssGroup0 = Omit<
  SkribbleCss,
  BreakpointKeys | MediaQueryKeys | ParentModifierKeys | ModifierKeys0
>;
type ModifierKeys1 = 'active';
type SkribbleModifierCssGroup1 = Omit<
  SkribbleCss,
  BreakpointKeys | MediaQueryKeys | ParentModifierKeys | ModifierKeys0 | ModifierKeys1
>;
type ModifierKeys2 = 'focus';
type SkribbleModifierCssGroup2 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
>;
type ModifierKeys3 = 'focusWithin';
type SkribbleModifierCssGroup3 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
>;
type ModifierKeys4 = 'focusVisible';
type SkribbleModifierCssGroup4 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
>;
type ModifierKeys5 = 'disabled' | 'notDisabled' | 'enabled';
type SkribbleModifierCssGroup5 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
>;
type ModifierKeys6 = 'empty';
type SkribbleModifierCssGroup6 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
>;
type ModifierKeys7 = 'readWrite' | 'readOnly' | 'notReadOnly';
type SkribbleModifierCssGroup7 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
>;
type ModifierKeys8 = 'expanded';
type SkribbleModifierCssGroup8 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
>;
type ModifierKeys9 = 'indeterminate' | 'checked' | 'unchecked';
type SkribbleModifierCssGroup9 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
>;
type ModifierKeys10 = 'grabbed';
type SkribbleModifierCssGroup10 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
>;
type ModifierKeys11 = 'pressed';
type SkribbleModifierCssGroup11 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
>;
type ModifierKeys12 = 'invalidGrammar';
type SkribbleModifierCssGroup12 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
>;
type ModifierKeys13 = 'invalidSpelling';
type SkribbleModifierCssGroup13 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
>;
type ModifierKeys14 = 'valid' | 'invalid';
type SkribbleModifierCssGroup14 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
>;
type ModifierKeys15 = 'loading';
type SkribbleModifierCssGroup15 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
>;
type ModifierKeys16 = 'selected';
type SkribbleModifierCssGroup16 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
>;
type ModifierKeys17 = 'hidden';
type SkribbleModifierCssGroup17 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
>;
type ModifierKeys18 = 'autofill';
type SkribbleModifierCssGroup18 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
>;
type ModifierKeys19 = 'even' | 'odd';
type SkribbleModifierCssGroup19 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
>;
type ModifierKeys20 = 'evenOfType' | 'oddOfType';
type SkribbleModifierCssGroup20 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
>;
type ModifierKeys21 = 'first' | 'notFirst' | 'last' | 'notLast';
type SkribbleModifierCssGroup21 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
>;
type ModifierKeys22 = 'firstOfType' | 'notFirstOfType' | 'lastOfType' | 'notLastOfType';
type SkribbleModifierCssGroup22 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
  | ModifierKeys22
>;
type ModifierKeys23 = 'visited';
type SkribbleModifierCssGroup23 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
  | ModifierKeys22
  | ModifierKeys23
>;
type ModifierKeys24 = 'optional';
type SkribbleModifierCssGroup24 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
  | ModifierKeys22
  | ModifierKeys23
  | ModifierKeys24
>;
type ModifierKeys25 = 'activeLink' | 'activeLocation' | 'activeDate' | 'activeTime' | 'activeStep';
type SkribbleModifierCssGroup25 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
  | ModifierKeys22
  | ModifierKeys23
  | ModifierKeys24
  | ModifierKeys25
>;
type ModifierKeys26 = 'fullScreen';
type SkribbleModifierCssGroup26 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
  | ModifierKeys22
  | ModifierKeys23
  | ModifierKeys24
  | ModifierKeys25
  | ModifierKeys26
>;
type ModifierKeys27 = 'target';
type SkribbleModifierCssGroup27 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
  | ModifierKeys22
  | ModifierKeys23
  | ModifierKeys24
  | ModifierKeys25
  | ModifierKeys26
  | ModifierKeys27
>;
type ModifierKeys28 = 'placeholderShown';
type SkribbleModifierCssGroup28 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
  | ModifierKeys22
  | ModifierKeys23
  | ModifierKeys24
  | ModifierKeys25
  | ModifierKeys26
  | ModifierKeys27
  | ModifierKeys28
>;
type ModifierKeys29 = 'required' | 'notRequired';
type SkribbleModifierCssGroup29 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
  | ModifierKeys22
  | ModifierKeys23
  | ModifierKeys24
  | ModifierKeys25
  | ModifierKeys26
  | ModifierKeys27
  | ModifierKeys28
  | ModifierKeys29
>;
type ModifierKeys30 = 'default';
type SkribbleModifierCssGroup30 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
  | ModifierKeys22
  | ModifierKeys23
  | ModifierKeys24
  | ModifierKeys25
  | ModifierKeys26
  | ModifierKeys27
  | ModifierKeys28
  | ModifierKeys29
  | ModifierKeys30
>;
type ModifierKeys31 = 'onlyChild' | 'notOnlyChild';
type SkribbleModifierCssGroup31 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
  | ModifierKeys22
  | ModifierKeys23
  | ModifierKeys24
  | ModifierKeys25
  | ModifierKeys26
  | ModifierKeys27
  | ModifierKeys28
  | ModifierKeys29
  | ModifierKeys30
  | ModifierKeys31
>;
type ModifierKeys32 = 'onlyOfType' | 'notOnlyOfType';
type SkribbleModifierCssGroup32 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
  | ModifierKeys22
  | ModifierKeys23
  | ModifierKeys24
  | ModifierKeys25
  | ModifierKeys26
  | ModifierKeys27
  | ModifierKeys28
  | ModifierKeys29
  | ModifierKeys30
  | ModifierKeys31
  | ModifierKeys32
>;
type ModifierKeys33 = 'root';
type SkribbleModifierCssGroup33 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
  | ModifierKeys22
  | ModifierKeys23
  | ModifierKeys24
  | ModifierKeys25
  | ModifierKeys26
  | ModifierKeys27
  | ModifierKeys28
  | ModifierKeys29
  | ModifierKeys30
  | ModifierKeys31
  | ModifierKeys32
  | ModifierKeys33
>;
type ModifierKeys34 = 'link';
type SkribbleModifierCssGroup34 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
  | ModifierKeys22
  | ModifierKeys23
  | ModifierKeys24
  | ModifierKeys25
  | ModifierKeys26
  | ModifierKeys27
  | ModifierKeys28
  | ModifierKeys29
  | ModifierKeys30
  | ModifierKeys31
  | ModifierKeys32
  | ModifierKeys33
  | ModifierKeys34
>;
type ModifierKeys35 =
  | 'placeholder'
  | 'selection'
  | 'firstLetter'
  | 'firstLine'
  | 'before'
  | 'after';
type SkribbleModifierCssGroup35 = Omit<
  SkribbleCss,
  | BreakpointKeys
  | MediaQueryKeys
  | ParentModifierKeys
  | ModifierKeys0
  | ModifierKeys1
  | ModifierKeys2
  | ModifierKeys3
  | ModifierKeys4
  | ModifierKeys5
  | ModifierKeys6
  | ModifierKeys7
  | ModifierKeys8
  | ModifierKeys9
  | ModifierKeys10
  | ModifierKeys11
  | ModifierKeys12
  | ModifierKeys13
  | ModifierKeys14
  | ModifierKeys15
  | ModifierKeys16
  | ModifierKeys17
  | ModifierKeys18
  | ModifierKeys19
  | ModifierKeys20
  | ModifierKeys21
  | ModifierKeys22
  | ModifierKeys23
  | ModifierKeys24
  | ModifierKeys25
  | ModifierKeys26
  | ModifierKeys27
  | ModifierKeys28
  | ModifierKeys29
  | ModifierKeys30
  | ModifierKeys31
  | ModifierKeys32
  | ModifierKeys33
  | ModifierKeys34
  | ModifierKeys35
>;

interface TextAtomStyle {
  /**
   * ```css
   * .text\:\:\$inherit {
   *   --text-opacity: 1;
   *   color: inherit;
   * }
   * ```
   */
  $inherit: ClassName;
  /**
   * ```css
   * .text\:\:\$current {
   *   --text-opacity: 1;
   *   color: currentColor;
   * }
   * ```
   */
  $current: ClassName;
  /**
   * ```css
   * .text\:\:\$transparent {
   *   --text-opacity: 1;
   *   color: transparent;
   * }
   * ```
   */
  $transparent: ClassName;
  /**
   * ```css
   * .text\:\:\$black {
   *   --text-opacity: 1;
   *   color: rgba(0, 0, 0, var(--text-opacity));
   * }
   * ```
   */
  $black: ClassName;
  /**
   * ```css
   * .text\:\:\$white {
   *   --text-opacity: 1;
   *   color: rgba(255, 255, 255, var(--text-opacity));
   * }
   * ```
   */
  $white: ClassName;
  /**
   * ```css
   * .text\:\:\$slate50 {
   *   --text-opacity: 1;
   *   color: rgba(248, 250, 252, var(--text-opacity));
   * }
   * ```
   */
  $slate50: ClassName;
  /**
   * ```css
   * .text\:\:\$slate100 {
   *   --text-opacity: 1;
   *   color: rgba(241, 245, 249, var(--text-opacity));
   * }
   * ```
   */
  $slate100: ClassName;
  /**
   * ```css
   * .text\:\:\$slate200 {
   *   --text-opacity: 1;
   *   color: rgba(226, 232, 240, var(--text-opacity));
   * }
   * ```
   */
  $slate200: ClassName;
  /**
   * ```css
   * .text\:\:\$slate300 {
   *   --text-opacity: 1;
   *   color: rgba(203, 213, 225, var(--text-opacity));
   * }
   * ```
   */
  $slate300: ClassName;
  /**
   * ```css
   * .text\:\:\$slate400 {
   *   --text-opacity: 1;
   *   color: rgba(148, 163, 184, var(--text-opacity));
   * }
   * ```
   */
  $slate400: ClassName;
  /**
   * ```css
   * .text\:\:\$slate500 {
   *   --text-opacity: 1;
   *   color: rgba(100, 116, 139, var(--text-opacity));
   * }
   * ```
   */
  $slate500: ClassName;
  /**
   * ```css
   * .text\:\:\$slate600 {
   *   --text-opacity: 1;
   *   color: rgba(71, 85, 105, var(--text-opacity));
   * }
   * ```
   */
  $slate600: ClassName;
  /**
   * ```css
   * .text\:\:\$slate700 {
   *   --text-opacity: 1;
   *   color: rgba(51, 65, 85, var(--text-opacity));
   * }
   * ```
   */
  $slate700: ClassName;
  /**
   * ```css
   * .text\:\:\$slate800 {
   *   --text-opacity: 1;
   *   color: rgba(30, 41, 59, var(--text-opacity));
   * }
   * ```
   */
  $slate800: ClassName;
  /**
   * ```css
   * .text\:\:\$slate900 {
   *   --text-opacity: 1;
   *   color: rgba(15, 23, 42, var(--text-opacity));
   * }
   * ```
   */
  $slate900: ClassName;
  /**
   * ```css
   * .text\:\:\$gray50 {
   *   --text-opacity: 1;
   *   color: rgba(249, 250, 251, var(--text-opacity));
   * }
   * ```
   */
  $gray50: ClassName;
  /**
   * ```css
   * .text\:\:\$gray100 {
   *   --text-opacity: 1;
   *   color: rgba(243, 244, 246, var(--text-opacity));
   * }
   * ```
   */
  $gray100: ClassName;
  /**
   * ```css
   * .text\:\:\$gray200 {
   *   --text-opacity: 1;
   *   color: rgba(229, 231, 235, var(--text-opacity));
   * }
   * ```
   */
  $gray200: ClassName;
  /**
   * ```css
   * .text\:\:\$gray300 {
   *   --text-opacity: 1;
   *   color: rgba(209, 213, 219, var(--text-opacity));
   * }
   * ```
   */
  $gray300: ClassName;
  /**
   * ```css
   * .text\:\:\$gray400 {
   *   --text-opacity: 1;
   *   color: rgba(156, 163, 175, var(--text-opacity));
   * }
   * ```
   */
  $gray400: ClassName;
  /**
   * ```css
   * .text\:\:\$gray500 {
   *   --text-opacity: 1;
   *   color: rgba(107, 114, 128, var(--text-opacity));
   * }
   * ```
   */
  $gray500: ClassName;
  /**
   * ```css
   * .text\:\:\$gray600 {
   *   --text-opacity: 1;
   *   color: rgba(75, 85, 99, var(--text-opacity));
   * }
   * ```
   */
  $gray600: ClassName;
  /**
   * ```css
   * .text\:\:\$gray700 {
   *   --text-opacity: 1;
   *   color: rgba(55, 65, 81, var(--text-opacity));
   * }
   * ```
   */
  $gray700: ClassName;
  /**
   * ```css
   * .text\:\:\$gray800 {
   *   --text-opacity: 1;
   *   color: rgba(31, 41, 55, var(--text-opacity));
   * }
   * ```
   */
  $gray800: ClassName;
  /**
   * ```css
   * .text\:\:\$gray900 {
   *   --text-opacity: 1;
   *   color: rgba(17, 24, 39, var(--text-opacity));
   * }
   * ```
   */
  $gray900: ClassName;
  /**
   * ```css
   * .text\:\:\$zinc50 {
   *   --text-opacity: 1;
   *   color: rgba(250, 250, 250, var(--text-opacity));
   * }
   * ```
   */
  $zinc50: ClassName;
  /**
   * ```css
   * .text\:\:\$zinc100 {
   *   --text-opacity: 1;
   *   color: rgba(244, 244, 245, var(--text-opacity));
   * }
   * ```
   */
  $zinc100: ClassName;
  /**
   * ```css
   * .text\:\:\$zinc200 {
   *   --text-opacity: 1;
   *   color: rgba(228, 228, 231, var(--text-opacity));
   * }
   * ```
   */
  $zinc200: ClassName;
  /**
   * ```css
   * .text\:\:\$zinc300 {
   *   --text-opacity: 1;
   *   color: rgba(212, 212, 216, var(--text-opacity));
   * }
   * ```
   */
  $zinc300: ClassName;
  /**
   * ```css
   * .text\:\:\$zinc400 {
   *   --text-opacity: 1;
   *   color: rgba(161, 161, 170, var(--text-opacity));
   * }
   * ```
   */
  $zinc400: ClassName;
  /**
   * ```css
   * .text\:\:\$zinc500 {
   *   --text-opacity: 1;
   *   color: rgba(113, 113, 122, var(--text-opacity));
   * }
   * ```
   */
  $zinc500: ClassName;
  /**
   * ```css
   * .text\:\:\$zinc600 {
   *   --text-opacity: 1;
   *   color: rgba(82, 82, 91, var(--text-opacity));
   * }
   * ```
   */
  $zinc600: ClassName;
  /**
   * ```css
   * .text\:\:\$zinc700 {
   *   --text-opacity: 1;
   *   color: rgba(63, 63, 70, var(--text-opacity));
   * }
   * ```
   */
  $zinc700: ClassName;
  /**
   * ```css
   * .text\:\:\$zinc800 {
   *   --text-opacity: 1;
   *   color: rgba(39, 39, 42, var(--text-opacity));
   * }
   * ```
   */
  $zinc800: ClassName;
  /**
   * ```css
   * .text\:\:\$zinc900 {
   *   --text-opacity: 1;
   *   color: rgba(24, 24, 27, var(--text-opacity));
   * }
   * ```
   */
  $zinc900: ClassName;
  /**
   * ```css
   * .text\:\:\$neutral50 {
   *   --text-opacity: 1;
   *   color: rgba(250, 250, 250, var(--text-opacity));
   * }
   * ```
   */
  $neutral50: ClassName;
  /**
   * ```css
   * .text\:\:\$neutral100 {
   *   --text-opacity: 1;
   *   color: rgba(245, 245, 245, var(--text-opacity));
   * }
   * ```
   */
  $neutral100: ClassName;
  /**
   * ```css
   * .text\:\:\$neutral200 {
   *   --text-opacity: 1;
   *   color: rgba(229, 229, 229, var(--text-opacity));
   * }
   * ```
   */
  $neutral200: ClassName;
  /**
   * ```css
   * .text\:\:\$neutral300 {
   *   --text-opacity: 1;
   *   color: rgba(212, 212, 212, var(--text-opacity));
   * }
   * ```
   */
  $neutral300: ClassName;
  /**
   * ```css
   * .text\:\:\$neutral400 {
   *   --text-opacity: 1;
   *   color: rgba(163, 163, 163, var(--text-opacity));
   * }
   * ```
   */
  $neutral400: ClassName;
  /**
   * ```css
   * .text\:\:\$neutral500 {
   *   --text-opacity: 1;
   *   color: rgba(115, 115, 115, var(--text-opacity));
   * }
   * ```
   */
  $neutral500: ClassName;
  /**
   * ```css
   * .text\:\:\$neutral600 {
   *   --text-opacity: 1;
   *   color: rgba(82, 82, 82, var(--text-opacity));
   * }
   * ```
   */
  $neutral600: ClassName;
  /**
   * ```css
   * .text\:\:\$neutral700 {
   *   --text-opacity: 1;
   *   color: rgba(64, 64, 64, var(--text-opacity));
   * }
   * ```
   */
  $neutral700: ClassName;
  /**
   * ```css
   * .text\:\:\$neutral800 {
   *   --text-opacity: 1;
   *   color: rgba(38, 38, 38, var(--text-opacity));
   * }
   * ```
   */
  $neutral800: ClassName;
  /**
   * ```css
   * .text\:\:\$neutral900 {
   *   --text-opacity: 1;
   *   color: rgba(23, 23, 23, var(--text-opacity));
   * }
   * ```
   */
  $neutral900: ClassName;
  /**
   * ```css
   * .text\:\:\$stone50 {
   *   --text-opacity: 1;
   *   color: rgba(250, 250, 249, var(--text-opacity));
   * }
   * ```
   */
  $stone50: ClassName;
  /**
   * ```css
   * .text\:\:\$stone100 {
   *   --text-opacity: 1;
   *   color: rgba(245, 245, 244, var(--text-opacity));
   * }
   * ```
   */
  $stone100: ClassName;
  /**
   * ```css
   * .text\:\:\$stone200 {
   *   --text-opacity: 1;
   *   color: rgba(231, 229, 228, var(--text-opacity));
   * }
   * ```
   */
  $stone200: ClassName;
  /**
   * ```css
   * .text\:\:\$stone300 {
   *   --text-opacity: 1;
   *   color: rgba(214, 211, 209, var(--text-opacity));
   * }
   * ```
   */
  $stone300: ClassName;
  /**
   * ```css
   * .text\:\:\$stone400 {
   *   --text-opacity: 1;
   *   color: rgba(168, 162, 158, var(--text-opacity));
   * }
   * ```
   */
  $stone400: ClassName;
  /**
   * ```css
   * .text\:\:\$stone500 {
   *   --text-opacity: 1;
   *   color: rgba(120, 113, 108, var(--text-opacity));
   * }
   * ```
   */
  $stone500: ClassName;
  /**
   * ```css
   * .text\:\:\$stone600 {
   *   --text-opacity: 1;
   *   color: rgba(87, 83, 78, var(--text-opacity));
   * }
   * ```
   */
  $stone600: ClassName;
  /**
   * ```css
   * .text\:\:\$stone700 {
   *   --text-opacity: 1;
   *   color: rgba(68, 64, 60, var(--text-opacity));
   * }
   * ```
   */
  $stone700: ClassName;
  /**
   * ```css
   * .text\:\:\$stone800 {
   *   --text-opacity: 1;
   *   color: rgba(41, 37, 36, var(--text-opacity));
   * }
   * ```
   */
  $stone800: ClassName;
  /**
   * ```css
   * .text\:\:\$stone900 {
   *   --text-opacity: 1;
   *   color: rgba(28, 25, 23, var(--text-opacity));
   * }
   * ```
   */
  $stone900: ClassName;
  /**
   * ```css
   * .text\:\:\$red50 {
   *   --text-opacity: 1;
   *   color: rgba(254, 242, 242, var(--text-opacity));
   * }
   * ```
   */
  $red50: ClassName;
  /**
   * ```css
   * .text\:\:\$red100 {
   *   --text-opacity: 1;
   *   color: rgba(254, 226, 226, var(--text-opacity));
   * }
   * ```
   */
  $red100: ClassName;
  /**
   * ```css
   * .text\:\:\$red200 {
   *   --text-opacity: 1;
   *   color: rgba(254, 202, 202, var(--text-opacity));
   * }
   * ```
   */
  $red200: ClassName;
  /**
   * ```css
   * .text\:\:\$red300 {
   *   --text-opacity: 1;
   *   color: rgba(252, 165, 165, var(--text-opacity));
   * }
   * ```
   */
  $red300: ClassName;
  /**
   * ```css
   * .text\:\:\$red400 {
   *   --text-opacity: 1;
   *   color: rgba(248, 113, 113, var(--text-opacity));
   * }
   * ```
   */
  $red400: ClassName;
  /**
   * ```css
   * .text\:\:\$red500 {
   *   --text-opacity: 1;
   *   color: rgba(239, 68, 68, var(--text-opacity));
   * }
   * ```
   */
  $red500: ClassName;
  /**
   * ```css
   * .text\:\:\$red600 {
   *   --text-opacity: 1;
   *   color: rgba(220, 38, 38, var(--text-opacity));
   * }
   * ```
   */
  $red600: ClassName;
  /**
   * ```css
   * .text\:\:\$red700 {
   *   --text-opacity: 1;
   *   color: rgba(185, 28, 28, var(--text-opacity));
   * }
   * ```
   */
  $red700: ClassName;
  /**
   * ```css
   * .text\:\:\$red800 {
   *   --text-opacity: 1;
   *   color: rgba(153, 27, 27, var(--text-opacity));
   * }
   * ```
   */
  $red800: ClassName;
  /**
   * ```css
   * .text\:\:\$red900 {
   *   --text-opacity: 1;
   *   color: rgba(127, 29, 29, var(--text-opacity));
   * }
   * ```
   */
  $red900: ClassName;
  /**
   * ```css
   * .text\:\:\$orange50 {
   *   --text-opacity: 1;
   *   color: rgba(255, 247, 237, var(--text-opacity));
   * }
   * ```
   */
  $orange50: ClassName;
  /**
   * ```css
   * .text\:\:\$orange100 {
   *   --text-opacity: 1;
   *   color: rgba(255, 237, 213, var(--text-opacity));
   * }
   * ```
   */
  $orange100: ClassName;
  /**
   * ```css
   * .text\:\:\$orange200 {
   *   --text-opacity: 1;
   *   color: rgba(254, 215, 170, var(--text-opacity));
   * }
   * ```
   */
  $orange200: ClassName;
  /**
   * ```css
   * .text\:\:\$orange300 {
   *   --text-opacity: 1;
   *   color: rgba(253, 186, 116, var(--text-opacity));
   * }
   * ```
   */
  $orange300: ClassName;
  /**
   * ```css
   * .text\:\:\$orange400 {
   *   --text-opacity: 1;
   *   color: rgba(251, 146, 60, var(--text-opacity));
   * }
   * ```
   */
  $orange400: ClassName;
  /**
   * ```css
   * .text\:\:\$orange500 {
   *   --text-opacity: 1;
   *   color: rgba(249, 115, 22, var(--text-opacity));
   * }
   * ```
   */
  $orange500: ClassName;
  /**
   * ```css
   * .text\:\:\$orange600 {
   *   --text-opacity: 1;
   *   color: rgba(234, 88, 12, var(--text-opacity));
   * }
   * ```
   */
  $orange600: ClassName;
  /**
   * ```css
   * .text\:\:\$orange700 {
   *   --text-opacity: 1;
   *   color: rgba(194, 65, 12, var(--text-opacity));
   * }
   * ```
   */
  $orange700: ClassName;
  /**
   * ```css
   * .text\:\:\$orange800 {
   *   --text-opacity: 1;
   *   color: rgba(154, 52, 18, var(--text-opacity));
   * }
   * ```
   */
  $orange800: ClassName;
  /**
   * ```css
   * .text\:\:\$orange900 {
   *   --text-opacity: 1;
   *   color: rgba(124, 45, 18, var(--text-opacity));
   * }
   * ```
   */
  $orange900: ClassName;
  /**
   * ```css
   * .text\:\:\$amber50 {
   *   --text-opacity: 1;
   *   color: rgba(255, 251, 235, var(--text-opacity));
   * }
   * ```
   */
  $amber50: ClassName;
  /**
   * ```css
   * .text\:\:\$amber100 {
   *   --text-opacity: 1;
   *   color: rgba(254, 243, 199, var(--text-opacity));
   * }
   * ```
   */
  $amber100: ClassName;
  /**
   * ```css
   * .text\:\:\$amber200 {
   *   --text-opacity: 1;
   *   color: rgba(253, 230, 138, var(--text-opacity));
   * }
   * ```
   */
  $amber200: ClassName;
  /**
   * ```css
   * .text\:\:\$amber300 {
   *   --text-opacity: 1;
   *   color: rgba(252, 211, 77, var(--text-opacity));
   * }
   * ```
   */
  $amber300: ClassName;
  /**
   * ```css
   * .text\:\:\$amber400 {
   *   --text-opacity: 1;
   *   color: rgba(251, 191, 36, var(--text-opacity));
   * }
   * ```
   */
  $amber400: ClassName;
  /**
   * ```css
   * .text\:\:\$amber500 {
   *   --text-opacity: 1;
   *   color: rgba(245, 158, 11, var(--text-opacity));
   * }
   * ```
   */
  $amber500: ClassName;
  /**
   * ```css
   * .text\:\:\$amber600 {
   *   --text-opacity: 1;
   *   color: rgba(217, 119, 6, var(--text-opacity));
   * }
   * ```
   */
  $amber600: ClassName;
  /**
   * ```css
   * .text\:\:\$amber700 {
   *   --text-opacity: 1;
   *   color: rgba(180, 83, 9, var(--text-opacity));
   * }
   * ```
   */
  $amber700: ClassName;
  /**
   * ```css
   * .text\:\:\$amber800 {
   *   --text-opacity: 1;
   *   color: rgba(146, 64, 14, var(--text-opacity));
   * }
   * ```
   */
  $amber800: ClassName;
  /**
   * ```css
   * .text\:\:\$amber900 {
   *   --text-opacity: 1;
   *   color: rgba(120, 53, 15, var(--text-opacity));
   * }
   * ```
   */
  $amber900: ClassName;
  /**
   * ```css
   * .text\:\:\$yellow50 {
   *   --text-opacity: 1;
   *   color: rgba(254, 252, 232, var(--text-opacity));
   * }
   * ```
   */
  $yellow50: ClassName;
  /**
   * ```css
   * .text\:\:\$yellow100 {
   *   --text-opacity: 1;
   *   color: rgba(254, 249, 195, var(--text-opacity));
   * }
   * ```
   */
  $yellow100: ClassName;
  /**
   * ```css
   * .text\:\:\$yellow200 {
   *   --text-opacity: 1;
   *   color: rgba(254, 240, 138, var(--text-opacity));
   * }
   * ```
   */
  $yellow200: ClassName;
  /**
   * ```css
   * .text\:\:\$yellow300 {
   *   --text-opacity: 1;
   *   color: rgba(253, 224, 71, var(--text-opacity));
   * }
   * ```
   */
  $yellow300: ClassName;
  /**
   * ```css
   * .text\:\:\$yellow400 {
   *   --text-opacity: 1;
   *   color: rgba(250, 204, 21, var(--text-opacity));
   * }
   * ```
   */
  $yellow400: ClassName;
  /**
   * ```css
   * .text\:\:\$yellow500 {
   *   --text-opacity: 1;
   *   color: rgba(234, 179, 8, var(--text-opacity));
   * }
   * ```
   */
  $yellow500: ClassName;
  /**
   * ```css
   * .text\:\:\$yellow600 {
   *   --text-opacity: 1;
   *   color: rgba(202, 138, 4, var(--text-opacity));
   * }
   * ```
   */
  $yellow600: ClassName;
  /**
   * ```css
   * .text\:\:\$yellow700 {
   *   --text-opacity: 1;
   *   color: rgba(161, 98, 7, var(--text-opacity));
   * }
   * ```
   */
  $yellow700: ClassName;
  /**
   * ```css
   * .text\:\:\$yellow800 {
   *   --text-opacity: 1;
   *   color: rgba(133, 77, 14, var(--text-opacity));
   * }
   * ```
   */
  $yellow800: ClassName;
  /**
   * ```css
   * .text\:\:\$yellow900 {
   *   --text-opacity: 1;
   *   color: rgba(113, 63, 18, var(--text-opacity));
   * }
   * ```
   */
  $yellow900: ClassName;
  /**
   * ```css
   * .text\:\:\$lime50 {
   *   --text-opacity: 1;
   *   color: rgba(247, 254, 231, var(--text-opacity));
   * }
   * ```
   */
  $lime50: ClassName;
  /**
   * ```css
   * .text\:\:\$lime100 {
   *   --text-opacity: 1;
   *   color: rgba(236, 252, 203, var(--text-opacity));
   * }
   * ```
   */
  $lime100: ClassName;
  /**
   * ```css
   * .text\:\:\$lime200 {
   *   --text-opacity: 1;
   *   color: rgba(217, 249, 157, var(--text-opacity));
   * }
   * ```
   */
  $lime200: ClassName;
  /**
   * ```css
   * .text\:\:\$lime300 {
   *   --text-opacity: 1;
   *   color: rgba(190, 242, 100, var(--text-opacity));
   * }
   * ```
   */
  $lime300: ClassName;
  /**
   * ```css
   * .text\:\:\$lime400 {
   *   --text-opacity: 1;
   *   color: rgba(163, 230, 53, var(--text-opacity));
   * }
   * ```
   */
  $lime400: ClassName;
  /**
   * ```css
   * .text\:\:\$lime500 {
   *   --text-opacity: 1;
   *   color: rgba(132, 204, 22, var(--text-opacity));
   * }
   * ```
   */
  $lime500: ClassName;
  /**
   * ```css
   * .text\:\:\$lime600 {
   *   --text-opacity: 1;
   *   color: rgba(101, 163, 13, var(--text-opacity));
   * }
   * ```
   */
  $lime600: ClassName;
  /**
   * ```css
   * .text\:\:\$lime700 {
   *   --text-opacity: 1;
   *   color: rgba(77, 124, 15, var(--text-opacity));
   * }
   * ```
   */
  $lime700: ClassName;
  /**
   * ```css
   * .text\:\:\$lime800 {
   *   --text-opacity: 1;
   *   color: rgba(63, 98, 18, var(--text-opacity));
   * }
   * ```
   */
  $lime800: ClassName;
  /**
   * ```css
   * .text\:\:\$lime900 {
   *   --text-opacity: 1;
   *   color: rgba(54, 83, 20, var(--text-opacity));
   * }
   * ```
   */
  $lime900: ClassName;
  /**
   * ```css
   * .text\:\:\$green50 {
   *   --text-opacity: 1;
   *   color: rgba(240, 253, 244, var(--text-opacity));
   * }
   * ```
   */
  $green50: ClassName;
  /**
   * ```css
   * .text\:\:\$green100 {
   *   --text-opacity: 1;
   *   color: rgba(220, 252, 231, var(--text-opacity));
   * }
   * ```
   */
  $green100: ClassName;
  /**
   * ```css
   * .text\:\:\$green200 {
   *   --text-opacity: 1;
   *   color: rgba(187, 247, 208, var(--text-opacity));
   * }
   * ```
   */
  $green200: ClassName;
  /**
   * ```css
   * .text\:\:\$green300 {
   *   --text-opacity: 1;
   *   color: rgba(134, 239, 172, var(--text-opacity));
   * }
   * ```
   */
  $green300: ClassName;
  /**
   * ```css
   * .text\:\:\$green400 {
   *   --text-opacity: 1;
   *   color: rgba(74, 222, 128, var(--text-opacity));
   * }
   * ```
   */
  $green400: ClassName;
  /**
   * ```css
   * .text\:\:\$green500 {
   *   --text-opacity: 1;
   *   color: rgba(34, 197, 94, var(--text-opacity));
   * }
   * ```
   */
  $green500: ClassName;
  /**
   * ```css
   * .text\:\:\$green600 {
   *   --text-opacity: 1;
   *   color: rgba(22, 163, 74, var(--text-opacity));
   * }
   * ```
   */
  $green600: ClassName;
  /**
   * ```css
   * .text\:\:\$green700 {
   *   --text-opacity: 1;
   *   color: rgba(21, 128, 61, var(--text-opacity));
   * }
   * ```
   */
  $green700: ClassName;
  /**
   * ```css
   * .text\:\:\$green800 {
   *   --text-opacity: 1;
   *   color: rgba(22, 101, 52, var(--text-opacity));
   * }
   * ```
   */
  $green800: ClassName;
  /**
   * ```css
   * .text\:\:\$green900 {
   *   --text-opacity: 1;
   *   color: rgba(20, 83, 45, var(--text-opacity));
   * }
   * ```
   */
  $green900: ClassName;
  /**
   * ```css
   * .text\:\:\$emerald50 {
   *   --text-opacity: 1;
   *   color: rgba(236, 253, 245, var(--text-opacity));
   * }
   * ```
   */
  $emerald50: ClassName;
  /**
   * ```css
   * .text\:\:\$emerald100 {
   *   --text-opacity: 1;
   *   color: rgba(209, 250, 229, var(--text-opacity));
   * }
   * ```
   */
  $emerald100: ClassName;
  /**
   * ```css
   * .text\:\:\$emerald200 {
   *   --text-opacity: 1;
   *   color: rgba(167, 243, 208, var(--text-opacity));
   * }
   * ```
   */
  $emerald200: ClassName;
  /**
   * ```css
   * .text\:\:\$emerald300 {
   *   --text-opacity: 1;
   *   color: rgba(110, 231, 183, var(--text-opacity));
   * }
   * ```
   */
  $emerald300: ClassName;
  /**
   * ```css
   * .text\:\:\$emerald400 {
   *   --text-opacity: 1;
   *   color: rgba(52, 211, 153, var(--text-opacity));
   * }
   * ```
   */
  $emerald400: ClassName;
  /**
   * ```css
   * .text\:\:\$emerald500 {
   *   --text-opacity: 1;
   *   color: rgba(16, 185, 129, var(--text-opacity));
   * }
   * ```
   */
  $emerald500: ClassName;
  /**
   * ```css
   * .text\:\:\$emerald600 {
   *   --text-opacity: 1;
   *   color: rgba(5, 150, 105, var(--text-opacity));
   * }
   * ```
   */
  $emerald600: ClassName;
  /**
   * ```css
   * .text\:\:\$emerald700 {
   *   --text-opacity: 1;
   *   color: rgba(4, 120, 87, var(--text-opacity));
   * }
   * ```
   */
  $emerald700: ClassName;
  /**
   * ```css
   * .text\:\:\$emerald800 {
   *   --text-opacity: 1;
   *   color: rgba(6, 95, 70, var(--text-opacity));
   * }
   * ```
   */
  $emerald800: ClassName;
  /**
   * ```css
   * .text\:\:\$emerald900 {
   *   --text-opacity: 1;
   *   color: rgba(6, 78, 59, var(--text-opacity));
   * }
   * ```
   */
  $emerald900: ClassName;
  /**
   * ```css
   * .text\:\:\$teal50 {
   *   --text-opacity: 1;
   *   color: rgba(240, 253, 250, var(--text-opacity));
   * }
   * ```
   */
  $teal50: ClassName;
  /**
   * ```css
   * .text\:\:\$teal100 {
   *   --text-opacity: 1;
   *   color: rgba(204, 251, 241, var(--text-opacity));
   * }
   * ```
   */
  $teal100: ClassName;
  /**
   * ```css
   * .text\:\:\$teal200 {
   *   --text-opacity: 1;
   *   color: rgba(153, 246, 228, var(--text-opacity));
   * }
   * ```
   */
  $teal200: ClassName;
  /**
   * ```css
   * .text\:\:\$teal300 {
   *   --text-opacity: 1;
   *   color: rgba(94, 234, 212, var(--text-opacity));
   * }
   * ```
   */
  $teal300: ClassName;
  /**
   * ```css
   * .text\:\:\$teal400 {
   *   --text-opacity: 1;
   *   color: rgba(45, 212, 191, var(--text-opacity));
   * }
   * ```
   */
  $teal400: ClassName;
  /**
   * ```css
   * .text\:\:\$teal500 {
   *   --text-opacity: 1;
   *   color: rgba(20, 184, 166, var(--text-opacity));
   * }
   * ```
   */
  $teal500: ClassName;
  /**
   * ```css
   * .text\:\:\$teal600 {
   *   --text-opacity: 1;
   *   color: rgba(13, 148, 136, var(--text-opacity));
   * }
   * ```
   */
  $teal600: ClassName;
  /**
   * ```css
   * .text\:\:\$teal700 {
   *   --text-opacity: 1;
   *   color: rgba(15, 118, 110, var(--text-opacity));
   * }
   * ```
   */
  $teal700: ClassName;
  /**
   * ```css
   * .text\:\:\$teal800 {
   *   --text-opacity: 1;
   *   color: rgba(17, 94, 89, var(--text-opacity));
   * }
   * ```
   */
  $teal800: ClassName;
  /**
   * ```css
   * .text\:\:\$teal900 {
   *   --text-opacity: 1;
   *   color: rgba(19, 78, 74, var(--text-opacity));
   * }
   * ```
   */
  $teal900: ClassName;
  /**
   * ```css
   * .text\:\:\$cyan50 {
   *   --text-opacity: 1;
   *   color: rgba(236, 254, 255, var(--text-opacity));
   * }
   * ```
   */
  $cyan50: ClassName;
  /**
   * ```css
   * .text\:\:\$cyan100 {
   *   --text-opacity: 1;
   *   color: rgba(207, 250, 254, var(--text-opacity));
   * }
   * ```
   */
  $cyan100: ClassName;
  /**
   * ```css
   * .text\:\:\$cyan200 {
   *   --text-opacity: 1;
   *   color: rgba(165, 243, 252, var(--text-opacity));
   * }
   * ```
   */
  $cyan200: ClassName;
  /**
   * ```css
   * .text\:\:\$cyan300 {
   *   --text-opacity: 1;
   *   color: rgba(103, 232, 249, var(--text-opacity));
   * }
   * ```
   */
  $cyan300: ClassName;
  /**
   * ```css
   * .text\:\:\$cyan400 {
   *   --text-opacity: 1;
   *   color: rgba(34, 211, 238, var(--text-opacity));
   * }
   * ```
   */
  $cyan400: ClassName;
  /**
   * ```css
   * .text\:\:\$cyan500 {
   *   --text-opacity: 1;
   *   color: rgba(6, 182, 212, var(--text-opacity));
   * }
   * ```
   */
  $cyan500: ClassName;
  /**
   * ```css
   * .text\:\:\$cyan600 {
   *   --text-opacity: 1;
   *   color: rgba(8, 145, 178, var(--text-opacity));
   * }
   * ```
   */
  $cyan600: ClassName;
  /**
   * ```css
   * .text\:\:\$cyan700 {
   *   --text-opacity: 1;
   *   color: rgba(14, 116, 144, var(--text-opacity));
   * }
   * ```
   */
  $cyan700: ClassName;
  /**
   * ```css
   * .text\:\:\$cyan800 {
   *   --text-opacity: 1;
   *   color: rgba(21, 94, 117, var(--text-opacity));
   * }
   * ```
   */
  $cyan800: ClassName;
  /**
   * ```css
   * .text\:\:\$cyan900 {
   *   --text-opacity: 1;
   *   color: rgba(22, 78, 99, var(--text-opacity));
   * }
   * ```
   */
  $cyan900: ClassName;
  /**
   * ```css
   * .text\:\:\$sky50 {
   *   --text-opacity: 1;
   *   color: rgba(240, 249, 255, var(--text-opacity));
   * }
   * ```
   */
  $sky50: ClassName;
  /**
   * ```css
   * .text\:\:\$sky100 {
   *   --text-opacity: 1;
   *   color: rgba(224, 242, 254, var(--text-opacity));
   * }
   * ```
   */
  $sky100: ClassName;
  /**
   * ```css
   * .text\:\:\$sky200 {
   *   --text-opacity: 1;
   *   color: rgba(186, 230, 253, var(--text-opacity));
   * }
   * ```
   */
  $sky200: ClassName;
  /**
   * ```css
   * .text\:\:\$sky300 {
   *   --text-opacity: 1;
   *   color: rgba(125, 211, 252, var(--text-opacity));
   * }
   * ```
   */
  $sky300: ClassName;
  /**
   * ```css
   * .text\:\:\$sky400 {
   *   --text-opacity: 1;
   *   color: rgba(56, 189, 248, var(--text-opacity));
   * }
   * ```
   */
  $sky400: ClassName;
  /**
   * ```css
   * .text\:\:\$sky500 {
   *   --text-opacity: 1;
   *   color: rgba(14, 165, 233, var(--text-opacity));
   * }
   * ```
   */
  $sky500: ClassName;
  /**
   * ```css
   * .text\:\:\$sky600 {
   *   --text-opacity: 1;
   *   color: rgba(2, 132, 199, var(--text-opacity));
   * }
   * ```
   */
  $sky600: ClassName;
  /**
   * ```css
   * .text\:\:\$sky700 {
   *   --text-opacity: 1;
   *   color: rgba(3, 105, 161, var(--text-opacity));
   * }
   * ```
   */
  $sky700: ClassName;
  /**
   * ```css
   * .text\:\:\$sky800 {
   *   --text-opacity: 1;
   *   color: rgba(7, 89, 133, var(--text-opacity));
   * }
   * ```
   */
  $sky800: ClassName;
  /**
   * ```css
   * .text\:\:\$sky900 {
   *   --text-opacity: 1;
   *   color: rgba(12, 74, 110, var(--text-opacity));
   * }
   * ```
   */
  $sky900: ClassName;
  /**
   * ```css
   * .text\:\:\$blue50 {
   *   --text-opacity: 1;
   *   color: rgba(239, 246, 255, var(--text-opacity));
   * }
   * ```
   */
  $blue50: ClassName;
  /**
   * ```css
   * .text\:\:\$blue100 {
   *   --text-opacity: 1;
   *   color: rgba(219, 234, 254, var(--text-opacity));
   * }
   * ```
   */
  $blue100: ClassName;
  /**
   * ```css
   * .text\:\:\$blue200 {
   *   --text-opacity: 1;
   *   color: rgba(191, 219, 254, var(--text-opacity));
   * }
   * ```
   */
  $blue200: ClassName;
  /**
   * ```css
   * .text\:\:\$blue300 {
   *   --text-opacity: 1;
   *   color: rgba(147, 197, 253, var(--text-opacity));
   * }
   * ```
   */
  $blue300: ClassName;
  /**
   * ```css
   * .text\:\:\$blue400 {
   *   --text-opacity: 1;
   *   color: rgba(96, 165, 250, var(--text-opacity));
   * }
   * ```
   */
  $blue400: ClassName;
  /**
   * ```css
   * .text\:\:\$blue500 {
   *   --text-opacity: 1;
   *   color: rgba(59, 130, 246, var(--text-opacity));
   * }
   * ```
   */
  $blue500: ClassName;
  /**
   * ```css
   * .text\:\:\$blue600 {
   *   --text-opacity: 1;
   *   color: rgba(37, 99, 235, var(--text-opacity));
   * }
   * ```
   */
  $blue600: ClassName;
  /**
   * ```css
   * .text\:\:\$blue700 {
   *   --text-opacity: 1;
   *   color: rgba(29, 78, 216, var(--text-opacity));
   * }
   * ```
   */
  $blue700: ClassName;
  /**
   * ```css
   * .text\:\:\$blue800 {
   *   --text-opacity: 1;
   *   color: rgba(30, 64, 175, var(--text-opacity));
   * }
   * ```
   */
  $blue800: ClassName;
  /**
   * ```css
   * .text\:\:\$blue900 {
   *   --text-opacity: 1;
   *   color: rgba(30, 58, 138, var(--text-opacity));
   * }
   * ```
   */
  $blue900: ClassName;
  /**
   * ```css
   * .text\:\:\$indigo50 {
   *   --text-opacity: 1;
   *   color: rgba(238, 242, 255, var(--text-opacity));
   * }
   * ```
   */
  $indigo50: ClassName;
  /**
   * ```css
   * .text\:\:\$indigo100 {
   *   --text-opacity: 1;
   *   color: rgba(224, 231, 255, var(--text-opacity));
   * }
   * ```
   */
  $indigo100: ClassName;
  /**
   * ```css
   * .text\:\:\$indigo200 {
   *   --text-opacity: 1;
   *   color: rgba(199, 210, 254, var(--text-opacity));
   * }
   * ```
   */
  $indigo200: ClassName;
  /**
   * ```css
   * .text\:\:\$indigo300 {
   *   --text-opacity: 1;
   *   color: rgba(165, 180, 252, var(--text-opacity));
   * }
   * ```
   */
  $indigo300: ClassName;
  /**
   * ```css
   * .text\:\:\$indigo400 {
   *   --text-opacity: 1;
   *   color: rgba(129, 140, 248, var(--text-opacity));
   * }
   * ```
   */
  $indigo400: ClassName;
  /**
   * ```css
   * .text\:\:\$indigo500 {
   *   --text-opacity: 1;
   *   color: rgba(99, 102, 241, var(--text-opacity));
   * }
   * ```
   */
  $indigo500: ClassName;
  /**
   * ```css
   * .text\:\:\$indigo600 {
   *   --text-opacity: 1;
   *   color: rgba(79, 70, 229, var(--text-opacity));
   * }
   * ```
   */
  $indigo600: ClassName;
  /**
   * ```css
   * .text\:\:\$indigo700 {
   *   --text-opacity: 1;
   *   color: rgba(67, 56, 202, var(--text-opacity));
   * }
   * ```
   */
  $indigo700: ClassName;
  /**
   * ```css
   * .text\:\:\$indigo800 {
   *   --text-opacity: 1;
   *   color: rgba(55, 48, 163, var(--text-opacity));
   * }
   * ```
   */
  $indigo800: ClassName;
  /**
   * ```css
   * .text\:\:\$indigo900 {
   *   --text-opacity: 1;
   *   color: rgba(49, 46, 129, var(--text-opacity));
   * }
   * ```
   */
  $indigo900: ClassName;
  /**
   * ```css
   * .text\:\:\$violet50 {
   *   --text-opacity: 1;
   *   color: rgba(245, 243, 255, var(--text-opacity));
   * }
   * ```
   */
  $violet50: ClassName;
  /**
   * ```css
   * .text\:\:\$violet100 {
   *   --text-opacity: 1;
   *   color: rgba(237, 233, 254, var(--text-opacity));
   * }
   * ```
   */
  $violet100: ClassName;
  /**
   * ```css
   * .text\:\:\$violet200 {
   *   --text-opacity: 1;
   *   color: rgba(221, 214, 254, var(--text-opacity));
   * }
   * ```
   */
  $violet200: ClassName;
  /**
   * ```css
   * .text\:\:\$violet300 {
   *   --text-opacity: 1;
   *   color: rgba(196, 181, 253, var(--text-opacity));
   * }
   * ```
   */
  $violet300: ClassName;
  /**
   * ```css
   * .text\:\:\$violet400 {
   *   --text-opacity: 1;
   *   color: rgba(167, 139, 250, var(--text-opacity));
   * }
   * ```
   */
  $violet400: ClassName;
  /**
   * ```css
   * .text\:\:\$violet500 {
   *   --text-opacity: 1;
   *   color: rgba(139, 92, 246, var(--text-opacity));
   * }
   * ```
   */
  $violet500: ClassName;
  /**
   * ```css
   * .text\:\:\$violet600 {
   *   --text-opacity: 1;
   *   color: rgba(124, 58, 237, var(--text-opacity));
   * }
   * ```
   */
  $violet600: ClassName;
  /**
   * ```css
   * .text\:\:\$violet700 {
   *   --text-opacity: 1;
   *   color: rgba(109, 40, 217, var(--text-opacity));
   * }
   * ```
   */
  $violet700: ClassName;
  /**
   * ```css
   * .text\:\:\$violet800 {
   *   --text-opacity: 1;
   *   color: rgba(91, 33, 182, var(--text-opacity));
   * }
   * ```
   */
  $violet800: ClassName;
  /**
   * ```css
   * .text\:\:\$violet900 {
   *   --text-opacity: 1;
   *   color: rgba(76, 29, 149, var(--text-opacity));
   * }
   * ```
   */
  $violet900: ClassName;
  /**
   * ```css
   * .text\:\:\$purple50 {
   *   --text-opacity: 1;
   *   color: rgba(250, 245, 255, var(--text-opacity));
   * }
   * ```
   */
  $purple50: ClassName;
  /**
   * ```css
   * .text\:\:\$purple100 {
   *   --text-opacity: 1;
   *   color: rgba(243, 232, 255, var(--text-opacity));
   * }
   * ```
   */
  $purple100: ClassName;
  /**
   * ```css
   * .text\:\:\$purple200 {
   *   --text-opacity: 1;
   *   color: rgba(233, 213, 255, var(--text-opacity));
   * }
   * ```
   */
  $purple200: ClassName;
  /**
   * ```css
   * .text\:\:\$purple300 {
   *   --text-opacity: 1;
   *   color: rgba(216, 180, 254, var(--text-opacity));
   * }
   * ```
   */
  $purple300: ClassName;
  /**
   * ```css
   * .text\:\:\$purple400 {
   *   --text-opacity: 1;
   *   color: rgba(192, 132, 252, var(--text-opacity));
   * }
   * ```
   */
  $purple400: ClassName;
  /**
   * ```css
   * .text\:\:\$purple500 {
   *   --text-opacity: 1;
   *   color: rgba(168, 85, 247, var(--text-opacity));
   * }
   * ```
   */
  $purple500: ClassName;
  /**
   * ```css
   * .text\:\:\$purple600 {
   *   --text-opacity: 1;
   *   color: rgba(147, 51, 234, var(--text-opacity));
   * }
   * ```
   */
  $purple600: ClassName;
  /**
   * ```css
   * .text\:\:\$purple700 {
   *   --text-opacity: 1;
   *   color: rgba(126, 34, 206, var(--text-opacity));
   * }
   * ```
   */
  $purple700: ClassName;
  /**
   * ```css
   * .text\:\:\$purple800 {
   *   --text-opacity: 1;
   *   color: rgba(107, 33, 168, var(--text-opacity));
   * }
   * ```
   */
  $purple800: ClassName;
  /**
   * ```css
   * .text\:\:\$purple900 {
   *   --text-opacity: 1;
   *   color: rgba(88, 28, 135, var(--text-opacity));
   * }
   * ```
   */
  $purple900: ClassName;
  /**
   * ```css
   * .text\:\:\$fuchsia50 {
   *   --text-opacity: 1;
   *   color: rgba(253, 244, 255, var(--text-opacity));
   * }
   * ```
   */
  $fuchsia50: ClassName;
  /**
   * ```css
   * .text\:\:\$fuchsia100 {
   *   --text-opacity: 1;
   *   color: rgba(250, 232, 255, var(--text-opacity));
   * }
   * ```
   */
  $fuchsia100: ClassName;
  /**
   * ```css
   * .text\:\:\$fuchsia200 {
   *   --text-opacity: 1;
   *   color: rgba(245, 208, 254, var(--text-opacity));
   * }
   * ```
   */
  $fuchsia200: ClassName;
  /**
   * ```css
   * .text\:\:\$fuchsia300 {
   *   --text-opacity: 1;
   *   color: rgba(240, 171, 252, var(--text-opacity));
   * }
   * ```
   */
  $fuchsia300: ClassName;
  /**
   * ```css
   * .text\:\:\$fuchsia400 {
   *   --text-opacity: 1;
   *   color: rgba(232, 121, 249, var(--text-opacity));
   * }
   * ```
   */
  $fuchsia400: ClassName;
  /**
   * ```css
   * .text\:\:\$fuchsia500 {
   *   --text-opacity: 1;
   *   color: rgba(217, 70, 239, var(--text-opacity));
   * }
   * ```
   */
  $fuchsia500: ClassName;
  /**
   * ```css
   * .text\:\:\$fuchsia600 {
   *   --text-opacity: 1;
   *   color: rgba(192, 38, 211, var(--text-opacity));
   * }
   * ```
   */
  $fuchsia600: ClassName;
  /**
   * ```css
   * .text\:\:\$fuchsia700 {
   *   --text-opacity: 1;
   *   color: rgba(162, 28, 175, var(--text-opacity));
   * }
   * ```
   */
  $fuchsia700: ClassName;
  /**
   * ```css
   * .text\:\:\$fuchsia800 {
   *   --text-opacity: 1;
   *   color: rgba(134, 25, 143, var(--text-opacity));
   * }
   * ```
   */
  $fuchsia800: ClassName;
  /**
   * ```css
   * .text\:\:\$fuchsia900 {
   *   --text-opacity: 1;
   *   color: rgba(112, 26, 117, var(--text-opacity));
   * }
   * ```
   */
  $fuchsia900: ClassName;
  /**
   * ```css
   * .text\:\:\$pink50 {
   *   --text-opacity: 1;
   *   color: rgba(253, 242, 248, var(--text-opacity));
   * }
   * ```
   */
  $pink50: ClassName;
  /**
   * ```css
   * .text\:\:\$pink100 {
   *   --text-opacity: 1;
   *   color: rgba(252, 231, 243, var(--text-opacity));
   * }
   * ```
   */
  $pink100: ClassName;
  /**
   * ```css
   * .text\:\:\$pink200 {
   *   --text-opacity: 1;
   *   color: rgba(251, 207, 232, var(--text-opacity));
   * }
   * ```
   */
  $pink200: ClassName;
  /**
   * ```css
   * .text\:\:\$pink300 {
   *   --text-opacity: 1;
   *   color: rgba(249, 168, 212, var(--text-opacity));
   * }
   * ```
   */
  $pink300: ClassName;
  /**
   * ```css
   * .text\:\:\$pink400 {
   *   --text-opacity: 1;
   *   color: rgba(244, 114, 182, var(--text-opacity));
   * }
   * ```
   */
  $pink400: ClassName;
  /**
   * ```css
   * .text\:\:\$pink500 {
   *   --text-opacity: 1;
   *   color: rgba(236, 72, 153, var(--text-opacity));
   * }
   * ```
   */
  $pink500: ClassName;
  /**
   * ```css
   * .text\:\:\$pink600 {
   *   --text-opacity: 1;
   *   color: rgba(219, 39, 119, var(--text-opacity));
   * }
   * ```
   */
  $pink600: ClassName;
  /**
   * ```css
   * .text\:\:\$pink700 {
   *   --text-opacity: 1;
   *   color: rgba(190, 24, 93, var(--text-opacity));
   * }
   * ```
   */
  $pink700: ClassName;
  /**
   * ```css
   * .text\:\:\$pink800 {
   *   --text-opacity: 1;
   *   color: rgba(157, 23, 77, var(--text-opacity));
   * }
   * ```
   */
  $pink800: ClassName;
  /**
   * ```css
   * .text\:\:\$pink900 {
   *   --text-opacity: 1;
   *   color: rgba(131, 24, 67, var(--text-opacity));
   * }
   * ```
   */
  $pink900: ClassName;
  /**
   * ```css
   * .text\:\:\$rose50 {
   *   --text-opacity: 1;
   *   color: rgba(255, 241, 242, var(--text-opacity));
   * }
   * ```
   */
  $rose50: ClassName;
  /**
   * ```css
   * .text\:\:\$rose100 {
   *   --text-opacity: 1;
   *   color: rgba(255, 228, 230, var(--text-opacity));
   * }
   * ```
   */
  $rose100: ClassName;
  /**
   * ```css
   * .text\:\:\$rose200 {
   *   --text-opacity: 1;
   *   color: rgba(254, 205, 211, var(--text-opacity));
   * }
   * ```
   */
  $rose200: ClassName;
  /**
   * ```css
   * .text\:\:\$rose300 {
   *   --text-opacity: 1;
   *   color: rgba(253, 164, 175, var(--text-opacity));
   * }
   * ```
   */
  $rose300: ClassName;
  /**
   * ```css
   * .text\:\:\$rose400 {
   *   --text-opacity: 1;
   *   color: rgba(251, 113, 133, var(--text-opacity));
   * }
   * ```
   */
  $rose400: ClassName;
  /**
   * ```css
   * .text\:\:\$rose500 {
   *   --text-opacity: 1;
   *   color: rgba(244, 63, 94, var(--text-opacity));
   * }
   * ```
   */
  $rose500: ClassName;
  /**
   * ```css
   * .text\:\:\$rose600 {
   *   --text-opacity: 1;
   *   color: rgba(225, 29, 72, var(--text-opacity));
   * }
   * ```
   */
  $rose600: ClassName;
  /**
   * ```css
   * .text\:\:\$rose700 {
   *   --text-opacity: 1;
   *   color: rgba(190, 18, 60, var(--text-opacity));
   * }
   * ```
   */
  $rose700: ClassName;
  /**
   * ```css
   * .text\:\:\$rose800 {
   *   --text-opacity: 1;
   *   color: rgba(159, 18, 57, var(--text-opacity));
   * }
   * ```
   */
  $rose800: ClassName;
  /**
   * ```css
   * .text\:\:\$rose900 {
   *   --text-opacity: 1;
   *   color: rgba(136, 19, 55, var(--text-opacity));
   * }
   * ```
   */
  $rose900: ClassName;
  /**
   * ```css
   * .text\:\:\$primary {
   *   --text-opacity: 1;
   *   color: var(--color-text-primary);
   * }
   * ```
   */
  $primary: ClassName;
  /**
   * ```css
   * .text\:\:\$secondary {
   *   --text-opacity: 1;
   *   color: var(--color-text-secondary);
   * }
   * ```
   */
  $secondary: ClassName;
  /**
   * ```css
   * .text\:\:\$text {
   *   --text-opacity: 1;
   *   color: var(--color-text-text);
   * }
   * ```
   */
  $text: ClassName;
  /**
   * ```css
   * .text\:\:\$background {
   *   --text-opacity: 1;
   *   color: var(--color-text-background);
   * }
   * ```
   */
  $background: ClassName;
  /**
   * ```css
   * .text\:\:\$border {
   *   --text-opacity: 1;
   *   color: var(--color-text-border);
   * }
   * ```
   */
  $border: ClassName;
  /**
   * ```css
   * .text\:\:\$media {
   *   --text-opacity: 1;
   *   color: var(--color-text-media);
   * }
   * ```
   */
  $media: ClassName;
}

interface BgAtomStyle {
  /**
   * ```css
   * .bg\:\:\$inherit {
   *   --bg-opacity: 1;
   *   color: inherit;
   * }
   * ```
   */
  $inherit: ClassName;
  /**
   * ```css
   * .bg\:\:\$current {
   *   --bg-opacity: 1;
   *   color: currentColor;
   * }
   * ```
   */
  $current: ClassName;
  /**
   * ```css
   * .bg\:\:\$transparent {
   *   --bg-opacity: 1;
   *   color: transparent;
   * }
   * ```
   */
  $transparent: ClassName;
  /**
   * ```css
   * .bg\:\:\$black {
   *   --bg-opacity: 1;
   *   color: rgba(0, 0, 0, var(--bg-opacity));
   * }
   * ```
   */
  $black: ClassName;
  /**
   * ```css
   * .bg\:\:\$white {
   *   --bg-opacity: 1;
   *   color: rgba(255, 255, 255, var(--bg-opacity));
   * }
   * ```
   */
  $white: ClassName;
  /**
   * ```css
   * .bg\:\:\$slate50 {
   *   --bg-opacity: 1;
   *   color: rgba(248, 250, 252, var(--bg-opacity));
   * }
   * ```
   */
  $slate50: ClassName;
  /**
   * ```css
   * .bg\:\:\$slate100 {
   *   --bg-opacity: 1;
   *   color: rgba(241, 245, 249, var(--bg-opacity));
   * }
   * ```
   */
  $slate100: ClassName;
  /**
   * ```css
   * .bg\:\:\$slate200 {
   *   --bg-opacity: 1;
   *   color: rgba(226, 232, 240, var(--bg-opacity));
   * }
   * ```
   */
  $slate200: ClassName;
  /**
   * ```css
   * .bg\:\:\$slate300 {
   *   --bg-opacity: 1;
   *   color: rgba(203, 213, 225, var(--bg-opacity));
   * }
   * ```
   */
  $slate300: ClassName;
  /**
   * ```css
   * .bg\:\:\$slate400 {
   *   --bg-opacity: 1;
   *   color: rgba(148, 163, 184, var(--bg-opacity));
   * }
   * ```
   */
  $slate400: ClassName;
  /**
   * ```css
   * .bg\:\:\$slate500 {
   *   --bg-opacity: 1;
   *   color: rgba(100, 116, 139, var(--bg-opacity));
   * }
   * ```
   */
  $slate500: ClassName;
  /**
   * ```css
   * .bg\:\:\$slate600 {
   *   --bg-opacity: 1;
   *   color: rgba(71, 85, 105, var(--bg-opacity));
   * }
   * ```
   */
  $slate600: ClassName;
  /**
   * ```css
   * .bg\:\:\$slate700 {
   *   --bg-opacity: 1;
   *   color: rgba(51, 65, 85, var(--bg-opacity));
   * }
   * ```
   */
  $slate700: ClassName;
  /**
   * ```css
   * .bg\:\:\$slate800 {
   *   --bg-opacity: 1;
   *   color: rgba(30, 41, 59, var(--bg-opacity));
   * }
   * ```
   */
  $slate800: ClassName;
  /**
   * ```css
   * .bg\:\:\$slate900 {
   *   --bg-opacity: 1;
   *   color: rgba(15, 23, 42, var(--bg-opacity));
   * }
   * ```
   */
  $slate900: ClassName;
  /**
   * ```css
   * .bg\:\:\$gray50 {
   *   --bg-opacity: 1;
   *   color: rgba(249, 250, 251, var(--bg-opacity));
   * }
   * ```
   */
  $gray50: ClassName;
  /**
   * ```css
   * .bg\:\:\$gray100 {
   *   --bg-opacity: 1;
   *   color: rgba(243, 244, 246, var(--bg-opacity));
   * }
   * ```
   */
  $gray100: ClassName;
  /**
   * ```css
   * .bg\:\:\$gray200 {
   *   --bg-opacity: 1;
   *   color: rgba(229, 231, 235, var(--bg-opacity));
   * }
   * ```
   */
  $gray200: ClassName;
  /**
   * ```css
   * .bg\:\:\$gray300 {
   *   --bg-opacity: 1;
   *   color: rgba(209, 213, 219, var(--bg-opacity));
   * }
   * ```
   */
  $gray300: ClassName;
  /**
   * ```css
   * .bg\:\:\$gray400 {
   *   --bg-opacity: 1;
   *   color: rgba(156, 163, 175, var(--bg-opacity));
   * }
   * ```
   */
  $gray400: ClassName;
  /**
   * ```css
   * .bg\:\:\$gray500 {
   *   --bg-opacity: 1;
   *   color: rgba(107, 114, 128, var(--bg-opacity));
   * }
   * ```
   */
  $gray500: ClassName;
  /**
   * ```css
   * .bg\:\:\$gray600 {
   *   --bg-opacity: 1;
   *   color: rgba(75, 85, 99, var(--bg-opacity));
   * }
   * ```
   */
  $gray600: ClassName;
  /**
   * ```css
   * .bg\:\:\$gray700 {
   *   --bg-opacity: 1;
   *   color: rgba(55, 65, 81, var(--bg-opacity));
   * }
   * ```
   */
  $gray700: ClassName;
  /**
   * ```css
   * .bg\:\:\$gray800 {
   *   --bg-opacity: 1;
   *   color: rgba(31, 41, 55, var(--bg-opacity));
   * }
   * ```
   */
  $gray800: ClassName;
  /**
   * ```css
   * .bg\:\:\$gray900 {
   *   --bg-opacity: 1;
   *   color: rgba(17, 24, 39, var(--bg-opacity));
   * }
   * ```
   */
  $gray900: ClassName;
  /**
   * ```css
   * .bg\:\:\$zinc50 {
   *   --bg-opacity: 1;
   *   color: rgba(250, 250, 250, var(--bg-opacity));
   * }
   * ```
   */
  $zinc50: ClassName;
  /**
   * ```css
   * .bg\:\:\$zinc100 {
   *   --bg-opacity: 1;
   *   color: rgba(244, 244, 245, var(--bg-opacity));
   * }
   * ```
   */
  $zinc100: ClassName;
  /**
   * ```css
   * .bg\:\:\$zinc200 {
   *   --bg-opacity: 1;
   *   color: rgba(228, 228, 231, var(--bg-opacity));
   * }
   * ```
   */
  $zinc200: ClassName;
  /**
   * ```css
   * .bg\:\:\$zinc300 {
   *   --bg-opacity: 1;
   *   color: rgba(212, 212, 216, var(--bg-opacity));
   * }
   * ```
   */
  $zinc300: ClassName;
  /**
   * ```css
   * .bg\:\:\$zinc400 {
   *   --bg-opacity: 1;
   *   color: rgba(161, 161, 170, var(--bg-opacity));
   * }
   * ```
   */
  $zinc400: ClassName;
  /**
   * ```css
   * .bg\:\:\$zinc500 {
   *   --bg-opacity: 1;
   *   color: rgba(113, 113, 122, var(--bg-opacity));
   * }
   * ```
   */
  $zinc500: ClassName;
  /**
   * ```css
   * .bg\:\:\$zinc600 {
   *   --bg-opacity: 1;
   *   color: rgba(82, 82, 91, var(--bg-opacity));
   * }
   * ```
   */
  $zinc600: ClassName;
  /**
   * ```css
   * .bg\:\:\$zinc700 {
   *   --bg-opacity: 1;
   *   color: rgba(63, 63, 70, var(--bg-opacity));
   * }
   * ```
   */
  $zinc700: ClassName;
  /**
   * ```css
   * .bg\:\:\$zinc800 {
   *   --bg-opacity: 1;
   *   color: rgba(39, 39, 42, var(--bg-opacity));
   * }
   * ```
   */
  $zinc800: ClassName;
  /**
   * ```css
   * .bg\:\:\$zinc900 {
   *   --bg-opacity: 1;
   *   color: rgba(24, 24, 27, var(--bg-opacity));
   * }
   * ```
   */
  $zinc900: ClassName;
  /**
   * ```css
   * .bg\:\:\$neutral50 {
   *   --bg-opacity: 1;
   *   color: rgba(250, 250, 250, var(--bg-opacity));
   * }
   * ```
   */
  $neutral50: ClassName;
  /**
   * ```css
   * .bg\:\:\$neutral100 {
   *   --bg-opacity: 1;
   *   color: rgba(245, 245, 245, var(--bg-opacity));
   * }
   * ```
   */
  $neutral100: ClassName;
  /**
   * ```css
   * .bg\:\:\$neutral200 {
   *   --bg-opacity: 1;
   *   color: rgba(229, 229, 229, var(--bg-opacity));
   * }
   * ```
   */
  $neutral200: ClassName;
  /**
   * ```css
   * .bg\:\:\$neutral300 {
   *   --bg-opacity: 1;
   *   color: rgba(212, 212, 212, var(--bg-opacity));
   * }
   * ```
   */
  $neutral300: ClassName;
  /**
   * ```css
   * .bg\:\:\$neutral400 {
   *   --bg-opacity: 1;
   *   color: rgba(163, 163, 163, var(--bg-opacity));
   * }
   * ```
   */
  $neutral400: ClassName;
  /**
   * ```css
   * .bg\:\:\$neutral500 {
   *   --bg-opacity: 1;
   *   color: rgba(115, 115, 115, var(--bg-opacity));
   * }
   * ```
   */
  $neutral500: ClassName;
  /**
   * ```css
   * .bg\:\:\$neutral600 {
   *   --bg-opacity: 1;
   *   color: rgba(82, 82, 82, var(--bg-opacity));
   * }
   * ```
   */
  $neutral600: ClassName;
  /**
   * ```css
   * .bg\:\:\$neutral700 {
   *   --bg-opacity: 1;
   *   color: rgba(64, 64, 64, var(--bg-opacity));
   * }
   * ```
   */
  $neutral700: ClassName;
  /**
   * ```css
   * .bg\:\:\$neutral800 {
   *   --bg-opacity: 1;
   *   color: rgba(38, 38, 38, var(--bg-opacity));
   * }
   * ```
   */
  $neutral800: ClassName;
  /**
   * ```css
   * .bg\:\:\$neutral900 {
   *   --bg-opacity: 1;
   *   color: rgba(23, 23, 23, var(--bg-opacity));
   * }
   * ```
   */
  $neutral900: ClassName;
  /**
   * ```css
   * .bg\:\:\$stone50 {
   *   --bg-opacity: 1;
   *   color: rgba(250, 250, 249, var(--bg-opacity));
   * }
   * ```
   */
  $stone50: ClassName;
  /**
   * ```css
   * .bg\:\:\$stone100 {
   *   --bg-opacity: 1;
   *   color: rgba(245, 245, 244, var(--bg-opacity));
   * }
   * ```
   */
  $stone100: ClassName;
  /**
   * ```css
   * .bg\:\:\$stone200 {
   *   --bg-opacity: 1;
   *   color: rgba(231, 229, 228, var(--bg-opacity));
   * }
   * ```
   */
  $stone200: ClassName;
  /**
   * ```css
   * .bg\:\:\$stone300 {
   *   --bg-opacity: 1;
   *   color: rgba(214, 211, 209, var(--bg-opacity));
   * }
   * ```
   */
  $stone300: ClassName;
  /**
   * ```css
   * .bg\:\:\$stone400 {
   *   --bg-opacity: 1;
   *   color: rgba(168, 162, 158, var(--bg-opacity));
   * }
   * ```
   */
  $stone400: ClassName;
  /**
   * ```css
   * .bg\:\:\$stone500 {
   *   --bg-opacity: 1;
   *   color: rgba(120, 113, 108, var(--bg-opacity));
   * }
   * ```
   */
  $stone500: ClassName;
  /**
   * ```css
   * .bg\:\:\$stone600 {
   *   --bg-opacity: 1;
   *   color: rgba(87, 83, 78, var(--bg-opacity));
   * }
   * ```
   */
  $stone600: ClassName;
  /**
   * ```css
   * .bg\:\:\$stone700 {
   *   --bg-opacity: 1;
   *   color: rgba(68, 64, 60, var(--bg-opacity));
   * }
   * ```
   */
  $stone700: ClassName;
  /**
   * ```css
   * .bg\:\:\$stone800 {
   *   --bg-opacity: 1;
   *   color: rgba(41, 37, 36, var(--bg-opacity));
   * }
   * ```
   */
  $stone800: ClassName;
  /**
   * ```css
   * .bg\:\:\$stone900 {
   *   --bg-opacity: 1;
   *   color: rgba(28, 25, 23, var(--bg-opacity));
   * }
   * ```
   */
  $stone900: ClassName;
  /**
   * ```css
   * .bg\:\:\$red50 {
   *   --bg-opacity: 1;
   *   color: rgba(254, 242, 242, var(--bg-opacity));
   * }
   * ```
   */
  $red50: ClassName;
  /**
   * ```css
   * .bg\:\:\$red100 {
   *   --bg-opacity: 1;
   *   color: rgba(254, 226, 226, var(--bg-opacity));
   * }
   * ```
   */
  $red100: ClassName;
  /**
   * ```css
   * .bg\:\:\$red200 {
   *   --bg-opacity: 1;
   *   color: rgba(254, 202, 202, var(--bg-opacity));
   * }
   * ```
   */
  $red200: ClassName;
  /**
   * ```css
   * .bg\:\:\$red300 {
   *   --bg-opacity: 1;
   *   color: rgba(252, 165, 165, var(--bg-opacity));
   * }
   * ```
   */
  $red300: ClassName;
  /**
   * ```css
   * .bg\:\:\$red400 {
   *   --bg-opacity: 1;
   *   color: rgba(248, 113, 113, var(--bg-opacity));
   * }
   * ```
   */
  $red400: ClassName;
  /**
   * ```css
   * .bg\:\:\$red500 {
   *   --bg-opacity: 1;
   *   color: rgba(239, 68, 68, var(--bg-opacity));
   * }
   * ```
   */
  $red500: ClassName;
  /**
   * ```css
   * .bg\:\:\$red600 {
   *   --bg-opacity: 1;
   *   color: rgba(220, 38, 38, var(--bg-opacity));
   * }
   * ```
   */
  $red600: ClassName;
  /**
   * ```css
   * .bg\:\:\$red700 {
   *   --bg-opacity: 1;
   *   color: rgba(185, 28, 28, var(--bg-opacity));
   * }
   * ```
   */
  $red700: ClassName;
  /**
   * ```css
   * .bg\:\:\$red800 {
   *   --bg-opacity: 1;
   *   color: rgba(153, 27, 27, var(--bg-opacity));
   * }
   * ```
   */
  $red800: ClassName;
  /**
   * ```css
   * .bg\:\:\$red900 {
   *   --bg-opacity: 1;
   *   color: rgba(127, 29, 29, var(--bg-opacity));
   * }
   * ```
   */
  $red900: ClassName;
  /**
   * ```css
   * .bg\:\:\$orange50 {
   *   --bg-opacity: 1;
   *   color: rgba(255, 247, 237, var(--bg-opacity));
   * }
   * ```
   */
  $orange50: ClassName;
  /**
   * ```css
   * .bg\:\:\$orange100 {
   *   --bg-opacity: 1;
   *   color: rgba(255, 237, 213, var(--bg-opacity));
   * }
   * ```
   */
  $orange100: ClassName;
  /**
   * ```css
   * .bg\:\:\$orange200 {
   *   --bg-opacity: 1;
   *   color: rgba(254, 215, 170, var(--bg-opacity));
   * }
   * ```
   */
  $orange200: ClassName;
  /**
   * ```css
   * .bg\:\:\$orange300 {
   *   --bg-opacity: 1;
   *   color: rgba(253, 186, 116, var(--bg-opacity));
   * }
   * ```
   */
  $orange300: ClassName;
  /**
   * ```css
   * .bg\:\:\$orange400 {
   *   --bg-opacity: 1;
   *   color: rgba(251, 146, 60, var(--bg-opacity));
   * }
   * ```
   */
  $orange400: ClassName;
  /**
   * ```css
   * .bg\:\:\$orange500 {
   *   --bg-opacity: 1;
   *   color: rgba(249, 115, 22, var(--bg-opacity));
   * }
   * ```
   */
  $orange500: ClassName;
  /**
   * ```css
   * .bg\:\:\$orange600 {
   *   --bg-opacity: 1;
   *   color: rgba(234, 88, 12, var(--bg-opacity));
   * }
   * ```
   */
  $orange600: ClassName;
  /**
   * ```css
   * .bg\:\:\$orange700 {
   *   --bg-opacity: 1;
   *   color: rgba(194, 65, 12, var(--bg-opacity));
   * }
   * ```
   */
  $orange700: ClassName;
  /**
   * ```css
   * .bg\:\:\$orange800 {
   *   --bg-opacity: 1;
   *   color: rgba(154, 52, 18, var(--bg-opacity));
   * }
   * ```
   */
  $orange800: ClassName;
  /**
   * ```css
   * .bg\:\:\$orange900 {
   *   --bg-opacity: 1;
   *   color: rgba(124, 45, 18, var(--bg-opacity));
   * }
   * ```
   */
  $orange900: ClassName;
  /**
   * ```css
   * .bg\:\:\$amber50 {
   *   --bg-opacity: 1;
   *   color: rgba(255, 251, 235, var(--bg-opacity));
   * }
   * ```
   */
  $amber50: ClassName;
  /**
   * ```css
   * .bg\:\:\$amber100 {
   *   --bg-opacity: 1;
   *   color: rgba(254, 243, 199, var(--bg-opacity));
   * }
   * ```
   */
  $amber100: ClassName;
  /**
   * ```css
   * .bg\:\:\$amber200 {
   *   --bg-opacity: 1;
   *   color: rgba(253, 230, 138, var(--bg-opacity));
   * }
   * ```
   */
  $amber200: ClassName;
  /**
   * ```css
   * .bg\:\:\$amber300 {
   *   --bg-opacity: 1;
   *   color: rgba(252, 211, 77, var(--bg-opacity));
   * }
   * ```
   */
  $amber300: ClassName;
  /**
   * ```css
   * .bg\:\:\$amber400 {
   *   --bg-opacity: 1;
   *   color: rgba(251, 191, 36, var(--bg-opacity));
   * }
   * ```
   */
  $amber400: ClassName;
  /**
   * ```css
   * .bg\:\:\$amber500 {
   *   --bg-opacity: 1;
   *   color: rgba(245, 158, 11, var(--bg-opacity));
   * }
   * ```
   */
  $amber500: ClassName;
  /**
   * ```css
   * .bg\:\:\$amber600 {
   *   --bg-opacity: 1;
   *   color: rgba(217, 119, 6, var(--bg-opacity));
   * }
   * ```
   */
  $amber600: ClassName;
  /**
   * ```css
   * .bg\:\:\$amber700 {
   *   --bg-opacity: 1;
   *   color: rgba(180, 83, 9, var(--bg-opacity));
   * }
   * ```
   */
  $amber700: ClassName;
  /**
   * ```css
   * .bg\:\:\$amber800 {
   *   --bg-opacity: 1;
   *   color: rgba(146, 64, 14, var(--bg-opacity));
   * }
   * ```
   */
  $amber800: ClassName;
  /**
   * ```css
   * .bg\:\:\$amber900 {
   *   --bg-opacity: 1;
   *   color: rgba(120, 53, 15, var(--bg-opacity));
   * }
   * ```
   */
  $amber900: ClassName;
  /**
   * ```css
   * .bg\:\:\$yellow50 {
   *   --bg-opacity: 1;
   *   color: rgba(254, 252, 232, var(--bg-opacity));
   * }
   * ```
   */
  $yellow50: ClassName;
  /**
   * ```css
   * .bg\:\:\$yellow100 {
   *   --bg-opacity: 1;
   *   color: rgba(254, 249, 195, var(--bg-opacity));
   * }
   * ```
   */
  $yellow100: ClassName;
  /**
   * ```css
   * .bg\:\:\$yellow200 {
   *   --bg-opacity: 1;
   *   color: rgba(254, 240, 138, var(--bg-opacity));
   * }
   * ```
   */
  $yellow200: ClassName;
  /**
   * ```css
   * .bg\:\:\$yellow300 {
   *   --bg-opacity: 1;
   *   color: rgba(253, 224, 71, var(--bg-opacity));
   * }
   * ```
   */
  $yellow300: ClassName;
  /**
   * ```css
   * .bg\:\:\$yellow400 {
   *   --bg-opacity: 1;
   *   color: rgba(250, 204, 21, var(--bg-opacity));
   * }
   * ```
   */
  $yellow400: ClassName;
  /**
   * ```css
   * .bg\:\:\$yellow500 {
   *   --bg-opacity: 1;
   *   color: rgba(234, 179, 8, var(--bg-opacity));
   * }
   * ```
   */
  $yellow500: ClassName;
  /**
   * ```css
   * .bg\:\:\$yellow600 {
   *   --bg-opacity: 1;
   *   color: rgba(202, 138, 4, var(--bg-opacity));
   * }
   * ```
   */
  $yellow600: ClassName;
  /**
   * ```css
   * .bg\:\:\$yellow700 {
   *   --bg-opacity: 1;
   *   color: rgba(161, 98, 7, var(--bg-opacity));
   * }
   * ```
   */
  $yellow700: ClassName;
  /**
   * ```css
   * .bg\:\:\$yellow800 {
   *   --bg-opacity: 1;
   *   color: rgba(133, 77, 14, var(--bg-opacity));
   * }
   * ```
   */
  $yellow800: ClassName;
  /**
   * ```css
   * .bg\:\:\$yellow900 {
   *   --bg-opacity: 1;
   *   color: rgba(113, 63, 18, var(--bg-opacity));
   * }
   * ```
   */
  $yellow900: ClassName;
  /**
   * ```css
   * .bg\:\:\$lime50 {
   *   --bg-opacity: 1;
   *   color: rgba(247, 254, 231, var(--bg-opacity));
   * }
   * ```
   */
  $lime50: ClassName;
  /**
   * ```css
   * .bg\:\:\$lime100 {
   *   --bg-opacity: 1;
   *   color: rgba(236, 252, 203, var(--bg-opacity));
   * }
   * ```
   */
  $lime100: ClassName;
  /**
   * ```css
   * .bg\:\:\$lime200 {
   *   --bg-opacity: 1;
   *   color: rgba(217, 249, 157, var(--bg-opacity));
   * }
   * ```
   */
  $lime200: ClassName;
  /**
   * ```css
   * .bg\:\:\$lime300 {
   *   --bg-opacity: 1;
   *   color: rgba(190, 242, 100, var(--bg-opacity));
   * }
   * ```
   */
  $lime300: ClassName;
  /**
   * ```css
   * .bg\:\:\$lime400 {
   *   --bg-opacity: 1;
   *   color: rgba(163, 230, 53, var(--bg-opacity));
   * }
   * ```
   */
  $lime400: ClassName;
  /**
   * ```css
   * .bg\:\:\$lime500 {
   *   --bg-opacity: 1;
   *   color: rgba(132, 204, 22, var(--bg-opacity));
   * }
   * ```
   */
  $lime500: ClassName;
  /**
   * ```css
   * .bg\:\:\$lime600 {
   *   --bg-opacity: 1;
   *   color: rgba(101, 163, 13, var(--bg-opacity));
   * }
   * ```
   */
  $lime600: ClassName;
  /**
   * ```css
   * .bg\:\:\$lime700 {
   *   --bg-opacity: 1;
   *   color: rgba(77, 124, 15, var(--bg-opacity));
   * }
   * ```
   */
  $lime700: ClassName;
  /**
   * ```css
   * .bg\:\:\$lime800 {
   *   --bg-opacity: 1;
   *   color: rgba(63, 98, 18, var(--bg-opacity));
   * }
   * ```
   */
  $lime800: ClassName;
  /**
   * ```css
   * .bg\:\:\$lime900 {
   *   --bg-opacity: 1;
   *   color: rgba(54, 83, 20, var(--bg-opacity));
   * }
   * ```
   */
  $lime900: ClassName;
  /**
   * ```css
   * .bg\:\:\$green50 {
   *   --bg-opacity: 1;
   *   color: rgba(240, 253, 244, var(--bg-opacity));
   * }
   * ```
   */
  $green50: ClassName;
  /**
   * ```css
   * .bg\:\:\$green100 {
   *   --bg-opacity: 1;
   *   color: rgba(220, 252, 231, var(--bg-opacity));
   * }
   * ```
   */
  $green100: ClassName;
  /**
   * ```css
   * .bg\:\:\$green200 {
   *   --bg-opacity: 1;
   *   color: rgba(187, 247, 208, var(--bg-opacity));
   * }
   * ```
   */
  $green200: ClassName;
  /**
   * ```css
   * .bg\:\:\$green300 {
   *   --bg-opacity: 1;
   *   color: rgba(134, 239, 172, var(--bg-opacity));
   * }
   * ```
   */
  $green300: ClassName;
  /**
   * ```css
   * .bg\:\:\$green400 {
   *   --bg-opacity: 1;
   *   color: rgba(74, 222, 128, var(--bg-opacity));
   * }
   * ```
   */
  $green400: ClassName;
  /**
   * ```css
   * .bg\:\:\$green500 {
   *   --bg-opacity: 1;
   *   color: rgba(34, 197, 94, var(--bg-opacity));
   * }
   * ```
   */
  $green500: ClassName;
  /**
   * ```css
   * .bg\:\:\$green600 {
   *   --bg-opacity: 1;
   *   color: rgba(22, 163, 74, var(--bg-opacity));
   * }
   * ```
   */
  $green600: ClassName;
  /**
   * ```css
   * .bg\:\:\$green700 {
   *   --bg-opacity: 1;
   *   color: rgba(21, 128, 61, var(--bg-opacity));
   * }
   * ```
   */
  $green700: ClassName;
  /**
   * ```css
   * .bg\:\:\$green800 {
   *   --bg-opacity: 1;
   *   color: rgba(22, 101, 52, var(--bg-opacity));
   * }
   * ```
   */
  $green800: ClassName;
  /**
   * ```css
   * .bg\:\:\$green900 {
   *   --bg-opacity: 1;
   *   color: rgba(20, 83, 45, var(--bg-opacity));
   * }
   * ```
   */
  $green900: ClassName;
  /**
   * ```css
   * .bg\:\:\$emerald50 {
   *   --bg-opacity: 1;
   *   color: rgba(236, 253, 245, var(--bg-opacity));
   * }
   * ```
   */
  $emerald50: ClassName;
  /**
   * ```css
   * .bg\:\:\$emerald100 {
   *   --bg-opacity: 1;
   *   color: rgba(209, 250, 229, var(--bg-opacity));
   * }
   * ```
   */
  $emerald100: ClassName;
  /**
   * ```css
   * .bg\:\:\$emerald200 {
   *   --bg-opacity: 1;
   *   color: rgba(167, 243, 208, var(--bg-opacity));
   * }
   * ```
   */
  $emerald200: ClassName;
  /**
   * ```css
   * .bg\:\:\$emerald300 {
   *   --bg-opacity: 1;
   *   color: rgba(110, 231, 183, var(--bg-opacity));
   * }
   * ```
   */
  $emerald300: ClassName;
  /**
   * ```css
   * .bg\:\:\$emerald400 {
   *   --bg-opacity: 1;
   *   color: rgba(52, 211, 153, var(--bg-opacity));
   * }
   * ```
   */
  $emerald400: ClassName;
  /**
   * ```css
   * .bg\:\:\$emerald500 {
   *   --bg-opacity: 1;
   *   color: rgba(16, 185, 129, var(--bg-opacity));
   * }
   * ```
   */
  $emerald500: ClassName;
  /**
   * ```css
   * .bg\:\:\$emerald600 {
   *   --bg-opacity: 1;
   *   color: rgba(5, 150, 105, var(--bg-opacity));
   * }
   * ```
   */
  $emerald600: ClassName;
  /**
   * ```css
   * .bg\:\:\$emerald700 {
   *   --bg-opacity: 1;
   *   color: rgba(4, 120, 87, var(--bg-opacity));
   * }
   * ```
   */
  $emerald700: ClassName;
  /**
   * ```css
   * .bg\:\:\$emerald800 {
   *   --bg-opacity: 1;
   *   color: rgba(6, 95, 70, var(--bg-opacity));
   * }
   * ```
   */
  $emerald800: ClassName;
  /**
   * ```css
   * .bg\:\:\$emerald900 {
   *   --bg-opacity: 1;
   *   color: rgba(6, 78, 59, var(--bg-opacity));
   * }
   * ```
   */
  $emerald900: ClassName;
  /**
   * ```css
   * .bg\:\:\$teal50 {
   *   --bg-opacity: 1;
   *   color: rgba(240, 253, 250, var(--bg-opacity));
   * }
   * ```
   */
  $teal50: ClassName;
  /**
   * ```css
   * .bg\:\:\$teal100 {
   *   --bg-opacity: 1;
   *   color: rgba(204, 251, 241, var(--bg-opacity));
   * }
   * ```
   */
  $teal100: ClassName;
  /**
   * ```css
   * .bg\:\:\$teal200 {
   *   --bg-opacity: 1;
   *   color: rgba(153, 246, 228, var(--bg-opacity));
   * }
   * ```
   */
  $teal200: ClassName;
  /**
   * ```css
   * .bg\:\:\$teal300 {
   *   --bg-opacity: 1;
   *   color: rgba(94, 234, 212, var(--bg-opacity));
   * }
   * ```
   */
  $teal300: ClassName;
  /**
   * ```css
   * .bg\:\:\$teal400 {
   *   --bg-opacity: 1;
   *   color: rgba(45, 212, 191, var(--bg-opacity));
   * }
   * ```
   */
  $teal400: ClassName;
  /**
   * ```css
   * .bg\:\:\$teal500 {
   *   --bg-opacity: 1;
   *   color: rgba(20, 184, 166, var(--bg-opacity));
   * }
   * ```
   */
  $teal500: ClassName;
  /**
   * ```css
   * .bg\:\:\$teal600 {
   *   --bg-opacity: 1;
   *   color: rgba(13, 148, 136, var(--bg-opacity));
   * }
   * ```
   */
  $teal600: ClassName;
  /**
   * ```css
   * .bg\:\:\$teal700 {
   *   --bg-opacity: 1;
   *   color: rgba(15, 118, 110, var(--bg-opacity));
   * }
   * ```
   */
  $teal700: ClassName;
  /**
   * ```css
   * .bg\:\:\$teal800 {
   *   --bg-opacity: 1;
   *   color: rgba(17, 94, 89, var(--bg-opacity));
   * }
   * ```
   */
  $teal800: ClassName;
  /**
   * ```css
   * .bg\:\:\$teal900 {
   *   --bg-opacity: 1;
   *   color: rgba(19, 78, 74, var(--bg-opacity));
   * }
   * ```
   */
  $teal900: ClassName;
  /**
   * ```css
   * .bg\:\:\$cyan50 {
   *   --bg-opacity: 1;
   *   color: rgba(236, 254, 255, var(--bg-opacity));
   * }
   * ```
   */
  $cyan50: ClassName;
  /**
   * ```css
   * .bg\:\:\$cyan100 {
   *   --bg-opacity: 1;
   *   color: rgba(207, 250, 254, var(--bg-opacity));
   * }
   * ```
   */
  $cyan100: ClassName;
  /**
   * ```css
   * .bg\:\:\$cyan200 {
   *   --bg-opacity: 1;
   *   color: rgba(165, 243, 252, var(--bg-opacity));
   * }
   * ```
   */
  $cyan200: ClassName;
  /**
   * ```css
   * .bg\:\:\$cyan300 {
   *   --bg-opacity: 1;
   *   color: rgba(103, 232, 249, var(--bg-opacity));
   * }
   * ```
   */
  $cyan300: ClassName;
  /**
   * ```css
   * .bg\:\:\$cyan400 {
   *   --bg-opacity: 1;
   *   color: rgba(34, 211, 238, var(--bg-opacity));
   * }
   * ```
   */
  $cyan400: ClassName;
  /**
   * ```css
   * .bg\:\:\$cyan500 {
   *   --bg-opacity: 1;
   *   color: rgba(6, 182, 212, var(--bg-opacity));
   * }
   * ```
   */
  $cyan500: ClassName;
  /**
   * ```css
   * .bg\:\:\$cyan600 {
   *   --bg-opacity: 1;
   *   color: rgba(8, 145, 178, var(--bg-opacity));
   * }
   * ```
   */
  $cyan600: ClassName;
  /**
   * ```css
   * .bg\:\:\$cyan700 {
   *   --bg-opacity: 1;
   *   color: rgba(14, 116, 144, var(--bg-opacity));
   * }
   * ```
   */
  $cyan700: ClassName;
  /**
   * ```css
   * .bg\:\:\$cyan800 {
   *   --bg-opacity: 1;
   *   color: rgba(21, 94, 117, var(--bg-opacity));
   * }
   * ```
   */
  $cyan800: ClassName;
  /**
   * ```css
   * .bg\:\:\$cyan900 {
   *   --bg-opacity: 1;
   *   color: rgba(22, 78, 99, var(--bg-opacity));
   * }
   * ```
   */
  $cyan900: ClassName;
  /**
   * ```css
   * .bg\:\:\$sky50 {
   *   --bg-opacity: 1;
   *   color: rgba(240, 249, 255, var(--bg-opacity));
   * }
   * ```
   */
  $sky50: ClassName;
  /**
   * ```css
   * .bg\:\:\$sky100 {
   *   --bg-opacity: 1;
   *   color: rgba(224, 242, 254, var(--bg-opacity));
   * }
   * ```
   */
  $sky100: ClassName;
  /**
   * ```css
   * .bg\:\:\$sky200 {
   *   --bg-opacity: 1;
   *   color: rgba(186, 230, 253, var(--bg-opacity));
   * }
   * ```
   */
  $sky200: ClassName;
  /**
   * ```css
   * .bg\:\:\$sky300 {
   *   --bg-opacity: 1;
   *   color: rgba(125, 211, 252, var(--bg-opacity));
   * }
   * ```
   */
  $sky300: ClassName;
  /**
   * ```css
   * .bg\:\:\$sky400 {
   *   --bg-opacity: 1;
   *   color: rgba(56, 189, 248, var(--bg-opacity));
   * }
   * ```
   */
  $sky400: ClassName;
  /**
   * ```css
   * .bg\:\:\$sky500 {
   *   --bg-opacity: 1;
   *   color: rgba(14, 165, 233, var(--bg-opacity));
   * }
   * ```
   */
  $sky500: ClassName;
  /**
   * ```css
   * .bg\:\:\$sky600 {
   *   --bg-opacity: 1;
   *   color: rgba(2, 132, 199, var(--bg-opacity));
   * }
   * ```
   */
  $sky600: ClassName;
  /**
   * ```css
   * .bg\:\:\$sky700 {
   *   --bg-opacity: 1;
   *   color: rgba(3, 105, 161, var(--bg-opacity));
   * }
   * ```
   */
  $sky700: ClassName;
  /**
   * ```css
   * .bg\:\:\$sky800 {
   *   --bg-opacity: 1;
   *   color: rgba(7, 89, 133, var(--bg-opacity));
   * }
   * ```
   */
  $sky800: ClassName;
  /**
   * ```css
   * .bg\:\:\$sky900 {
   *   --bg-opacity: 1;
   *   color: rgba(12, 74, 110, var(--bg-opacity));
   * }
   * ```
   */
  $sky900: ClassName;
  /**
   * ```css
   * .bg\:\:\$blue50 {
   *   --bg-opacity: 1;
   *   color: rgba(239, 246, 255, var(--bg-opacity));
   * }
   * ```
   */
  $blue50: ClassName;
  /**
   * ```css
   * .bg\:\:\$blue100 {
   *   --bg-opacity: 1;
   *   color: rgba(219, 234, 254, var(--bg-opacity));
   * }
   * ```
   */
  $blue100: ClassName;
  /**
   * ```css
   * .bg\:\:\$blue200 {
   *   --bg-opacity: 1;
   *   color: rgba(191, 219, 254, var(--bg-opacity));
   * }
   * ```
   */
  $blue200: ClassName;
  /**
   * ```css
   * .bg\:\:\$blue300 {
   *   --bg-opacity: 1;
   *   color: rgba(147, 197, 253, var(--bg-opacity));
   * }
   * ```
   */
  $blue300: ClassName;
  /**
   * ```css
   * .bg\:\:\$blue400 {
   *   --bg-opacity: 1;
   *   color: rgba(96, 165, 250, var(--bg-opacity));
   * }
   * ```
   */
  $blue400: ClassName;
  /**
   * ```css
   * .bg\:\:\$blue500 {
   *   --bg-opacity: 1;
   *   color: rgba(59, 130, 246, var(--bg-opacity));
   * }
   * ```
   */
  $blue500: ClassName;
  /**
   * ```css
   * .bg\:\:\$blue600 {
   *   --bg-opacity: 1;
   *   color: rgba(37, 99, 235, var(--bg-opacity));
   * }
   * ```
   */
  $blue600: ClassName;
  /**
   * ```css
   * .bg\:\:\$blue700 {
   *   --bg-opacity: 1;
   *   color: rgba(29, 78, 216, var(--bg-opacity));
   * }
   * ```
   */
  $blue700: ClassName;
  /**
   * ```css
   * .bg\:\:\$blue800 {
   *   --bg-opacity: 1;
   *   color: rgba(30, 64, 175, var(--bg-opacity));
   * }
   * ```
   */
  $blue800: ClassName;
  /**
   * ```css
   * .bg\:\:\$blue900 {
   *   --bg-opacity: 1;
   *   color: rgba(30, 58, 138, var(--bg-opacity));
   * }
   * ```
   */
  $blue900: ClassName;
  /**
   * ```css
   * .bg\:\:\$indigo50 {
   *   --bg-opacity: 1;
   *   color: rgba(238, 242, 255, var(--bg-opacity));
   * }
   * ```
   */
  $indigo50: ClassName;
  /**
   * ```css
   * .bg\:\:\$indigo100 {
   *   --bg-opacity: 1;
   *   color: rgba(224, 231, 255, var(--bg-opacity));
   * }
   * ```
   */
  $indigo100: ClassName;
  /**
   * ```css
   * .bg\:\:\$indigo200 {
   *   --bg-opacity: 1;
   *   color: rgba(199, 210, 254, var(--bg-opacity));
   * }
   * ```
   */
  $indigo200: ClassName;
  /**
   * ```css
   * .bg\:\:\$indigo300 {
   *   --bg-opacity: 1;
   *   color: rgba(165, 180, 252, var(--bg-opacity));
   * }
   * ```
   */
  $indigo300: ClassName;
  /**
   * ```css
   * .bg\:\:\$indigo400 {
   *   --bg-opacity: 1;
   *   color: rgba(129, 140, 248, var(--bg-opacity));
   * }
   * ```
   */
  $indigo400: ClassName;
  /**
   * ```css
   * .bg\:\:\$indigo500 {
   *   --bg-opacity: 1;
   *   color: rgba(99, 102, 241, var(--bg-opacity));
   * }
   * ```
   */
  $indigo500: ClassName;
  /**
   * ```css
   * .bg\:\:\$indigo600 {
   *   --bg-opacity: 1;
   *   color: rgba(79, 70, 229, var(--bg-opacity));
   * }
   * ```
   */
  $indigo600: ClassName;
  /**
   * ```css
   * .bg\:\:\$indigo700 {
   *   --bg-opacity: 1;
   *   color: rgba(67, 56, 202, var(--bg-opacity));
   * }
   * ```
   */
  $indigo700: ClassName;
  /**
   * ```css
   * .bg\:\:\$indigo800 {
   *   --bg-opacity: 1;
   *   color: rgba(55, 48, 163, var(--bg-opacity));
   * }
   * ```
   */
  $indigo800: ClassName;
  /**
   * ```css
   * .bg\:\:\$indigo900 {
   *   --bg-opacity: 1;
   *   color: rgba(49, 46, 129, var(--bg-opacity));
   * }
   * ```
   */
  $indigo900: ClassName;
  /**
   * ```css
   * .bg\:\:\$violet50 {
   *   --bg-opacity: 1;
   *   color: rgba(245, 243, 255, var(--bg-opacity));
   * }
   * ```
   */
  $violet50: ClassName;
  /**
   * ```css
   * .bg\:\:\$violet100 {
   *   --bg-opacity: 1;
   *   color: rgba(237, 233, 254, var(--bg-opacity));
   * }
   * ```
   */
  $violet100: ClassName;
  /**
   * ```css
   * .bg\:\:\$violet200 {
   *   --bg-opacity: 1;
   *   color: rgba(221, 214, 254, var(--bg-opacity));
   * }
   * ```
   */
  $violet200: ClassName;
  /**
   * ```css
   * .bg\:\:\$violet300 {
   *   --bg-opacity: 1;
   *   color: rgba(196, 181, 253, var(--bg-opacity));
   * }
   * ```
   */
  $violet300: ClassName;
  /**
   * ```css
   * .bg\:\:\$violet400 {
   *   --bg-opacity: 1;
   *   color: rgba(167, 139, 250, var(--bg-opacity));
   * }
   * ```
   */
  $violet400: ClassName;
  /**
   * ```css
   * .bg\:\:\$violet500 {
   *   --bg-opacity: 1;
   *   color: rgba(139, 92, 246, var(--bg-opacity));
   * }
   * ```
   */
  $violet500: ClassName;
  /**
   * ```css
   * .bg\:\:\$violet600 {
   *   --bg-opacity: 1;
   *   color: rgba(124, 58, 237, var(--bg-opacity));
   * }
   * ```
   */
  $violet600: ClassName;
  /**
   * ```css
   * .bg\:\:\$violet700 {
   *   --bg-opacity: 1;
   *   color: rgba(109, 40, 217, var(--bg-opacity));
   * }
   * ```
   */
  $violet700: ClassName;
  /**
   * ```css
   * .bg\:\:\$violet800 {
   *   --bg-opacity: 1;
   *   color: rgba(91, 33, 182, var(--bg-opacity));
   * }
   * ```
   */
  $violet800: ClassName;
  /**
   * ```css
   * .bg\:\:\$violet900 {
   *   --bg-opacity: 1;
   *   color: rgba(76, 29, 149, var(--bg-opacity));
   * }
   * ```
   */
  $violet900: ClassName;
  /**
   * ```css
   * .bg\:\:\$purple50 {
   *   --bg-opacity: 1;
   *   color: rgba(250, 245, 255, var(--bg-opacity));
   * }
   * ```
   */
  $purple50: ClassName;
  /**
   * ```css
   * .bg\:\:\$purple100 {
   *   --bg-opacity: 1;
   *   color: rgba(243, 232, 255, var(--bg-opacity));
   * }
   * ```
   */
  $purple100: ClassName;
  /**
   * ```css
   * .bg\:\:\$purple200 {
   *   --bg-opacity: 1;
   *   color: rgba(233, 213, 255, var(--bg-opacity));
   * }
   * ```
   */
  $purple200: ClassName;
  /**
   * ```css
   * .bg\:\:\$purple300 {
   *   --bg-opacity: 1;
   *   color: rgba(216, 180, 254, var(--bg-opacity));
   * }
   * ```
   */
  $purple300: ClassName;
  /**
   * ```css
   * .bg\:\:\$purple400 {
   *   --bg-opacity: 1;
   *   color: rgba(192, 132, 252, var(--bg-opacity));
   * }
   * ```
   */
  $purple400: ClassName;
  /**
   * ```css
   * .bg\:\:\$purple500 {
   *   --bg-opacity: 1;
   *   color: rgba(168, 85, 247, var(--bg-opacity));
   * }
   * ```
   */
  $purple500: ClassName;
  /**
   * ```css
   * .bg\:\:\$purple600 {
   *   --bg-opacity: 1;
   *   color: rgba(147, 51, 234, var(--bg-opacity));
   * }
   * ```
   */
  $purple600: ClassName;
  /**
   * ```css
   * .bg\:\:\$purple700 {
   *   --bg-opacity: 1;
   *   color: rgba(126, 34, 206, var(--bg-opacity));
   * }
   * ```
   */
  $purple700: ClassName;
  /**
   * ```css
   * .bg\:\:\$purple800 {
   *   --bg-opacity: 1;
   *   color: rgba(107, 33, 168, var(--bg-opacity));
   * }
   * ```
   */
  $purple800: ClassName;
  /**
   * ```css
   * .bg\:\:\$purple900 {
   *   --bg-opacity: 1;
   *   color: rgba(88, 28, 135, var(--bg-opacity));
   * }
   * ```
   */
  $purple900: ClassName;
  /**
   * ```css
   * .bg\:\:\$fuchsia50 {
   *   --bg-opacity: 1;
   *   color: rgba(253, 244, 255, var(--bg-opacity));
   * }
   * ```
   */
  $fuchsia50: ClassName;
  /**
   * ```css
   * .bg\:\:\$fuchsia100 {
   *   --bg-opacity: 1;
   *   color: rgba(250, 232, 255, var(--bg-opacity));
   * }
   * ```
   */
  $fuchsia100: ClassName;
  /**
   * ```css
   * .bg\:\:\$fuchsia200 {
   *   --bg-opacity: 1;
   *   color: rgba(245, 208, 254, var(--bg-opacity));
   * }
   * ```
   */
  $fuchsia200: ClassName;
  /**
   * ```css
   * .bg\:\:\$fuchsia300 {
   *   --bg-opacity: 1;
   *   color: rgba(240, 171, 252, var(--bg-opacity));
   * }
   * ```
   */
  $fuchsia300: ClassName;
  /**
   * ```css
   * .bg\:\:\$fuchsia400 {
   *   --bg-opacity: 1;
   *   color: rgba(232, 121, 249, var(--bg-opacity));
   * }
   * ```
   */
  $fuchsia400: ClassName;
  /**
   * ```css
   * .bg\:\:\$fuchsia500 {
   *   --bg-opacity: 1;
   *   color: rgba(217, 70, 239, var(--bg-opacity));
   * }
   * ```
   */
  $fuchsia500: ClassName;
  /**
   * ```css
   * .bg\:\:\$fuchsia600 {
   *   --bg-opacity: 1;
   *   color: rgba(192, 38, 211, var(--bg-opacity));
   * }
   * ```
   */
  $fuchsia600: ClassName;
  /**
   * ```css
   * .bg\:\:\$fuchsia700 {
   *   --bg-opacity: 1;
   *   color: rgba(162, 28, 175, var(--bg-opacity));
   * }
   * ```
   */
  $fuchsia700: ClassName;
  /**
   * ```css
   * .bg\:\:\$fuchsia800 {
   *   --bg-opacity: 1;
   *   color: rgba(134, 25, 143, var(--bg-opacity));
   * }
   * ```
   */
  $fuchsia800: ClassName;
  /**
   * ```css
   * .bg\:\:\$fuchsia900 {
   *   --bg-opacity: 1;
   *   color: rgba(112, 26, 117, var(--bg-opacity));
   * }
   * ```
   */
  $fuchsia900: ClassName;
  /**
   * ```css
   * .bg\:\:\$pink50 {
   *   --bg-opacity: 1;
   *   color: rgba(253, 242, 248, var(--bg-opacity));
   * }
   * ```
   */
  $pink50: ClassName;
  /**
   * ```css
   * .bg\:\:\$pink100 {
   *   --bg-opacity: 1;
   *   color: rgba(252, 231, 243, var(--bg-opacity));
   * }
   * ```
   */
  $pink100: ClassName;
  /**
   * ```css
   * .bg\:\:\$pink200 {
   *   --bg-opacity: 1;
   *   color: rgba(251, 207, 232, var(--bg-opacity));
   * }
   * ```
   */
  $pink200: ClassName;
  /**
   * ```css
   * .bg\:\:\$pink300 {
   *   --bg-opacity: 1;
   *   color: rgba(249, 168, 212, var(--bg-opacity));
   * }
   * ```
   */
  $pink300: ClassName;
  /**
   * ```css
   * .bg\:\:\$pink400 {
   *   --bg-opacity: 1;
   *   color: rgba(244, 114, 182, var(--bg-opacity));
   * }
   * ```
   */
  $pink400: ClassName;
  /**
   * ```css
   * .bg\:\:\$pink500 {
   *   --bg-opacity: 1;
   *   color: rgba(236, 72, 153, var(--bg-opacity));
   * }
   * ```
   */
  $pink500: ClassName;
  /**
   * ```css
   * .bg\:\:\$pink600 {
   *   --bg-opacity: 1;
   *   color: rgba(219, 39, 119, var(--bg-opacity));
   * }
   * ```
   */
  $pink600: ClassName;
  /**
   * ```css
   * .bg\:\:\$pink700 {
   *   --bg-opacity: 1;
   *   color: rgba(190, 24, 93, var(--bg-opacity));
   * }
   * ```
   */
  $pink700: ClassName;
  /**
   * ```css
   * .bg\:\:\$pink800 {
   *   --bg-opacity: 1;
   *   color: rgba(157, 23, 77, var(--bg-opacity));
   * }
   * ```
   */
  $pink800: ClassName;
  /**
   * ```css
   * .bg\:\:\$pink900 {
   *   --bg-opacity: 1;
   *   color: rgba(131, 24, 67, var(--bg-opacity));
   * }
   * ```
   */
  $pink900: ClassName;
  /**
   * ```css
   * .bg\:\:\$rose50 {
   *   --bg-opacity: 1;
   *   color: rgba(255, 241, 242, var(--bg-opacity));
   * }
   * ```
   */
  $rose50: ClassName;
  /**
   * ```css
   * .bg\:\:\$rose100 {
   *   --bg-opacity: 1;
   *   color: rgba(255, 228, 230, var(--bg-opacity));
   * }
   * ```
   */
  $rose100: ClassName;
  /**
   * ```css
   * .bg\:\:\$rose200 {
   *   --bg-opacity: 1;
   *   color: rgba(254, 205, 211, var(--bg-opacity));
   * }
   * ```
   */
  $rose200: ClassName;
  /**
   * ```css
   * .bg\:\:\$rose300 {
   *   --bg-opacity: 1;
   *   color: rgba(253, 164, 175, var(--bg-opacity));
   * }
   * ```
   */
  $rose300: ClassName;
  /**
   * ```css
   * .bg\:\:\$rose400 {
   *   --bg-opacity: 1;
   *   color: rgba(251, 113, 133, var(--bg-opacity));
   * }
   * ```
   */
  $rose400: ClassName;
  /**
   * ```css
   * .bg\:\:\$rose500 {
   *   --bg-opacity: 1;
   *   color: rgba(244, 63, 94, var(--bg-opacity));
   * }
   * ```
   */
  $rose500: ClassName;
  /**
   * ```css
   * .bg\:\:\$rose600 {
   *   --bg-opacity: 1;
   *   color: rgba(225, 29, 72, var(--bg-opacity));
   * }
   * ```
   */
  $rose600: ClassName;
  /**
   * ```css
   * .bg\:\:\$rose700 {
   *   --bg-opacity: 1;
   *   color: rgba(190, 18, 60, var(--bg-opacity));
   * }
   * ```
   */
  $rose700: ClassName;
  /**
   * ```css
   * .bg\:\:\$rose800 {
   *   --bg-opacity: 1;
   *   color: rgba(159, 18, 57, var(--bg-opacity));
   * }
   * ```
   */
  $rose800: ClassName;
  /**
   * ```css
   * .bg\:\:\$rose900 {
   *   --bg-opacity: 1;
   *   color: rgba(136, 19, 55, var(--bg-opacity));
   * }
   * ```
   */
  $rose900: ClassName;
  /**
   * ```css
   * .bg\:\:\$primary {
   *   --bg-opacity: 1;
   *   color: var(--color-bg-primary);
   * }
   * ```
   */
  $primary: ClassName;
  /**
   * ```css
   * .bg\:\:\$secondary {
   *   --bg-opacity: 1;
   *   color: var(--color-bg-secondary);
   * }
   * ```
   */
  $secondary: ClassName;
  /**
   * ```css
   * .bg\:\:\$text {
   *   --bg-opacity: 1;
   *   color: var(--color-bg-text);
   * }
   * ```
   */
  $text: ClassName;
  /**
   * ```css
   * .bg\:\:\$background {
   *   --bg-opacity: 1;
   *   color: var(--color-bg-background);
   * }
   * ```
   */
  $background: ClassName;
  /**
   * ```css
   * .bg\:\:\$border {
   *   --bg-opacity: 1;
   *   color: var(--color-bg-border);
   * }
   * ```
   */
  $border: ClassName;
  /**
   * ```css
   * .bg\:\:\$media {
   *   --bg-opacity: 1;
   *   color: var(--color-bg-media);
   * }
   * ```
   */
  $media: ClassName;
}

interface BorderAtomStyle {
  /**
   * ```css
   * .border\:\:\$inherit {}
   * ```
   */
  $inherit: ClassName;
  /**
   * ```css
   * .border\:\:\$current {}
   * ```
   */
  $current: ClassName;
  /**
   * ```css
   * .border\:\:\$transparent {}
   * ```
   */
  $transparent: ClassName;
  /**
   * ```css
   * .border\:\:\$black {}
   * ```
   */
  $black: ClassName;
  /**
   * ```css
   * .border\:\:\$white {}
   * ```
   */
  $white: ClassName;
  /**
   * ```css
   * .border\:\:\$slate50 {}
   * ```
   */
  $slate50: ClassName;
  /**
   * ```css
   * .border\:\:\$slate100 {}
   * ```
   */
  $slate100: ClassName;
  /**
   * ```css
   * .border\:\:\$slate200 {}
   * ```
   */
  $slate200: ClassName;
  /**
   * ```css
   * .border\:\:\$slate300 {}
   * ```
   */
  $slate300: ClassName;
  /**
   * ```css
   * .border\:\:\$slate400 {}
   * ```
   */
  $slate400: ClassName;
  /**
   * ```css
   * .border\:\:\$slate500 {}
   * ```
   */
  $slate500: ClassName;
  /**
   * ```css
   * .border\:\:\$slate600 {}
   * ```
   */
  $slate600: ClassName;
  /**
   * ```css
   * .border\:\:\$slate700 {}
   * ```
   */
  $slate700: ClassName;
  /**
   * ```css
   * .border\:\:\$slate800 {}
   * ```
   */
  $slate800: ClassName;
  /**
   * ```css
   * .border\:\:\$slate900 {}
   * ```
   */
  $slate900: ClassName;
  /**
   * ```css
   * .border\:\:\$gray50 {}
   * ```
   */
  $gray50: ClassName;
  /**
   * ```css
   * .border\:\:\$gray100 {}
   * ```
   */
  $gray100: ClassName;
  /**
   * ```css
   * .border\:\:\$gray200 {}
   * ```
   */
  $gray200: ClassName;
  /**
   * ```css
   * .border\:\:\$gray300 {}
   * ```
   */
  $gray300: ClassName;
  /**
   * ```css
   * .border\:\:\$gray400 {}
   * ```
   */
  $gray400: ClassName;
  /**
   * ```css
   * .border\:\:\$gray500 {}
   * ```
   */
  $gray500: ClassName;
  /**
   * ```css
   * .border\:\:\$gray600 {}
   * ```
   */
  $gray600: ClassName;
  /**
   * ```css
   * .border\:\:\$gray700 {}
   * ```
   */
  $gray700: ClassName;
  /**
   * ```css
   * .border\:\:\$gray800 {}
   * ```
   */
  $gray800: ClassName;
  /**
   * ```css
   * .border\:\:\$gray900 {}
   * ```
   */
  $gray900: ClassName;
  /**
   * ```css
   * .border\:\:\$zinc50 {}
   * ```
   */
  $zinc50: ClassName;
  /**
   * ```css
   * .border\:\:\$zinc100 {}
   * ```
   */
  $zinc100: ClassName;
  /**
   * ```css
   * .border\:\:\$zinc200 {}
   * ```
   */
  $zinc200: ClassName;
  /**
   * ```css
   * .border\:\:\$zinc300 {}
   * ```
   */
  $zinc300: ClassName;
  /**
   * ```css
   * .border\:\:\$zinc400 {}
   * ```
   */
  $zinc400: ClassName;
  /**
   * ```css
   * .border\:\:\$zinc500 {}
   * ```
   */
  $zinc500: ClassName;
  /**
   * ```css
   * .border\:\:\$zinc600 {}
   * ```
   */
  $zinc600: ClassName;
  /**
   * ```css
   * .border\:\:\$zinc700 {}
   * ```
   */
  $zinc700: ClassName;
  /**
   * ```css
   * .border\:\:\$zinc800 {}
   * ```
   */
  $zinc800: ClassName;
  /**
   * ```css
   * .border\:\:\$zinc900 {}
   * ```
   */
  $zinc900: ClassName;
  /**
   * ```css
   * .border\:\:\$neutral50 {}
   * ```
   */
  $neutral50: ClassName;
  /**
   * ```css
   * .border\:\:\$neutral100 {}
   * ```
   */
  $neutral100: ClassName;
  /**
   * ```css
   * .border\:\:\$neutral200 {}
   * ```
   */
  $neutral200: ClassName;
  /**
   * ```css
   * .border\:\:\$neutral300 {}
   * ```
   */
  $neutral300: ClassName;
  /**
   * ```css
   * .border\:\:\$neutral400 {}
   * ```
   */
  $neutral400: ClassName;
  /**
   * ```css
   * .border\:\:\$neutral500 {}
   * ```
   */
  $neutral500: ClassName;
  /**
   * ```css
   * .border\:\:\$neutral600 {}
   * ```
   */
  $neutral600: ClassName;
  /**
   * ```css
   * .border\:\:\$neutral700 {}
   * ```
   */
  $neutral700: ClassName;
  /**
   * ```css
   * .border\:\:\$neutral800 {}
   * ```
   */
  $neutral800: ClassName;
  /**
   * ```css
   * .border\:\:\$neutral900 {}
   * ```
   */
  $neutral900: ClassName;
  /**
   * ```css
   * .border\:\:\$stone50 {}
   * ```
   */
  $stone50: ClassName;
  /**
   * ```css
   * .border\:\:\$stone100 {}
   * ```
   */
  $stone100: ClassName;
  /**
   * ```css
   * .border\:\:\$stone200 {}
   * ```
   */
  $stone200: ClassName;
  /**
   * ```css
   * .border\:\:\$stone300 {}
   * ```
   */
  $stone300: ClassName;
  /**
   * ```css
   * .border\:\:\$stone400 {}
   * ```
   */
  $stone400: ClassName;
  /**
   * ```css
   * .border\:\:\$stone500 {}
   * ```
   */
  $stone500: ClassName;
  /**
   * ```css
   * .border\:\:\$stone600 {}
   * ```
   */
  $stone600: ClassName;
  /**
   * ```css
   * .border\:\:\$stone700 {}
   * ```
   */
  $stone700: ClassName;
  /**
   * ```css
   * .border\:\:\$stone800 {}
   * ```
   */
  $stone800: ClassName;
  /**
   * ```css
   * .border\:\:\$stone900 {}
   * ```
   */
  $stone900: ClassName;
  /**
   * ```css
   * .border\:\:\$red50 {}
   * ```
   */
  $red50: ClassName;
  /**
   * ```css
   * .border\:\:\$red100 {}
   * ```
   */
  $red100: ClassName;
  /**
   * ```css
   * .border\:\:\$red200 {}
   * ```
   */
  $red200: ClassName;
  /**
   * ```css
   * .border\:\:\$red300 {}
   * ```
   */
  $red300: ClassName;
  /**
   * ```css
   * .border\:\:\$red400 {}
   * ```
   */
  $red400: ClassName;
  /**
   * ```css
   * .border\:\:\$red500 {}
   * ```
   */
  $red500: ClassName;
  /**
   * ```css
   * .border\:\:\$red600 {}
   * ```
   */
  $red600: ClassName;
  /**
   * ```css
   * .border\:\:\$red700 {}
   * ```
   */
  $red700: ClassName;
  /**
   * ```css
   * .border\:\:\$red800 {}
   * ```
   */
  $red800: ClassName;
  /**
   * ```css
   * .border\:\:\$red900 {}
   * ```
   */
  $red900: ClassName;
  /**
   * ```css
   * .border\:\:\$orange50 {}
   * ```
   */
  $orange50: ClassName;
  /**
   * ```css
   * .border\:\:\$orange100 {}
   * ```
   */
  $orange100: ClassName;
  /**
   * ```css
   * .border\:\:\$orange200 {}
   * ```
   */
  $orange200: ClassName;
  /**
   * ```css
   * .border\:\:\$orange300 {}
   * ```
   */
  $orange300: ClassName;
  /**
   * ```css
   * .border\:\:\$orange400 {}
   * ```
   */
  $orange400: ClassName;
  /**
   * ```css
   * .border\:\:\$orange500 {}
   * ```
   */
  $orange500: ClassName;
  /**
   * ```css
   * .border\:\:\$orange600 {}
   * ```
   */
  $orange600: ClassName;
  /**
   * ```css
   * .border\:\:\$orange700 {}
   * ```
   */
  $orange700: ClassName;
  /**
   * ```css
   * .border\:\:\$orange800 {}
   * ```
   */
  $orange800: ClassName;
  /**
   * ```css
   * .border\:\:\$orange900 {}
   * ```
   */
  $orange900: ClassName;
  /**
   * ```css
   * .border\:\:\$amber50 {}
   * ```
   */
  $amber50: ClassName;
  /**
   * ```css
   * .border\:\:\$amber100 {}
   * ```
   */
  $amber100: ClassName;
  /**
   * ```css
   * .border\:\:\$amber200 {}
   * ```
   */
  $amber200: ClassName;
  /**
   * ```css
   * .border\:\:\$amber300 {}
   * ```
   */
  $amber300: ClassName;
  /**
   * ```css
   * .border\:\:\$amber400 {}
   * ```
   */
  $amber400: ClassName;
  /**
   * ```css
   * .border\:\:\$amber500 {}
   * ```
   */
  $amber500: ClassName;
  /**
   * ```css
   * .border\:\:\$amber600 {}
   * ```
   */
  $amber600: ClassName;
  /**
   * ```css
   * .border\:\:\$amber700 {}
   * ```
   */
  $amber700: ClassName;
  /**
   * ```css
   * .border\:\:\$amber800 {}
   * ```
   */
  $amber800: ClassName;
  /**
   * ```css
   * .border\:\:\$amber900 {}
   * ```
   */
  $amber900: ClassName;
  /**
   * ```css
   * .border\:\:\$yellow50 {}
   * ```
   */
  $yellow50: ClassName;
  /**
   * ```css
   * .border\:\:\$yellow100 {}
   * ```
   */
  $yellow100: ClassName;
  /**
   * ```css
   * .border\:\:\$yellow200 {}
   * ```
   */
  $yellow200: ClassName;
  /**
   * ```css
   * .border\:\:\$yellow300 {}
   * ```
   */
  $yellow300: ClassName;
  /**
   * ```css
   * .border\:\:\$yellow400 {}
   * ```
   */
  $yellow400: ClassName;
  /**
   * ```css
   * .border\:\:\$yellow500 {}
   * ```
   */
  $yellow500: ClassName;
  /**
   * ```css
   * .border\:\:\$yellow600 {}
   * ```
   */
  $yellow600: ClassName;
  /**
   * ```css
   * .border\:\:\$yellow700 {}
   * ```
   */
  $yellow700: ClassName;
  /**
   * ```css
   * .border\:\:\$yellow800 {}
   * ```
   */
  $yellow800: ClassName;
  /**
   * ```css
   * .border\:\:\$yellow900 {}
   * ```
   */
  $yellow900: ClassName;
  /**
   * ```css
   * .border\:\:\$lime50 {}
   * ```
   */
  $lime50: ClassName;
  /**
   * ```css
   * .border\:\:\$lime100 {}
   * ```
   */
  $lime100: ClassName;
  /**
   * ```css
   * .border\:\:\$lime200 {}
   * ```
   */
  $lime200: ClassName;
  /**
   * ```css
   * .border\:\:\$lime300 {}
   * ```
   */
  $lime300: ClassName;
  /**
   * ```css
   * .border\:\:\$lime400 {}
   * ```
   */
  $lime400: ClassName;
  /**
   * ```css
   * .border\:\:\$lime500 {}
   * ```
   */
  $lime500: ClassName;
  /**
   * ```css
   * .border\:\:\$lime600 {}
   * ```
   */
  $lime600: ClassName;
  /**
   * ```css
   * .border\:\:\$lime700 {}
   * ```
   */
  $lime700: ClassName;
  /**
   * ```css
   * .border\:\:\$lime800 {}
   * ```
   */
  $lime800: ClassName;
  /**
   * ```css
   * .border\:\:\$lime900 {}
   * ```
   */
  $lime900: ClassName;
  /**
   * ```css
   * .border\:\:\$green50 {}
   * ```
   */
  $green50: ClassName;
  /**
   * ```css
   * .border\:\:\$green100 {}
   * ```
   */
  $green100: ClassName;
  /**
   * ```css
   * .border\:\:\$green200 {}
   * ```
   */
  $green200: ClassName;
  /**
   * ```css
   * .border\:\:\$green300 {}
   * ```
   */
  $green300: ClassName;
  /**
   * ```css
   * .border\:\:\$green400 {}
   * ```
   */
  $green400: ClassName;
  /**
   * ```css
   * .border\:\:\$green500 {}
   * ```
   */
  $green500: ClassName;
  /**
   * ```css
   * .border\:\:\$green600 {}
   * ```
   */
  $green600: ClassName;
  /**
   * ```css
   * .border\:\:\$green700 {}
   * ```
   */
  $green700: ClassName;
  /**
   * ```css
   * .border\:\:\$green800 {}
   * ```
   */
  $green800: ClassName;
  /**
   * ```css
   * .border\:\:\$green900 {}
   * ```
   */
  $green900: ClassName;
  /**
   * ```css
   * .border\:\:\$emerald50 {}
   * ```
   */
  $emerald50: ClassName;
  /**
   * ```css
   * .border\:\:\$emerald100 {}
   * ```
   */
  $emerald100: ClassName;
  /**
   * ```css
   * .border\:\:\$emerald200 {}
   * ```
   */
  $emerald200: ClassName;
  /**
   * ```css
   * .border\:\:\$emerald300 {}
   * ```
   */
  $emerald300: ClassName;
  /**
   * ```css
   * .border\:\:\$emerald400 {}
   * ```
   */
  $emerald400: ClassName;
  /**
   * ```css
   * .border\:\:\$emerald500 {}
   * ```
   */
  $emerald500: ClassName;
  /**
   * ```css
   * .border\:\:\$emerald600 {}
   * ```
   */
  $emerald600: ClassName;
  /**
   * ```css
   * .border\:\:\$emerald700 {}
   * ```
   */
  $emerald700: ClassName;
  /**
   * ```css
   * .border\:\:\$emerald800 {}
   * ```
   */
  $emerald800: ClassName;
  /**
   * ```css
   * .border\:\:\$emerald900 {}
   * ```
   */
  $emerald900: ClassName;
  /**
   * ```css
   * .border\:\:\$teal50 {}
   * ```
   */
  $teal50: ClassName;
  /**
   * ```css
   * .border\:\:\$teal100 {}
   * ```
   */
  $teal100: ClassName;
  /**
   * ```css
   * .border\:\:\$teal200 {}
   * ```
   */
  $teal200: ClassName;
  /**
   * ```css
   * .border\:\:\$teal300 {}
   * ```
   */
  $teal300: ClassName;
  /**
   * ```css
   * .border\:\:\$teal400 {}
   * ```
   */
  $teal400: ClassName;
  /**
   * ```css
   * .border\:\:\$teal500 {}
   * ```
   */
  $teal500: ClassName;
  /**
   * ```css
   * .border\:\:\$teal600 {}
   * ```
   */
  $teal600: ClassName;
  /**
   * ```css
   * .border\:\:\$teal700 {}
   * ```
   */
  $teal700: ClassName;
  /**
   * ```css
   * .border\:\:\$teal800 {}
   * ```
   */
  $teal800: ClassName;
  /**
   * ```css
   * .border\:\:\$teal900 {}
   * ```
   */
  $teal900: ClassName;
  /**
   * ```css
   * .border\:\:\$cyan50 {}
   * ```
   */
  $cyan50: ClassName;
  /**
   * ```css
   * .border\:\:\$cyan100 {}
   * ```
   */
  $cyan100: ClassName;
  /**
   * ```css
   * .border\:\:\$cyan200 {}
   * ```
   */
  $cyan200: ClassName;
  /**
   * ```css
   * .border\:\:\$cyan300 {}
   * ```
   */
  $cyan300: ClassName;
  /**
   * ```css
   * .border\:\:\$cyan400 {}
   * ```
   */
  $cyan400: ClassName;
  /**
   * ```css
   * .border\:\:\$cyan500 {}
   * ```
   */
  $cyan500: ClassName;
  /**
   * ```css
   * .border\:\:\$cyan600 {}
   * ```
   */
  $cyan600: ClassName;
  /**
   * ```css
   * .border\:\:\$cyan700 {}
   * ```
   */
  $cyan700: ClassName;
  /**
   * ```css
   * .border\:\:\$cyan800 {}
   * ```
   */
  $cyan800: ClassName;
  /**
   * ```css
   * .border\:\:\$cyan900 {}
   * ```
   */
  $cyan900: ClassName;
  /**
   * ```css
   * .border\:\:\$sky50 {}
   * ```
   */
  $sky50: ClassName;
  /**
   * ```css
   * .border\:\:\$sky100 {}
   * ```
   */
  $sky100: ClassName;
  /**
   * ```css
   * .border\:\:\$sky200 {}
   * ```
   */
  $sky200: ClassName;
  /**
   * ```css
   * .border\:\:\$sky300 {}
   * ```
   */
  $sky300: ClassName;
  /**
   * ```css
   * .border\:\:\$sky400 {}
   * ```
   */
  $sky400: ClassName;
  /**
   * ```css
   * .border\:\:\$sky500 {}
   * ```
   */
  $sky500: ClassName;
  /**
   * ```css
   * .border\:\:\$sky600 {}
   * ```
   */
  $sky600: ClassName;
  /**
   * ```css
   * .border\:\:\$sky700 {}
   * ```
   */
  $sky700: ClassName;
  /**
   * ```css
   * .border\:\:\$sky800 {}
   * ```
   */
  $sky800: ClassName;
  /**
   * ```css
   * .border\:\:\$sky900 {}
   * ```
   */
  $sky900: ClassName;
  /**
   * ```css
   * .border\:\:\$blue50 {}
   * ```
   */
  $blue50: ClassName;
  /**
   * ```css
   * .border\:\:\$blue100 {}
   * ```
   */
  $blue100: ClassName;
  /**
   * ```css
   * .border\:\:\$blue200 {}
   * ```
   */
  $blue200: ClassName;
  /**
   * ```css
   * .border\:\:\$blue300 {}
   * ```
   */
  $blue300: ClassName;
  /**
   * ```css
   * .border\:\:\$blue400 {}
   * ```
   */
  $blue400: ClassName;
  /**
   * ```css
   * .border\:\:\$blue500 {}
   * ```
   */
  $blue500: ClassName;
  /**
   * ```css
   * .border\:\:\$blue600 {}
   * ```
   */
  $blue600: ClassName;
  /**
   * ```css
   * .border\:\:\$blue700 {}
   * ```
   */
  $blue700: ClassName;
  /**
   * ```css
   * .border\:\:\$blue800 {}
   * ```
   */
  $blue800: ClassName;
  /**
   * ```css
   * .border\:\:\$blue900 {}
   * ```
   */
  $blue900: ClassName;
  /**
   * ```css
   * .border\:\:\$indigo50 {}
   * ```
   */
  $indigo50: ClassName;
  /**
   * ```css
   * .border\:\:\$indigo100 {}
   * ```
   */
  $indigo100: ClassName;
  /**
   * ```css
   * .border\:\:\$indigo200 {}
   * ```
   */
  $indigo200: ClassName;
  /**
   * ```css
   * .border\:\:\$indigo300 {}
   * ```
   */
  $indigo300: ClassName;
  /**
   * ```css
   * .border\:\:\$indigo400 {}
   * ```
   */
  $indigo400: ClassName;
  /**
   * ```css
   * .border\:\:\$indigo500 {}
   * ```
   */
  $indigo500: ClassName;
  /**
   * ```css
   * .border\:\:\$indigo600 {}
   * ```
   */
  $indigo600: ClassName;
  /**
   * ```css
   * .border\:\:\$indigo700 {}
   * ```
   */
  $indigo700: ClassName;
  /**
   * ```css
   * .border\:\:\$indigo800 {}
   * ```
   */
  $indigo800: ClassName;
  /**
   * ```css
   * .border\:\:\$indigo900 {}
   * ```
   */
  $indigo900: ClassName;
  /**
   * ```css
   * .border\:\:\$violet50 {}
   * ```
   */
  $violet50: ClassName;
  /**
   * ```css
   * .border\:\:\$violet100 {}
   * ```
   */
  $violet100: ClassName;
  /**
   * ```css
   * .border\:\:\$violet200 {}
   * ```
   */
  $violet200: ClassName;
  /**
   * ```css
   * .border\:\:\$violet300 {}
   * ```
   */
  $violet300: ClassName;
  /**
   * ```css
   * .border\:\:\$violet400 {}
   * ```
   */
  $violet400: ClassName;
  /**
   * ```css
   * .border\:\:\$violet500 {}
   * ```
   */
  $violet500: ClassName;
  /**
   * ```css
   * .border\:\:\$violet600 {}
   * ```
   */
  $violet600: ClassName;
  /**
   * ```css
   * .border\:\:\$violet700 {}
   * ```
   */
  $violet700: ClassName;
  /**
   * ```css
   * .border\:\:\$violet800 {}
   * ```
   */
  $violet800: ClassName;
  /**
   * ```css
   * .border\:\:\$violet900 {}
   * ```
   */
  $violet900: ClassName;
  /**
   * ```css
   * .border\:\:\$purple50 {}
   * ```
   */
  $purple50: ClassName;
  /**
   * ```css
   * .border\:\:\$purple100 {}
   * ```
   */
  $purple100: ClassName;
  /**
   * ```css
   * .border\:\:\$purple200 {}
   * ```
   */
  $purple200: ClassName;
  /**
   * ```css
   * .border\:\:\$purple300 {}
   * ```
   */
  $purple300: ClassName;
  /**
   * ```css
   * .border\:\:\$purple400 {}
   * ```
   */
  $purple400: ClassName;
  /**
   * ```css
   * .border\:\:\$purple500 {}
   * ```
   */
  $purple500: ClassName;
  /**
   * ```css
   * .border\:\:\$purple600 {}
   * ```
   */
  $purple600: ClassName;
  /**
   * ```css
   * .border\:\:\$purple700 {}
   * ```
   */
  $purple700: ClassName;
  /**
   * ```css
   * .border\:\:\$purple800 {}
   * ```
   */
  $purple800: ClassName;
  /**
   * ```css
   * .border\:\:\$purple900 {}
   * ```
   */
  $purple900: ClassName;
  /**
   * ```css
   * .border\:\:\$fuchsia50 {}
   * ```
   */
  $fuchsia50: ClassName;
  /**
   * ```css
   * .border\:\:\$fuchsia100 {}
   * ```
   */
  $fuchsia100: ClassName;
  /**
   * ```css
   * .border\:\:\$fuchsia200 {}
   * ```
   */
  $fuchsia200: ClassName;
  /**
   * ```css
   * .border\:\:\$fuchsia300 {}
   * ```
   */
  $fuchsia300: ClassName;
  /**
   * ```css
   * .border\:\:\$fuchsia400 {}
   * ```
   */
  $fuchsia400: ClassName;
  /**
   * ```css
   * .border\:\:\$fuchsia500 {}
   * ```
   */
  $fuchsia500: ClassName;
  /**
   * ```css
   * .border\:\:\$fuchsia600 {}
   * ```
   */
  $fuchsia600: ClassName;
  /**
   * ```css
   * .border\:\:\$fuchsia700 {}
   * ```
   */
  $fuchsia700: ClassName;
  /**
   * ```css
   * .border\:\:\$fuchsia800 {}
   * ```
   */
  $fuchsia800: ClassName;
  /**
   * ```css
   * .border\:\:\$fuchsia900 {}
   * ```
   */
  $fuchsia900: ClassName;
  /**
   * ```css
   * .border\:\:\$pink50 {}
   * ```
   */
  $pink50: ClassName;
  /**
   * ```css
   * .border\:\:\$pink100 {}
   * ```
   */
  $pink100: ClassName;
  /**
   * ```css
   * .border\:\:\$pink200 {}
   * ```
   */
  $pink200: ClassName;
  /**
   * ```css
   * .border\:\:\$pink300 {}
   * ```
   */
  $pink300: ClassName;
  /**
   * ```css
   * .border\:\:\$pink400 {}
   * ```
   */
  $pink400: ClassName;
  /**
   * ```css
   * .border\:\:\$pink500 {}
   * ```
   */
  $pink500: ClassName;
  /**
   * ```css
   * .border\:\:\$pink600 {}
   * ```
   */
  $pink600: ClassName;
  /**
   * ```css
   * .border\:\:\$pink700 {}
   * ```
   */
  $pink700: ClassName;
  /**
   * ```css
   * .border\:\:\$pink800 {}
   * ```
   */
  $pink800: ClassName;
  /**
   * ```css
   * .border\:\:\$pink900 {}
   * ```
   */
  $pink900: ClassName;
  /**
   * ```css
   * .border\:\:\$rose50 {}
   * ```
   */
  $rose50: ClassName;
  /**
   * ```css
   * .border\:\:\$rose100 {}
   * ```
   */
  $rose100: ClassName;
  /**
   * ```css
   * .border\:\:\$rose200 {}
   * ```
   */
  $rose200: ClassName;
  /**
   * ```css
   * .border\:\:\$rose300 {}
   * ```
   */
  $rose300: ClassName;
  /**
   * ```css
   * .border\:\:\$rose400 {}
   * ```
   */
  $rose400: ClassName;
  /**
   * ```css
   * .border\:\:\$rose500 {}
   * ```
   */
  $rose500: ClassName;
  /**
   * ```css
   * .border\:\:\$rose600 {}
   * ```
   */
  $rose600: ClassName;
  /**
   * ```css
   * .border\:\:\$rose700 {}
   * ```
   */
  $rose700: ClassName;
  /**
   * ```css
   * .border\:\:\$rose800 {}
   * ```
   */
  $rose800: ClassName;
  /**
   * ```css
   * .border\:\:\$rose900 {}
   * ```
   */
  $rose900: ClassName;
  /**
   * ```css
   * .border\:\:\$primary {}
   * ```
   */
  $primary: ClassName;
  /**
   * ```css
   * .border\:\:\$secondary {}
   * ```
   */
  $secondary: ClassName;
  /**
   * ```css
   * .border\:\:\$text {}
   * ```
   */
  $text: ClassName;
  /**
   * ```css
   * .border\:\:\$background {}
   * ```
   */
  $background: ClassName;
  /**
   * ```css
   * .border\:\:\$border {}
   * ```
   */
  $border: ClassName;
  /**
   * ```css
   * .border\:\:\$media {}
   * ```
   */
  $media: ClassName;
}

interface FontAtomStyle {
  /**
   * ```css
   * .font\:\:\$sans {
   *   font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
   * }
   * ```
   */
  $sans: ClassName;
  /**
   * ```css
   * .font\:\:\$serif {
   *   font-family: ui-serif,Georgia,Cambria,"Times New Roman",Times,serif;
   * }
   * ```
   */
  $serif: ClassName;
  /**
   * ```css
   * .font\:\:\$mono {
   *   font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
   * }
   * ```
   */
  $mono: ClassName;
}

interface BlurAtomStyle {
  /**
   * ```css
   * .blur\:\:\$none {
   *   --filter-blur: blur(0);
   * }
   * ```
   */
  $none: ClassName;
  /**
   * ```css
   * .blur\:\:\$sm {
   *   --filter-blur: blur(4px);
   * }
   * ```
   */
  $sm: ClassName;
  /**
   * ```css
   * .blur\:\:\$ {
   *   --filter-blur: blur(8px);
   * }
   * ```
   */
  $: ClassName;
  /**
   * ```css
   * .blur\:\:\$md {
   *   --filter-blur: blur(12px);
   * }
   * ```
   */
  $md: ClassName;
  /**
   * ```css
   * .blur\:\:\$lg {
   *   --filter-blur: blur(16px);
   * }
   * ```
   */
  $lg: ClassName;
  /**
   * ```css
   * .blur\:\:\$xl {
   *   --filter-blur: blur(24px);
   * }
   * ```
   */
  $xl: ClassName;
  /**
   * ```css
   * .blur\:\:\$2xl {
   *   --filter-blur: blur(40px);
   * }
   * ```
   */
  $2xl: ClassName;
  /**
   * ```css
   * .blur\:\:\$3xl {
   *   --filter-blur: blur(64px);
   * }
   * ```
   */
  $3xl: ClassName;
}

interface BackdropBlurAtomStyle {
  /**
   * ```css
   * .backdropBlur\:\:\$none {
   *   --backdrop-blur: blur(0);
   * }
   * ```
   */
  $none: ClassName;
  /**
   * ```css
   * .backdropBlur\:\:\$sm {
   *   --backdrop-blur: blur(4px);
   * }
   * ```
   */
  $sm: ClassName;
  /**
   * ```css
   * .backdropBlur\:\:\$ {
   *   --backdrop-blur: blur(8px);
   * }
   * ```
   */
  $: ClassName;
  /**
   * ```css
   * .backdropBlur\:\:\$md {
   *   --backdrop-blur: blur(12px);
   * }
   * ```
   */
  $md: ClassName;
  /**
   * ```css
   * .backdropBlur\:\:\$lg {
   *   --backdrop-blur: blur(16px);
   * }
   * ```
   */
  $lg: ClassName;
  /**
   * ```css
   * .backdropBlur\:\:\$xl {
   *   --backdrop-blur: blur(24px);
   * }
   * ```
   */
  $xl: ClassName;
  /**
   * ```css
   * .backdropBlur\:\:\$2xl {
   *   --backdrop-blur: blur(40px);
   * }
   * ```
   */
  $2xl: ClassName;
  /**
   * ```css
   * .backdropBlur\:\:\$3xl {
   *   --backdrop-blur: blur(64px);
   * }
   * ```
   */
  $3xl: ClassName;
}

interface BrightnessAtomStyle {
  /**
   * ```css
   * .brightness\:\:\$0 {
   *   --filter-brightness: brightness(0);
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .brightness\:\:\$50 {
   *   --filter-brightness: brightness(.5);
   * }
   * ```
   */
  $50: ClassName;
  /**
   * ```css
   * .brightness\:\:\$75 {
   *   --filter-brightness: brightness(.75);
   * }
   * ```
   */
  $75: ClassName;
  /**
   * ```css
   * .brightness\:\:\$90 {
   *   --filter-brightness: brightness(.9);
   * }
   * ```
   */
  $90: ClassName;
  /**
   * ```css
   * .brightness\:\:\$95 {
   *   --filter-brightness: brightness(.95);
   * }
   * ```
   */
  $95: ClassName;
  /**
   * ```css
   * .brightness\:\:\$100 {
   *   --filter-brightness: brightness(1);
   * }
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .brightness\:\:\$105 {
   *   --filter-brightness: brightness(1.05);
   * }
   * ```
   */
  $105: ClassName;
  /**
   * ```css
   * .brightness\:\:\$110 {
   *   --filter-brightness: brightness(1.1);
   * }
   * ```
   */
  $110: ClassName;
  /**
   * ```css
   * .brightness\:\:\$125 {
   *   --filter-brightness: brightness(1.25);
   * }
   * ```
   */
  $125: ClassName;
  /**
   * ```css
   * .brightness\:\:\$150 {
   *   --filter-brightness: brightness(1.5);
   * }
   * ```
   */
  $150: ClassName;
  /**
   * ```css
   * .brightness\:\:\$200 {
   *   --filter-brightness: brightness(2);
   * }
   * ```
   */
  $200: ClassName;
}

interface BackdropBrightnessAtomStyle {
  /**
   * ```css
   * .backdropBrightness\:\:\$0 {
   *   --backdrop-brightness: brightness(0);
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .backdropBrightness\:\:\$50 {
   *   --backdrop-brightness: brightness(.5);
   * }
   * ```
   */
  $50: ClassName;
  /**
   * ```css
   * .backdropBrightness\:\:\$75 {
   *   --backdrop-brightness: brightness(.75);
   * }
   * ```
   */
  $75: ClassName;
  /**
   * ```css
   * .backdropBrightness\:\:\$90 {
   *   --backdrop-brightness: brightness(.9);
   * }
   * ```
   */
  $90: ClassName;
  /**
   * ```css
   * .backdropBrightness\:\:\$95 {
   *   --backdrop-brightness: brightness(.95);
   * }
   * ```
   */
  $95: ClassName;
  /**
   * ```css
   * .backdropBrightness\:\:\$100 {
   *   --backdrop-brightness: brightness(1);
   * }
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .backdropBrightness\:\:\$105 {
   *   --backdrop-brightness: brightness(1.05);
   * }
   * ```
   */
  $105: ClassName;
  /**
   * ```css
   * .backdropBrightness\:\:\$110 {
   *   --backdrop-brightness: brightness(1.1);
   * }
   * ```
   */
  $110: ClassName;
  /**
   * ```css
   * .backdropBrightness\:\:\$125 {
   *   --backdrop-brightness: brightness(1.25);
   * }
   * ```
   */
  $125: ClassName;
  /**
   * ```css
   * .backdropBrightness\:\:\$150 {
   *   --backdrop-brightness: brightness(1.5);
   * }
   * ```
   */
  $150: ClassName;
  /**
   * ```css
   * .backdropBrightness\:\:\$200 {
   *   --backdrop-brightness: brightness(2);
   * }
   * ```
   */
  $200: ClassName;
}

interface ContrastAtomStyle {
  /**
   * ```css
   * .contrast\:\:\$0 {
   *   --filter-contrast: contrast(0);
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .contrast\:\:\$50 {
   *   --filter-contrast: contrast(.5);
   * }
   * ```
   */
  $50: ClassName;
  /**
   * ```css
   * .contrast\:\:\$75 {
   *   --filter-contrast: contrast(.75);
   * }
   * ```
   */
  $75: ClassName;
  /**
   * ```css
   * .contrast\:\:\$100 {
   *   --filter-contrast: contrast(1);
   * }
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .contrast\:\:\$125 {
   *   --filter-contrast: contrast(1.25);
   * }
   * ```
   */
  $125: ClassName;
  /**
   * ```css
   * .contrast\:\:\$150 {
   *   --filter-contrast: contrast(1.5);
   * }
   * ```
   */
  $150: ClassName;
  /**
   * ```css
   * .contrast\:\:\$200 {
   *   --filter-contrast: contrast(2);
   * }
   * ```
   */
  $200: ClassName;
}

interface BackdropContrastAtomStyle {
  /**
   * ```css
   * .backdropContrast\:\:\$0 {
   *   --backdrop-contrast: contrast(0);
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .backdropContrast\:\:\$50 {
   *   --backdrop-contrast: contrast(.5);
   * }
   * ```
   */
  $50: ClassName;
  /**
   * ```css
   * .backdropContrast\:\:\$75 {
   *   --backdrop-contrast: contrast(.75);
   * }
   * ```
   */
  $75: ClassName;
  /**
   * ```css
   * .backdropContrast\:\:\$100 {
   *   --backdrop-contrast: contrast(1);
   * }
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .backdropContrast\:\:\$125 {
   *   --backdrop-contrast: contrast(1.25);
   * }
   * ```
   */
  $125: ClassName;
  /**
   * ```css
   * .backdropContrast\:\:\$150 {
   *   --backdrop-contrast: contrast(1.5);
   * }
   * ```
   */
  $150: ClassName;
  /**
   * ```css
   * .backdropContrast\:\:\$200 {
   *   --backdrop-contrast: contrast(2);
   * }
   * ```
   */
  $200: ClassName;
}

interface DropShadowAtomStyle {
  /**
   * ```css
   * .dropShadow\:\:\$ {
   *   --filter-drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
   * }
   * ```
   */
  $: ClassName;
  /**
   * ```css
   * .dropShadow\:\:\$sm {
   *   --filter-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
   * }
   * ```
   */
  $sm: ClassName;
  /**
   * ```css
   * .dropShadow\:\:\$md {
   *   --filter-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
   * }
   * ```
   */
  $md: ClassName;
  /**
   * ```css
   * .dropShadow\:\:\$lg {
   *   --filter-drop-shadow: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
   * }
   * ```
   */
  $lg: ClassName;
  /**
   * ```css
   * .dropShadow\:\:\$xl {
   *   --filter-drop-shadow: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
   * }
   * ```
   */
  $xl: ClassName;
  /**
   * ```css
   * .dropShadow\:\:\$2xl {
   *   --filter-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
   * }
   * ```
   */
  $2xl: ClassName;
  /**
   * ```css
   * .dropShadow\:\:\$none {
   *   --filter-drop-shadow: drop-shadow(0 0 #0000);
   * }
   * ```
   */
  $none: ClassName;
}

interface BackdropDropShadowAtomStyle {
  /**
   * ```css
   * .backdropDropShadow\:\:\$ {
   *   --backdrop-drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
   * }
   * ```
   */
  $: ClassName;
  /**
   * ```css
   * .backdropDropShadow\:\:\$sm {
   *   --backdrop-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
   * }
   * ```
   */
  $sm: ClassName;
  /**
   * ```css
   * .backdropDropShadow\:\:\$md {
   *   --backdrop-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
   * }
   * ```
   */
  $md: ClassName;
  /**
   * ```css
   * .backdropDropShadow\:\:\$lg {
   *   --backdrop-drop-shadow: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
   * }
   * ```
   */
  $lg: ClassName;
  /**
   * ```css
   * .backdropDropShadow\:\:\$xl {
   *   --backdrop-drop-shadow: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
   * }
   * ```
   */
  $xl: ClassName;
  /**
   * ```css
   * .backdropDropShadow\:\:\$2xl {
   *   --backdrop-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
   * }
   * ```
   */
  $2xl: ClassName;
  /**
   * ```css
   * .backdropDropShadow\:\:\$none {
   *   --backdrop-drop-shadow: drop-shadow(0 0 #0000);
   * }
   * ```
   */
  $none: ClassName;
}

interface GrayScaleAtomStyle {
  /**
   * ```css
   * .grayScale\:\:\$0 {}
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .grayScale\:\:\$25 {}
   * ```
   */
  $25: ClassName;
  /**
   * ```css
   * .grayScale\:\:\$50 {}
   * ```
   */
  $50: ClassName;
  /**
   * ```css
   * .grayScale\:\:\$75 {}
   * ```
   */
  $75: ClassName;
  /**
   * ```css
   * .grayScale\:\:\$100 {}
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .grayScale\:\:\$ {}
   * ```
   */
  $: ClassName;
}

interface BackdropGrayScaleAtomStyle {
  /**
   * ```css
   * .backdropGrayScale\:\:\$0 {}
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .backdropGrayScale\:\:\$25 {}
   * ```
   */
  $25: ClassName;
  /**
   * ```css
   * .backdropGrayScale\:\:\$50 {}
   * ```
   */
  $50: ClassName;
  /**
   * ```css
   * .backdropGrayScale\:\:\$75 {}
   * ```
   */
  $75: ClassName;
  /**
   * ```css
   * .backdropGrayScale\:\:\$100 {}
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .backdropGrayScale\:\:\$ {}
   * ```
   */
  $: ClassName;
}

interface HueRotateAtomStyle {
  /**
   * ```css
   * .hueRotate\:\:\$0 {
   *   --filter-hue-rotate: hue-rotate(0deg);
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .hueRotate\:\:\$15 {
   *   --filter-hue-rotate: hue-rotate(15deg);
   * }
   * ```
   */
  $15: ClassName;
  /**
   * ```css
   * .hueRotate\:\:\$30 {
   *   --filter-hue-rotate: hue-rotate(30deg);
   * }
   * ```
   */
  $30: ClassName;
  /**
   * ```css
   * .hueRotate\:\:\$60 {
   *   --filter-hue-rotate: hue-rotate(60deg);
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .hueRotate\:\:\$90 {
   *   --filter-hue-rotate: hue-rotate(90deg);
   * }
   * ```
   */
  $90: ClassName;
  /**
   * ```css
   * .hueRotate\:\:\$180 {
   *   --filter-hue-rotate: hue-rotate(180deg);
   * }
   * ```
   */
  $180: ClassName;
}

interface BackdropHueRotateAtomStyle {
  /**
   * ```css
   * .backdropHueRotate\:\:\$0 {
   *   --backdrop-hue-rotate: hue-rotate(0deg);
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .backdropHueRotate\:\:\$15 {
   *   --backdrop-hue-rotate: hue-rotate(15deg);
   * }
   * ```
   */
  $15: ClassName;
  /**
   * ```css
   * .backdropHueRotate\:\:\$30 {
   *   --backdrop-hue-rotate: hue-rotate(30deg);
   * }
   * ```
   */
  $30: ClassName;
  /**
   * ```css
   * .backdropHueRotate\:\:\$60 {
   *   --backdrop-hue-rotate: hue-rotate(60deg);
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .backdropHueRotate\:\:\$90 {
   *   --backdrop-hue-rotate: hue-rotate(90deg);
   * }
   * ```
   */
  $90: ClassName;
  /**
   * ```css
   * .backdropHueRotate\:\:\$180 {
   *   --backdrop-hue-rotate: hue-rotate(180deg);
   * }
   * ```
   */
  $180: ClassName;
}

interface InvertAtomStyle {
  /**
   * ```css
   * .invert\:\:\$0 {
   *   --filter-invert: invert(0);
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .invert\:\:\$100 {
   *   --filter-invert: invert(100%);
   * }
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .invert\:\:\$ {
   *   --filter-invert: invert(100%);
   * }
   * ```
   */
  $: ClassName;
}

interface BackdropInvertAtomStyle {
  /**
   * ```css
   * .backdropInvert\:\:\$0 {
   *   --backdrop-invert: invert(0);
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .backdropInvert\:\:\$100 {
   *   --backdrop-invert: invert(100%);
   * }
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .backdropInvert\:\:\$ {
   *   --backdrop-invert: invert(100%);
   * }
   * ```
   */
  $: ClassName;
}

interface SaturateAtomStyle {
  /**
   * ```css
   * .saturate\:\:\$0 {
   *   --filter-saturate: saturate(0);
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .saturate\:\:\$50 {
   *   --filter-saturate: saturate(.5);
   * }
   * ```
   */
  $50: ClassName;
  /**
   * ```css
   * .saturate\:\:\$100 {
   *   --filter-saturate: saturate(1);
   * }
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .saturate\:\:\$150 {
   *   --filter-saturate: saturate(1.5);
   * }
   * ```
   */
  $150: ClassName;
  /**
   * ```css
   * .saturate\:\:\$200 {
   *   --filter-saturate: saturate(2);
   * }
   * ```
   */
  $200: ClassName;
}

interface BackdropSaturateAtomStyle {
  /**
   * ```css
   * .backdropSaturate\:\:\$0 {
   *   --backdrop-saturate: saturate(0);
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .backdropSaturate\:\:\$50 {
   *   --backdrop-saturate: saturate(.5);
   * }
   * ```
   */
  $50: ClassName;
  /**
   * ```css
   * .backdropSaturate\:\:\$100 {
   *   --backdrop-saturate: saturate(1);
   * }
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .backdropSaturate\:\:\$150 {
   *   --backdrop-saturate: saturate(1.5);
   * }
   * ```
   */
  $150: ClassName;
  /**
   * ```css
   * .backdropSaturate\:\:\$200 {
   *   --backdrop-saturate: saturate(2);
   * }
   * ```
   */
  $200: ClassName;
}

interface SepiaAtomStyle {
  /**
   * ```css
   * .sepia\:\:\$0 {
   *   --filter-sepia: sepia(0);
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .sepia\:\:\$100 {
   *   --filter-sepia: sepia(100%);
   * }
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .sepia\:\:\$ {
   *   --filter-sepia: sepia(100%);
   * }
   * ```
   */
  $: ClassName;
}

interface BackdropSepiaAtomStyle {
  /**
   * ```css
   * .backdropSepia\:\:\$0 {
   *   --backdrop-sepia: sepia(0);
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .backdropSepia\:\:\$100 {
   *   --backdrop-sepia: sepia(100%);
   * }
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .backdropSepia\:\:\$ {
   *   --backdrop-sepia: sepia(100%);
   * }
   * ```
   */
  $: ClassName;
}

interface FilterAtomStyle {
  /**
   * ```css
   * .filter\:\:\$rough {
   *   --filter-custom: var(--custom-filter-roughen);
   * }
   * ```
   */
  $rough: ClassName;
}

interface BackdropAtomStyle {
  /**
   * ```css
   * .backdrop\:\:\$rough {
   *   --backdrop-custom: var(--custom-filter-roughen);
   * }
   * ```
   */
  $rough: ClassName;
}

interface PAtomStyle {
  /**
   * ```css
   * .p\:\:\$0 {
   *   padding: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .p\:\:\$1 {
   *   padding: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .p\:\:\$2 {
   *   padding: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .p\:\:\$3 {
   *   padding: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .p\:\:\$4 {
   *   padding: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .p\:\:\$5 {
   *   padding: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .p\:\:\$6 {
   *   padding: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .p\:\:\$7 {
   *   padding: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .p\:\:\$8 {
   *   padding: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .p\:\:\$9 {
   *   padding: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .p\:\:\$10 {
   *   padding: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .p\:\:\$11 {
   *   padding: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .p\:\:\$12 {
   *   padding: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .p\:\:\$14 {
   *   padding: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .p\:\:\$16 {
   *   padding: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .p\:\:\$20 {
   *   padding: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .p\:\:\$24 {
   *   padding: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .p\:\:\$28 {
   *   padding: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .p\:\:\$32 {
   *   padding: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .p\:\:\$36 {
   *   padding: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .p\:\:\$40 {
   *   padding: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .p\:\:\$44 {
   *   padding: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .p\:\:\$48 {
   *   padding: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .p\:\:\$52 {
   *   padding: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .p\:\:\$56 {
   *   padding: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .p\:\:\$60 {
   *   padding: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .p\:\:\$64 {
   *   padding: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .p\:\:\$72 {
   *   padding: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .p\:\:\$80 {
   *   padding: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .p\:\:\$96 {
   *   padding: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .p\:\:\$px {
   *   padding: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .p\:\:\$0_5 {
   *   padding: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .p\:\:\$1_5 {
   *   padding: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .p\:\:\$2_5 {
   *   padding: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .p\:\:\$3_5 {
   *   padding: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface PyAtomStyle {
  /**
   * ```css
   * .py\:\:\$0 {
   *   padding-top: 0px;
   *   padding-bottom: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .py\:\:\$1 {
   *   padding-top: 0.25rem;
   *   padding-bottom: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .py\:\:\$2 {
   *   padding-top: 0.5rem;
   *   padding-bottom: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .py\:\:\$3 {
   *   padding-top: 0.75rem;
   *   padding-bottom: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .py\:\:\$4 {
   *   padding-top: 1rem;
   *   padding-bottom: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .py\:\:\$5 {
   *   padding-top: 1.25rem;
   *   padding-bottom: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .py\:\:\$6 {
   *   padding-top: 1.5rem;
   *   padding-bottom: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .py\:\:\$7 {
   *   padding-top: 1.75rem;
   *   padding-bottom: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .py\:\:\$8 {
   *   padding-top: 2rem;
   *   padding-bottom: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .py\:\:\$9 {
   *   padding-top: 2.25rem;
   *   padding-bottom: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .py\:\:\$10 {
   *   padding-top: 2.5rem;
   *   padding-bottom: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .py\:\:\$11 {
   *   padding-top: 2.75rem;
   *   padding-bottom: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .py\:\:\$12 {
   *   padding-top: 3rem;
   *   padding-bottom: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .py\:\:\$14 {
   *   padding-top: 3.5rem;
   *   padding-bottom: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .py\:\:\$16 {
   *   padding-top: 4rem;
   *   padding-bottom: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .py\:\:\$20 {
   *   padding-top: 5rem;
   *   padding-bottom: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .py\:\:\$24 {
   *   padding-top: 6rem;
   *   padding-bottom: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .py\:\:\$28 {
   *   padding-top: 7rem;
   *   padding-bottom: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .py\:\:\$32 {
   *   padding-top: 8rem;
   *   padding-bottom: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .py\:\:\$36 {
   *   padding-top: 9rem;
   *   padding-bottom: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .py\:\:\$40 {
   *   padding-top: 10rem;
   *   padding-bottom: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .py\:\:\$44 {
   *   padding-top: 11rem;
   *   padding-bottom: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .py\:\:\$48 {
   *   padding-top: 12rem;
   *   padding-bottom: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .py\:\:\$52 {
   *   padding-top: 13rem;
   *   padding-bottom: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .py\:\:\$56 {
   *   padding-top: 14rem;
   *   padding-bottom: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .py\:\:\$60 {
   *   padding-top: 15rem;
   *   padding-bottom: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .py\:\:\$64 {
   *   padding-top: 16rem;
   *   padding-bottom: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .py\:\:\$72 {
   *   padding-top: 18rem;
   *   padding-bottom: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .py\:\:\$80 {
   *   padding-top: 20rem;
   *   padding-bottom: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .py\:\:\$96 {
   *   padding-top: 24rem;
   *   padding-bottom: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .py\:\:\$px {
   *   padding-top: 1px;
   *   padding-bottom: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .py\:\:\$0_5 {
   *   padding-top: 0.125rem;
   *   padding-bottom: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .py\:\:\$1_5 {
   *   padding-top: 0.375rem;
   *   padding-bottom: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .py\:\:\$2_5 {
   *   padding-top: 0.625rem;
   *   padding-bottom: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .py\:\:\$3_5 {
   *   padding-top: 0.875rem;
   *   padding-bottom: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface PxAtomStyle {
  /**
   * ```css
   * .px\:\:\$0 {
   *   padding-right: 0px;
   *   padding-left: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .px\:\:\$1 {
   *   padding-right: 0.25rem;
   *   padding-left: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .px\:\:\$2 {
   *   padding-right: 0.5rem;
   *   padding-left: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .px\:\:\$3 {
   *   padding-right: 0.75rem;
   *   padding-left: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .px\:\:\$4 {
   *   padding-right: 1rem;
   *   padding-left: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .px\:\:\$5 {
   *   padding-right: 1.25rem;
   *   padding-left: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .px\:\:\$6 {
   *   padding-right: 1.5rem;
   *   padding-left: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .px\:\:\$7 {
   *   padding-right: 1.75rem;
   *   padding-left: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .px\:\:\$8 {
   *   padding-right: 2rem;
   *   padding-left: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .px\:\:\$9 {
   *   padding-right: 2.25rem;
   *   padding-left: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .px\:\:\$10 {
   *   padding-right: 2.5rem;
   *   padding-left: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .px\:\:\$11 {
   *   padding-right: 2.75rem;
   *   padding-left: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .px\:\:\$12 {
   *   padding-right: 3rem;
   *   padding-left: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .px\:\:\$14 {
   *   padding-right: 3.5rem;
   *   padding-left: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .px\:\:\$16 {
   *   padding-right: 4rem;
   *   padding-left: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .px\:\:\$20 {
   *   padding-right: 5rem;
   *   padding-left: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .px\:\:\$24 {
   *   padding-right: 6rem;
   *   padding-left: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .px\:\:\$28 {
   *   padding-right: 7rem;
   *   padding-left: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .px\:\:\$32 {
   *   padding-right: 8rem;
   *   padding-left: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .px\:\:\$36 {
   *   padding-right: 9rem;
   *   padding-left: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .px\:\:\$40 {
   *   padding-right: 10rem;
   *   padding-left: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .px\:\:\$44 {
   *   padding-right: 11rem;
   *   padding-left: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .px\:\:\$48 {
   *   padding-right: 12rem;
   *   padding-left: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .px\:\:\$52 {
   *   padding-right: 13rem;
   *   padding-left: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .px\:\:\$56 {
   *   padding-right: 14rem;
   *   padding-left: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .px\:\:\$60 {
   *   padding-right: 15rem;
   *   padding-left: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .px\:\:\$64 {
   *   padding-right: 16rem;
   *   padding-left: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .px\:\:\$72 {
   *   padding-right: 18rem;
   *   padding-left: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .px\:\:\$80 {
   *   padding-right: 20rem;
   *   padding-left: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .px\:\:\$96 {
   *   padding-right: 24rem;
   *   padding-left: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .px\:\:\$px {
   *   padding-right: 1px;
   *   padding-left: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .px\:\:\$0_5 {
   *   padding-right: 0.125rem;
   *   padding-left: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .px\:\:\$1_5 {
   *   padding-right: 0.375rem;
   *   padding-left: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .px\:\:\$2_5 {
   *   padding-right: 0.625rem;
   *   padding-left: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .px\:\:\$3_5 {
   *   padding-right: 0.875rem;
   *   padding-left: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface PtAtomStyle {
  /**
   * ```css
   * .pt\:\:\$0 {
   *   padding-top: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .pt\:\:\$1 {
   *   padding-top: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .pt\:\:\$2 {
   *   padding-top: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .pt\:\:\$3 {
   *   padding-top: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .pt\:\:\$4 {
   *   padding-top: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .pt\:\:\$5 {
   *   padding-top: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .pt\:\:\$6 {
   *   padding-top: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .pt\:\:\$7 {
   *   padding-top: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .pt\:\:\$8 {
   *   padding-top: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .pt\:\:\$9 {
   *   padding-top: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .pt\:\:\$10 {
   *   padding-top: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .pt\:\:\$11 {
   *   padding-top: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .pt\:\:\$12 {
   *   padding-top: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .pt\:\:\$14 {
   *   padding-top: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .pt\:\:\$16 {
   *   padding-top: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .pt\:\:\$20 {
   *   padding-top: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .pt\:\:\$24 {
   *   padding-top: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .pt\:\:\$28 {
   *   padding-top: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .pt\:\:\$32 {
   *   padding-top: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .pt\:\:\$36 {
   *   padding-top: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .pt\:\:\$40 {
   *   padding-top: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .pt\:\:\$44 {
   *   padding-top: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .pt\:\:\$48 {
   *   padding-top: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .pt\:\:\$52 {
   *   padding-top: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .pt\:\:\$56 {
   *   padding-top: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .pt\:\:\$60 {
   *   padding-top: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .pt\:\:\$64 {
   *   padding-top: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .pt\:\:\$72 {
   *   padding-top: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .pt\:\:\$80 {
   *   padding-top: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .pt\:\:\$96 {
   *   padding-top: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .pt\:\:\$px {
   *   padding-top: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .pt\:\:\$0_5 {
   *   padding-top: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .pt\:\:\$1_5 {
   *   padding-top: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .pt\:\:\$2_5 {
   *   padding-top: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .pt\:\:\$3_5 {
   *   padding-top: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface PrAtomStyle {
  /**
   * ```css
   * .pr\:\:\$0 {
   *   padding-right: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .pr\:\:\$1 {
   *   padding-right: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .pr\:\:\$2 {
   *   padding-right: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .pr\:\:\$3 {
   *   padding-right: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .pr\:\:\$4 {
   *   padding-right: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .pr\:\:\$5 {
   *   padding-right: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .pr\:\:\$6 {
   *   padding-right: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .pr\:\:\$7 {
   *   padding-right: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .pr\:\:\$8 {
   *   padding-right: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .pr\:\:\$9 {
   *   padding-right: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .pr\:\:\$10 {
   *   padding-right: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .pr\:\:\$11 {
   *   padding-right: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .pr\:\:\$12 {
   *   padding-right: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .pr\:\:\$14 {
   *   padding-right: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .pr\:\:\$16 {
   *   padding-right: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .pr\:\:\$20 {
   *   padding-right: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .pr\:\:\$24 {
   *   padding-right: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .pr\:\:\$28 {
   *   padding-right: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .pr\:\:\$32 {
   *   padding-right: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .pr\:\:\$36 {
   *   padding-right: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .pr\:\:\$40 {
   *   padding-right: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .pr\:\:\$44 {
   *   padding-right: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .pr\:\:\$48 {
   *   padding-right: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .pr\:\:\$52 {
   *   padding-right: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .pr\:\:\$56 {
   *   padding-right: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .pr\:\:\$60 {
   *   padding-right: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .pr\:\:\$64 {
   *   padding-right: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .pr\:\:\$72 {
   *   padding-right: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .pr\:\:\$80 {
   *   padding-right: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .pr\:\:\$96 {
   *   padding-right: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .pr\:\:\$px {
   *   padding-right: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .pr\:\:\$0_5 {
   *   padding-right: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .pr\:\:\$1_5 {
   *   padding-right: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .pr\:\:\$2_5 {
   *   padding-right: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .pr\:\:\$3_5 {
   *   padding-right: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface PbAtomStyle {
  /**
   * ```css
   * .pb\:\:\$0 {
   *   padding-bottom: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .pb\:\:\$1 {
   *   padding-bottom: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .pb\:\:\$2 {
   *   padding-bottom: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .pb\:\:\$3 {
   *   padding-bottom: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .pb\:\:\$4 {
   *   padding-bottom: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .pb\:\:\$5 {
   *   padding-bottom: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .pb\:\:\$6 {
   *   padding-bottom: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .pb\:\:\$7 {
   *   padding-bottom: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .pb\:\:\$8 {
   *   padding-bottom: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .pb\:\:\$9 {
   *   padding-bottom: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .pb\:\:\$10 {
   *   padding-bottom: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .pb\:\:\$11 {
   *   padding-bottom: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .pb\:\:\$12 {
   *   padding-bottom: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .pb\:\:\$14 {
   *   padding-bottom: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .pb\:\:\$16 {
   *   padding-bottom: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .pb\:\:\$20 {
   *   padding-bottom: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .pb\:\:\$24 {
   *   padding-bottom: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .pb\:\:\$28 {
   *   padding-bottom: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .pb\:\:\$32 {
   *   padding-bottom: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .pb\:\:\$36 {
   *   padding-bottom: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .pb\:\:\$40 {
   *   padding-bottom: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .pb\:\:\$44 {
   *   padding-bottom: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .pb\:\:\$48 {
   *   padding-bottom: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .pb\:\:\$52 {
   *   padding-bottom: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .pb\:\:\$56 {
   *   padding-bottom: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .pb\:\:\$60 {
   *   padding-bottom: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .pb\:\:\$64 {
   *   padding-bottom: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .pb\:\:\$72 {
   *   padding-bottom: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .pb\:\:\$80 {
   *   padding-bottom: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .pb\:\:\$96 {
   *   padding-bottom: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .pb\:\:\$px {
   *   padding-bottom: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .pb\:\:\$0_5 {
   *   padding-bottom: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .pb\:\:\$1_5 {
   *   padding-bottom: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .pb\:\:\$2_5 {
   *   padding-bottom: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .pb\:\:\$3_5 {
   *   padding-bottom: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface PlAtomStyle {
  /**
   * ```css
   * .pl\:\:\$0 {
   *   padding-left: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .pl\:\:\$1 {
   *   padding-left: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .pl\:\:\$2 {
   *   padding-left: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .pl\:\:\$3 {
   *   padding-left: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .pl\:\:\$4 {
   *   padding-left: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .pl\:\:\$5 {
   *   padding-left: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .pl\:\:\$6 {
   *   padding-left: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .pl\:\:\$7 {
   *   padding-left: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .pl\:\:\$8 {
   *   padding-left: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .pl\:\:\$9 {
   *   padding-left: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .pl\:\:\$10 {
   *   padding-left: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .pl\:\:\$11 {
   *   padding-left: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .pl\:\:\$12 {
   *   padding-left: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .pl\:\:\$14 {
   *   padding-left: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .pl\:\:\$16 {
   *   padding-left: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .pl\:\:\$20 {
   *   padding-left: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .pl\:\:\$24 {
   *   padding-left: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .pl\:\:\$28 {
   *   padding-left: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .pl\:\:\$32 {
   *   padding-left: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .pl\:\:\$36 {
   *   padding-left: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .pl\:\:\$40 {
   *   padding-left: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .pl\:\:\$44 {
   *   padding-left: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .pl\:\:\$48 {
   *   padding-left: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .pl\:\:\$52 {
   *   padding-left: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .pl\:\:\$56 {
   *   padding-left: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .pl\:\:\$60 {
   *   padding-left: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .pl\:\:\$64 {
   *   padding-left: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .pl\:\:\$72 {
   *   padding-left: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .pl\:\:\$80 {
   *   padding-left: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .pl\:\:\$96 {
   *   padding-left: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .pl\:\:\$px {
   *   padding-left: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .pl\:\:\$0_5 {
   *   padding-left: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .pl\:\:\$1_5 {
   *   padding-left: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .pl\:\:\$2_5 {
   *   padding-left: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .pl\:\:\$3_5 {
   *   padding-left: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface PblAtomStyle {
  /**
   * ```css
   * .pbl\:\:\$0 {
   *   padding-block: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .pbl\:\:\$1 {
   *   padding-block: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .pbl\:\:\$2 {
   *   padding-block: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .pbl\:\:\$3 {
   *   padding-block: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .pbl\:\:\$4 {
   *   padding-block: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .pbl\:\:\$5 {
   *   padding-block: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .pbl\:\:\$6 {
   *   padding-block: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .pbl\:\:\$7 {
   *   padding-block: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .pbl\:\:\$8 {
   *   padding-block: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .pbl\:\:\$9 {
   *   padding-block: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .pbl\:\:\$10 {
   *   padding-block: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .pbl\:\:\$11 {
   *   padding-block: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .pbl\:\:\$12 {
   *   padding-block: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .pbl\:\:\$14 {
   *   padding-block: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .pbl\:\:\$16 {
   *   padding-block: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .pbl\:\:\$20 {
   *   padding-block: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .pbl\:\:\$24 {
   *   padding-block: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .pbl\:\:\$28 {
   *   padding-block: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .pbl\:\:\$32 {
   *   padding-block: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .pbl\:\:\$36 {
   *   padding-block: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .pbl\:\:\$40 {
   *   padding-block: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .pbl\:\:\$44 {
   *   padding-block: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .pbl\:\:\$48 {
   *   padding-block: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .pbl\:\:\$52 {
   *   padding-block: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .pbl\:\:\$56 {
   *   padding-block: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .pbl\:\:\$60 {
   *   padding-block: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .pbl\:\:\$64 {
   *   padding-block: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .pbl\:\:\$72 {
   *   padding-block: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .pbl\:\:\$80 {
   *   padding-block: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .pbl\:\:\$96 {
   *   padding-block: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .pbl\:\:\$px {
   *   padding-block: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .pbl\:\:\$0_5 {
   *   padding-block: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .pbl\:\:\$1_5 {
   *   padding-block: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .pbl\:\:\$2_5 {
   *   padding-block: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .pbl\:\:\$3_5 {
   *   padding-block: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface PinAtomStyle {
  /**
   * ```css
   * .pin\:\:\$0 {
   *   padding-inline: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .pin\:\:\$1 {
   *   padding-inline: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .pin\:\:\$2 {
   *   padding-inline: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .pin\:\:\$3 {
   *   padding-inline: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .pin\:\:\$4 {
   *   padding-inline: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .pin\:\:\$5 {
   *   padding-inline: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .pin\:\:\$6 {
   *   padding-inline: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .pin\:\:\$7 {
   *   padding-inline: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .pin\:\:\$8 {
   *   padding-inline: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .pin\:\:\$9 {
   *   padding-inline: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .pin\:\:\$10 {
   *   padding-inline: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .pin\:\:\$11 {
   *   padding-inline: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .pin\:\:\$12 {
   *   padding-inline: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .pin\:\:\$14 {
   *   padding-inline: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .pin\:\:\$16 {
   *   padding-inline: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .pin\:\:\$20 {
   *   padding-inline: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .pin\:\:\$24 {
   *   padding-inline: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .pin\:\:\$28 {
   *   padding-inline: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .pin\:\:\$32 {
   *   padding-inline: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .pin\:\:\$36 {
   *   padding-inline: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .pin\:\:\$40 {
   *   padding-inline: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .pin\:\:\$44 {
   *   padding-inline: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .pin\:\:\$48 {
   *   padding-inline: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .pin\:\:\$52 {
   *   padding-inline: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .pin\:\:\$56 {
   *   padding-inline: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .pin\:\:\$60 {
   *   padding-inline: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .pin\:\:\$64 {
   *   padding-inline: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .pin\:\:\$72 {
   *   padding-inline: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .pin\:\:\$80 {
   *   padding-inline: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .pin\:\:\$96 {
   *   padding-inline: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .pin\:\:\$px {
   *   padding-inline: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .pin\:\:\$0_5 {
   *   padding-inline: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .pin\:\:\$1_5 {
   *   padding-inline: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .pin\:\:\$2_5 {
   *   padding-inline: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .pin\:\:\$3_5 {
   *   padding-inline: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface PinsAtomStyle {
  /**
   * ```css
   * .pins\:\:\$0 {
   *   padding-inline-start: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .pins\:\:\$1 {
   *   padding-inline-start: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .pins\:\:\$2 {
   *   padding-inline-start: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .pins\:\:\$3 {
   *   padding-inline-start: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .pins\:\:\$4 {
   *   padding-inline-start: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .pins\:\:\$5 {
   *   padding-inline-start: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .pins\:\:\$6 {
   *   padding-inline-start: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .pins\:\:\$7 {
   *   padding-inline-start: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .pins\:\:\$8 {
   *   padding-inline-start: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .pins\:\:\$9 {
   *   padding-inline-start: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .pins\:\:\$10 {
   *   padding-inline-start: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .pins\:\:\$11 {
   *   padding-inline-start: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .pins\:\:\$12 {
   *   padding-inline-start: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .pins\:\:\$14 {
   *   padding-inline-start: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .pins\:\:\$16 {
   *   padding-inline-start: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .pins\:\:\$20 {
   *   padding-inline-start: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .pins\:\:\$24 {
   *   padding-inline-start: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .pins\:\:\$28 {
   *   padding-inline-start: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .pins\:\:\$32 {
   *   padding-inline-start: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .pins\:\:\$36 {
   *   padding-inline-start: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .pins\:\:\$40 {
   *   padding-inline-start: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .pins\:\:\$44 {
   *   padding-inline-start: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .pins\:\:\$48 {
   *   padding-inline-start: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .pins\:\:\$52 {
   *   padding-inline-start: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .pins\:\:\$56 {
   *   padding-inline-start: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .pins\:\:\$60 {
   *   padding-inline-start: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .pins\:\:\$64 {
   *   padding-inline-start: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .pins\:\:\$72 {
   *   padding-inline-start: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .pins\:\:\$80 {
   *   padding-inline-start: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .pins\:\:\$96 {
   *   padding-inline-start: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .pins\:\:\$px {
   *   padding-inline-start: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .pins\:\:\$0_5 {
   *   padding-inline-start: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .pins\:\:\$1_5 {
   *   padding-inline-start: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .pins\:\:\$2_5 {
   *   padding-inline-start: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .pins\:\:\$3_5 {
   *   padding-inline-start: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface PineAtomStyle {
  /**
   * ```css
   * .pine\:\:\$0 {
   *   padding-inline-end: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .pine\:\:\$1 {
   *   padding-inline-end: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .pine\:\:\$2 {
   *   padding-inline-end: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .pine\:\:\$3 {
   *   padding-inline-end: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .pine\:\:\$4 {
   *   padding-inline-end: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .pine\:\:\$5 {
   *   padding-inline-end: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .pine\:\:\$6 {
   *   padding-inline-end: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .pine\:\:\$7 {
   *   padding-inline-end: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .pine\:\:\$8 {
   *   padding-inline-end: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .pine\:\:\$9 {
   *   padding-inline-end: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .pine\:\:\$10 {
   *   padding-inline-end: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .pine\:\:\$11 {
   *   padding-inline-end: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .pine\:\:\$12 {
   *   padding-inline-end: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .pine\:\:\$14 {
   *   padding-inline-end: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .pine\:\:\$16 {
   *   padding-inline-end: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .pine\:\:\$20 {
   *   padding-inline-end: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .pine\:\:\$24 {
   *   padding-inline-end: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .pine\:\:\$28 {
   *   padding-inline-end: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .pine\:\:\$32 {
   *   padding-inline-end: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .pine\:\:\$36 {
   *   padding-inline-end: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .pine\:\:\$40 {
   *   padding-inline-end: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .pine\:\:\$44 {
   *   padding-inline-end: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .pine\:\:\$48 {
   *   padding-inline-end: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .pine\:\:\$52 {
   *   padding-inline-end: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .pine\:\:\$56 {
   *   padding-inline-end: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .pine\:\:\$60 {
   *   padding-inline-end: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .pine\:\:\$64 {
   *   padding-inline-end: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .pine\:\:\$72 {
   *   padding-inline-end: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .pine\:\:\$80 {
   *   padding-inline-end: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .pine\:\:\$96 {
   *   padding-inline-end: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .pine\:\:\$px {
   *   padding-inline-end: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .pine\:\:\$0_5 {
   *   padding-inline-end: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .pine\:\:\$1_5 {
   *   padding-inline-end: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .pine\:\:\$2_5 {
   *   padding-inline-end: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .pine\:\:\$3_5 {
   *   padding-inline-end: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface PblsAtomStyle {
  /**
   * ```css
   * .pbls\:\:\$0 {
   *   padding-block-start: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .pbls\:\:\$1 {
   *   padding-block-start: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .pbls\:\:\$2 {
   *   padding-block-start: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .pbls\:\:\$3 {
   *   padding-block-start: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .pbls\:\:\$4 {
   *   padding-block-start: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .pbls\:\:\$5 {
   *   padding-block-start: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .pbls\:\:\$6 {
   *   padding-block-start: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .pbls\:\:\$7 {
   *   padding-block-start: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .pbls\:\:\$8 {
   *   padding-block-start: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .pbls\:\:\$9 {
   *   padding-block-start: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .pbls\:\:\$10 {
   *   padding-block-start: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .pbls\:\:\$11 {
   *   padding-block-start: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .pbls\:\:\$12 {
   *   padding-block-start: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .pbls\:\:\$14 {
   *   padding-block-start: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .pbls\:\:\$16 {
   *   padding-block-start: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .pbls\:\:\$20 {
   *   padding-block-start: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .pbls\:\:\$24 {
   *   padding-block-start: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .pbls\:\:\$28 {
   *   padding-block-start: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .pbls\:\:\$32 {
   *   padding-block-start: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .pbls\:\:\$36 {
   *   padding-block-start: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .pbls\:\:\$40 {
   *   padding-block-start: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .pbls\:\:\$44 {
   *   padding-block-start: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .pbls\:\:\$48 {
   *   padding-block-start: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .pbls\:\:\$52 {
   *   padding-block-start: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .pbls\:\:\$56 {
   *   padding-block-start: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .pbls\:\:\$60 {
   *   padding-block-start: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .pbls\:\:\$64 {
   *   padding-block-start: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .pbls\:\:\$72 {
   *   padding-block-start: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .pbls\:\:\$80 {
   *   padding-block-start: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .pbls\:\:\$96 {
   *   padding-block-start: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .pbls\:\:\$px {
   *   padding-block-start: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .pbls\:\:\$0_5 {
   *   padding-block-start: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .pbls\:\:\$1_5 {
   *   padding-block-start: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .pbls\:\:\$2_5 {
   *   padding-block-start: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .pbls\:\:\$3_5 {
   *   padding-block-start: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface PbleAtomStyle {
  /**
   * ```css
   * .pble\:\:\$0 {
   *   padding-block-end: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .pble\:\:\$1 {
   *   padding-block-end: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .pble\:\:\$2 {
   *   padding-block-end: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .pble\:\:\$3 {
   *   padding-block-end: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .pble\:\:\$4 {
   *   padding-block-end: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .pble\:\:\$5 {
   *   padding-block-end: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .pble\:\:\$6 {
   *   padding-block-end: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .pble\:\:\$7 {
   *   padding-block-end: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .pble\:\:\$8 {
   *   padding-block-end: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .pble\:\:\$9 {
   *   padding-block-end: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .pble\:\:\$10 {
   *   padding-block-end: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .pble\:\:\$11 {
   *   padding-block-end: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .pble\:\:\$12 {
   *   padding-block-end: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .pble\:\:\$14 {
   *   padding-block-end: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .pble\:\:\$16 {
   *   padding-block-end: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .pble\:\:\$20 {
   *   padding-block-end: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .pble\:\:\$24 {
   *   padding-block-end: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .pble\:\:\$28 {
   *   padding-block-end: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .pble\:\:\$32 {
   *   padding-block-end: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .pble\:\:\$36 {
   *   padding-block-end: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .pble\:\:\$40 {
   *   padding-block-end: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .pble\:\:\$44 {
   *   padding-block-end: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .pble\:\:\$48 {
   *   padding-block-end: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .pble\:\:\$52 {
   *   padding-block-end: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .pble\:\:\$56 {
   *   padding-block-end: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .pble\:\:\$60 {
   *   padding-block-end: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .pble\:\:\$64 {
   *   padding-block-end: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .pble\:\:\$72 {
   *   padding-block-end: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .pble\:\:\$80 {
   *   padding-block-end: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .pble\:\:\$96 {
   *   padding-block-end: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .pble\:\:\$px {
   *   padding-block-end: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .pble\:\:\$0_5 {
   *   padding-block-end: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .pble\:\:\$1_5 {
   *   padding-block-end: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .pble\:\:\$2_5 {
   *   padding-block-end: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .pble\:\:\$3_5 {
   *   padding-block-end: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface MAtomStyle {
  /**
   * ```css
   * .m\:\:\$0 {
   *   margin: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .m\:\:\$1 {
   *   margin: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .m\:\:\$2 {
   *   margin: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .m\:\:\$3 {
   *   margin: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .m\:\:\$4 {
   *   margin: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .m\:\:\$5 {
   *   margin: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .m\:\:\$6 {
   *   margin: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .m\:\:\$7 {
   *   margin: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .m\:\:\$8 {
   *   margin: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .m\:\:\$9 {
   *   margin: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .m\:\:\$10 {
   *   margin: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .m\:\:\$11 {
   *   margin: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .m\:\:\$12 {
   *   margin: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .m\:\:\$14 {
   *   margin: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .m\:\:\$16 {
   *   margin: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .m\:\:\$20 {
   *   margin: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .m\:\:\$24 {
   *   margin: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .m\:\:\$28 {
   *   margin: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .m\:\:\$32 {
   *   margin: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .m\:\:\$36 {
   *   margin: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .m\:\:\$40 {
   *   margin: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .m\:\:\$44 {
   *   margin: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .m\:\:\$48 {
   *   margin: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .m\:\:\$52 {
   *   margin: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .m\:\:\$56 {
   *   margin: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .m\:\:\$60 {
   *   margin: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .m\:\:\$64 {
   *   margin: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .m\:\:\$72 {
   *   margin: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .m\:\:\$80 {
   *   margin: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .m\:\:\$96 {
   *   margin: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .m\:\:\$px {
   *   margin: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .m\:\:\$0_5 {
   *   margin: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .m\:\:\$1_5 {
   *   margin: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .m\:\:\$2_5 {
   *   margin: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .m\:\:\$3_5 {
   *   margin: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface MyAtomStyle {
  /**
   * ```css
   * .my\:\:\$0 {
   *   margin-top: 0px;
   *   margin-bottom: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .my\:\:\$1 {
   *   margin-top: 0.25rem;
   *   margin-bottom: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .my\:\:\$2 {
   *   margin-top: 0.5rem;
   *   margin-bottom: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .my\:\:\$3 {
   *   margin-top: 0.75rem;
   *   margin-bottom: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .my\:\:\$4 {
   *   margin-top: 1rem;
   *   margin-bottom: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .my\:\:\$5 {
   *   margin-top: 1.25rem;
   *   margin-bottom: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .my\:\:\$6 {
   *   margin-top: 1.5rem;
   *   margin-bottom: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .my\:\:\$7 {
   *   margin-top: 1.75rem;
   *   margin-bottom: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .my\:\:\$8 {
   *   margin-top: 2rem;
   *   margin-bottom: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .my\:\:\$9 {
   *   margin-top: 2.25rem;
   *   margin-bottom: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .my\:\:\$10 {
   *   margin-top: 2.5rem;
   *   margin-bottom: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .my\:\:\$11 {
   *   margin-top: 2.75rem;
   *   margin-bottom: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .my\:\:\$12 {
   *   margin-top: 3rem;
   *   margin-bottom: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .my\:\:\$14 {
   *   margin-top: 3.5rem;
   *   margin-bottom: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .my\:\:\$16 {
   *   margin-top: 4rem;
   *   margin-bottom: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .my\:\:\$20 {
   *   margin-top: 5rem;
   *   margin-bottom: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .my\:\:\$24 {
   *   margin-top: 6rem;
   *   margin-bottom: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .my\:\:\$28 {
   *   margin-top: 7rem;
   *   margin-bottom: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .my\:\:\$32 {
   *   margin-top: 8rem;
   *   margin-bottom: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .my\:\:\$36 {
   *   margin-top: 9rem;
   *   margin-bottom: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .my\:\:\$40 {
   *   margin-top: 10rem;
   *   margin-bottom: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .my\:\:\$44 {
   *   margin-top: 11rem;
   *   margin-bottom: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .my\:\:\$48 {
   *   margin-top: 12rem;
   *   margin-bottom: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .my\:\:\$52 {
   *   margin-top: 13rem;
   *   margin-bottom: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .my\:\:\$56 {
   *   margin-top: 14rem;
   *   margin-bottom: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .my\:\:\$60 {
   *   margin-top: 15rem;
   *   margin-bottom: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .my\:\:\$64 {
   *   margin-top: 16rem;
   *   margin-bottom: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .my\:\:\$72 {
   *   margin-top: 18rem;
   *   margin-bottom: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .my\:\:\$80 {
   *   margin-top: 20rem;
   *   margin-bottom: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .my\:\:\$96 {
   *   margin-top: 24rem;
   *   margin-bottom: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .my\:\:\$px {
   *   margin-top: 1px;
   *   margin-bottom: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .my\:\:\$0_5 {
   *   margin-top: 0.125rem;
   *   margin-bottom: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .my\:\:\$1_5 {
   *   margin-top: 0.375rem;
   *   margin-bottom: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .my\:\:\$2_5 {
   *   margin-top: 0.625rem;
   *   margin-bottom: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .my\:\:\$3_5 {
   *   margin-top: 0.875rem;
   *   margin-bottom: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface MxAtomStyle {
  /**
   * ```css
   * .mx\:\:\$0 {
   *   margin-right: 0px;
   *   margin-left: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .mx\:\:\$1 {
   *   margin-right: 0.25rem;
   *   margin-left: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .mx\:\:\$2 {
   *   margin-right: 0.5rem;
   *   margin-left: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .mx\:\:\$3 {
   *   margin-right: 0.75rem;
   *   margin-left: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .mx\:\:\$4 {
   *   margin-right: 1rem;
   *   margin-left: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .mx\:\:\$5 {
   *   margin-right: 1.25rem;
   *   margin-left: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .mx\:\:\$6 {
   *   margin-right: 1.5rem;
   *   margin-left: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .mx\:\:\$7 {
   *   margin-right: 1.75rem;
   *   margin-left: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .mx\:\:\$8 {
   *   margin-right: 2rem;
   *   margin-left: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .mx\:\:\$9 {
   *   margin-right: 2.25rem;
   *   margin-left: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .mx\:\:\$10 {
   *   margin-right: 2.5rem;
   *   margin-left: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .mx\:\:\$11 {
   *   margin-right: 2.75rem;
   *   margin-left: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .mx\:\:\$12 {
   *   margin-right: 3rem;
   *   margin-left: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .mx\:\:\$14 {
   *   margin-right: 3.5rem;
   *   margin-left: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .mx\:\:\$16 {
   *   margin-right: 4rem;
   *   margin-left: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .mx\:\:\$20 {
   *   margin-right: 5rem;
   *   margin-left: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .mx\:\:\$24 {
   *   margin-right: 6rem;
   *   margin-left: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .mx\:\:\$28 {
   *   margin-right: 7rem;
   *   margin-left: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .mx\:\:\$32 {
   *   margin-right: 8rem;
   *   margin-left: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .mx\:\:\$36 {
   *   margin-right: 9rem;
   *   margin-left: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .mx\:\:\$40 {
   *   margin-right: 10rem;
   *   margin-left: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .mx\:\:\$44 {
   *   margin-right: 11rem;
   *   margin-left: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .mx\:\:\$48 {
   *   margin-right: 12rem;
   *   margin-left: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .mx\:\:\$52 {
   *   margin-right: 13rem;
   *   margin-left: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .mx\:\:\$56 {
   *   margin-right: 14rem;
   *   margin-left: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .mx\:\:\$60 {
   *   margin-right: 15rem;
   *   margin-left: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .mx\:\:\$64 {
   *   margin-right: 16rem;
   *   margin-left: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .mx\:\:\$72 {
   *   margin-right: 18rem;
   *   margin-left: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .mx\:\:\$80 {
   *   margin-right: 20rem;
   *   margin-left: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .mx\:\:\$96 {
   *   margin-right: 24rem;
   *   margin-left: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .mx\:\:\$px {
   *   margin-right: 1px;
   *   margin-left: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .mx\:\:\$0_5 {
   *   margin-right: 0.125rem;
   *   margin-left: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .mx\:\:\$1_5 {
   *   margin-right: 0.375rem;
   *   margin-left: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .mx\:\:\$2_5 {
   *   margin-right: 0.625rem;
   *   margin-left: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .mx\:\:\$3_5 {
   *   margin-right: 0.875rem;
   *   margin-left: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface MtAtomStyle {
  /**
   * ```css
   * .mt\:\:\$0 {
   *   margin-top: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .mt\:\:\$1 {
   *   margin-top: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .mt\:\:\$2 {
   *   margin-top: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .mt\:\:\$3 {
   *   margin-top: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .mt\:\:\$4 {
   *   margin-top: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .mt\:\:\$5 {
   *   margin-top: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .mt\:\:\$6 {
   *   margin-top: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .mt\:\:\$7 {
   *   margin-top: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .mt\:\:\$8 {
   *   margin-top: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .mt\:\:\$9 {
   *   margin-top: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .mt\:\:\$10 {
   *   margin-top: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .mt\:\:\$11 {
   *   margin-top: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .mt\:\:\$12 {
   *   margin-top: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .mt\:\:\$14 {
   *   margin-top: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .mt\:\:\$16 {
   *   margin-top: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .mt\:\:\$20 {
   *   margin-top: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .mt\:\:\$24 {
   *   margin-top: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .mt\:\:\$28 {
   *   margin-top: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .mt\:\:\$32 {
   *   margin-top: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .mt\:\:\$36 {
   *   margin-top: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .mt\:\:\$40 {
   *   margin-top: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .mt\:\:\$44 {
   *   margin-top: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .mt\:\:\$48 {
   *   margin-top: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .mt\:\:\$52 {
   *   margin-top: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .mt\:\:\$56 {
   *   margin-top: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .mt\:\:\$60 {
   *   margin-top: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .mt\:\:\$64 {
   *   margin-top: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .mt\:\:\$72 {
   *   margin-top: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .mt\:\:\$80 {
   *   margin-top: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .mt\:\:\$96 {
   *   margin-top: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .mt\:\:\$px {
   *   margin-top: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .mt\:\:\$0_5 {
   *   margin-top: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .mt\:\:\$1_5 {
   *   margin-top: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .mt\:\:\$2_5 {
   *   margin-top: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .mt\:\:\$3_5 {
   *   margin-top: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface MrAtomStyle {
  /**
   * ```css
   * .mr\:\:\$0 {
   *   margin-right: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .mr\:\:\$1 {
   *   margin-right: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .mr\:\:\$2 {
   *   margin-right: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .mr\:\:\$3 {
   *   margin-right: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .mr\:\:\$4 {
   *   margin-right: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .mr\:\:\$5 {
   *   margin-right: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .mr\:\:\$6 {
   *   margin-right: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .mr\:\:\$7 {
   *   margin-right: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .mr\:\:\$8 {
   *   margin-right: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .mr\:\:\$9 {
   *   margin-right: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .mr\:\:\$10 {
   *   margin-right: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .mr\:\:\$11 {
   *   margin-right: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .mr\:\:\$12 {
   *   margin-right: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .mr\:\:\$14 {
   *   margin-right: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .mr\:\:\$16 {
   *   margin-right: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .mr\:\:\$20 {
   *   margin-right: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .mr\:\:\$24 {
   *   margin-right: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .mr\:\:\$28 {
   *   margin-right: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .mr\:\:\$32 {
   *   margin-right: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .mr\:\:\$36 {
   *   margin-right: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .mr\:\:\$40 {
   *   margin-right: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .mr\:\:\$44 {
   *   margin-right: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .mr\:\:\$48 {
   *   margin-right: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .mr\:\:\$52 {
   *   margin-right: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .mr\:\:\$56 {
   *   margin-right: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .mr\:\:\$60 {
   *   margin-right: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .mr\:\:\$64 {
   *   margin-right: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .mr\:\:\$72 {
   *   margin-right: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .mr\:\:\$80 {
   *   margin-right: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .mr\:\:\$96 {
   *   margin-right: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .mr\:\:\$px {
   *   margin-right: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .mr\:\:\$0_5 {
   *   margin-right: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .mr\:\:\$1_5 {
   *   margin-right: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .mr\:\:\$2_5 {
   *   margin-right: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .mr\:\:\$3_5 {
   *   margin-right: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface MbAtomStyle {
  /**
   * ```css
   * .mb\:\:\$0 {
   *   margin-bottom: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .mb\:\:\$1 {
   *   margin-bottom: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .mb\:\:\$2 {
   *   margin-bottom: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .mb\:\:\$3 {
   *   margin-bottom: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .mb\:\:\$4 {
   *   margin-bottom: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .mb\:\:\$5 {
   *   margin-bottom: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .mb\:\:\$6 {
   *   margin-bottom: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .mb\:\:\$7 {
   *   margin-bottom: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .mb\:\:\$8 {
   *   margin-bottom: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .mb\:\:\$9 {
   *   margin-bottom: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .mb\:\:\$10 {
   *   margin-bottom: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .mb\:\:\$11 {
   *   margin-bottom: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .mb\:\:\$12 {
   *   margin-bottom: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .mb\:\:\$14 {
   *   margin-bottom: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .mb\:\:\$16 {
   *   margin-bottom: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .mb\:\:\$20 {
   *   margin-bottom: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .mb\:\:\$24 {
   *   margin-bottom: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .mb\:\:\$28 {
   *   margin-bottom: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .mb\:\:\$32 {
   *   margin-bottom: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .mb\:\:\$36 {
   *   margin-bottom: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .mb\:\:\$40 {
   *   margin-bottom: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .mb\:\:\$44 {
   *   margin-bottom: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .mb\:\:\$48 {
   *   margin-bottom: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .mb\:\:\$52 {
   *   margin-bottom: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .mb\:\:\$56 {
   *   margin-bottom: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .mb\:\:\$60 {
   *   margin-bottom: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .mb\:\:\$64 {
   *   margin-bottom: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .mb\:\:\$72 {
   *   margin-bottom: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .mb\:\:\$80 {
   *   margin-bottom: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .mb\:\:\$96 {
   *   margin-bottom: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .mb\:\:\$px {
   *   margin-bottom: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .mb\:\:\$0_5 {
   *   margin-bottom: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .mb\:\:\$1_5 {
   *   margin-bottom: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .mb\:\:\$2_5 {
   *   margin-bottom: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .mb\:\:\$3_5 {
   *   margin-bottom: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface MlAtomStyle {
  /**
   * ```css
   * .ml\:\:\$0 {
   *   margin-left: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .ml\:\:\$1 {
   *   margin-left: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .ml\:\:\$2 {
   *   margin-left: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .ml\:\:\$3 {
   *   margin-left: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .ml\:\:\$4 {
   *   margin-left: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .ml\:\:\$5 {
   *   margin-left: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .ml\:\:\$6 {
   *   margin-left: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .ml\:\:\$7 {
   *   margin-left: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .ml\:\:\$8 {
   *   margin-left: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .ml\:\:\$9 {
   *   margin-left: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .ml\:\:\$10 {
   *   margin-left: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .ml\:\:\$11 {
   *   margin-left: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .ml\:\:\$12 {
   *   margin-left: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .ml\:\:\$14 {
   *   margin-left: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .ml\:\:\$16 {
   *   margin-left: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .ml\:\:\$20 {
   *   margin-left: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .ml\:\:\$24 {
   *   margin-left: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .ml\:\:\$28 {
   *   margin-left: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .ml\:\:\$32 {
   *   margin-left: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .ml\:\:\$36 {
   *   margin-left: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .ml\:\:\$40 {
   *   margin-left: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .ml\:\:\$44 {
   *   margin-left: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .ml\:\:\$48 {
   *   margin-left: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .ml\:\:\$52 {
   *   margin-left: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .ml\:\:\$56 {
   *   margin-left: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .ml\:\:\$60 {
   *   margin-left: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .ml\:\:\$64 {
   *   margin-left: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .ml\:\:\$72 {
   *   margin-left: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .ml\:\:\$80 {
   *   margin-left: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .ml\:\:\$96 {
   *   margin-left: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .ml\:\:\$px {
   *   margin-left: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .ml\:\:\$0_5 {
   *   margin-left: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .ml\:\:\$1_5 {
   *   margin-left: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .ml\:\:\$2_5 {
   *   margin-left: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .ml\:\:\$3_5 {
   *   margin-left: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
}

interface FontSizeAtomStyle {
  /**
   * ```css
   * .fontSize\:\:\$xs {
   *   font-size: 0.75rem;
   * }
   * ```
   */
  $xs: ClassName;
  /**
   * ```css
   * .fontSize\:\:\$sm {
   *   font-size: 0.875rem;
   * }
   * ```
   */
  $sm: ClassName;
  /**
   * ```css
   * .fontSize\:\:\$base {
   *   font-size: 1rem;
   * }
   * ```
   */
  $base: ClassName;
  /**
   * ```css
   * .fontSize\:\:\$lg {
   *   font-size: 1.125rem;
   * }
   * ```
   */
  $lg: ClassName;
  /**
   * ```css
   * .fontSize\:\:\$xl {
   *   font-size: 1.25rem;
   * }
   * ```
   */
  $xl: ClassName;
  /**
   * ```css
   * .fontSize\:\:\$2xl {
   *   font-size: 1.5rem;
   * }
   * ```
   */
  $2xl: ClassName;
  /**
   * ```css
   * .fontSize\:\:\$3xl {
   *   font-size: 1.875rem;
   * }
   * ```
   */
  $3xl: ClassName;
  /**
   * ```css
   * .fontSize\:\:\$4xl {
   *   font-size: 2.25rem;
   * }
   * ```
   */
  $4xl: ClassName;
  /**
   * ```css
   * .fontSize\:\:\$5xl {
   *   font-size: 3rem;
   * }
   * ```
   */
  $5xl: ClassName;
  /**
   * ```css
   * .fontSize\:\:\$6xl {
   *   font-size: 3.75rem;
   * }
   * ```
   */
  $6xl: ClassName;
  /**
   * ```css
   * .fontSize\:\:\$7xl {
   *   font-size: 4.5rem;
   * }
   * ```
   */
  $7xl: ClassName;
  /**
   * ```css
   * .fontSize\:\:\$8xl {
   *   font-size: 6rem;
   * }
   * ```
   */
  $8xl: ClassName;
}

interface LineHeightAtomStyle {
  /**
   * ```css
   * .lineHeight\:\:\$xs {
   *   line-height: 0.75rem;
   * }
   * ```
   */
  $xs: ClassName;
  /**
   * ```css
   * .lineHeight\:\:\$sm {
   *   line-height: 1.25rem;
   * }
   * ```
   */
  $sm: ClassName;
  /**
   * ```css
   * .lineHeight\:\:\$base {
   *   line-height: 1.5rem;
   * }
   * ```
   */
  $base: ClassName;
  /**
   * ```css
   * .lineHeight\:\:\$lg {
   *   line-height: 1.75rem;
   * }
   * ```
   */
  $lg: ClassName;
  /**
   * ```css
   * .lineHeight\:\:\$xl {
   *   line-height: 1.75rem;
   * }
   * ```
   */
  $xl: ClassName;
  /**
   * ```css
   * .lineHeight\:\:\$2xl {
   *   line-height: 2rem;
   * }
   * ```
   */
  $2xl: ClassName;
  /**
   * ```css
   * .lineHeight\:\:\$3xl {
   *   line-height: 2.25rem;
   * }
   * ```
   */
  $3xl: ClassName;
  /**
   * ```css
   * .lineHeight\:\:\$4xl {
   *   line-height: 2.5rem;
   * }
   * ```
   */
  $4xl: ClassName;
  /**
   * ```css
   * .lineHeight\:\:\$5xl {
   *   line-height: 1;
   * }
   * ```
   */
  $5xl: ClassName;
  /**
   * ```css
   * .lineHeight\:\:\$6xl {
   *   line-height: 1;
   * }
   * ```
   */
  $6xl: ClassName;
  /**
   * ```css
   * .lineHeight\:\:\$7xl {
   *   line-height: 1;
   * }
   * ```
   */
  $7xl: ClassName;
  /**
   * ```css
   * .lineHeight\:\:\$8xl {
   *   line-height: 1;
   * }
   * ```
   */
  $8xl: ClassName;
}

interface DirAtomStyle {
  /**
   * ```css
   * .dir\:\:\$ltr {
   *   direction: ltr;
   * }
   * ```
   */
  $ltr: ClassName;
  /**
   * ```css
   * .dir\:\:\$rtl {
   *   direction: rtl;
   * }
   * ```
   */
  $rtl: ClassName;
}

interface DisplayAtomStyle {
  /**
   * ```css
   * .display\:\:\$block {}
   * ```
   */
  $block: ClassName;
  /**
   * ```css
   * .display\:\:\$inlineBlock {}
   * ```
   */
  $inlineBlock: ClassName;
  /**
   * ```css
   * .display\:\:\$inline {}
   * ```
   */
  $inline: ClassName;
  /**
   * ```css
   * .display\:\:\$flowRoot {}
   * ```
   */
  $flowRoot: ClassName;
  /**
   * ```css
   * .display\:\:\$content {}
   * ```
   */
  $content: ClassName;
  /**
   * ```css
   * .display\:\:\$hidden {}
   * ```
   */
  $hidden: ClassName;
  /**
   * ```css
   * .display\:\:\$listItem {}
   * ```
   */
  $listItem: ClassName;
}

interface VisibilityAtomStyle {
  /**
   * ```css
   * .visibility\:\:\$hide {}
   * ```
   */
  $hide: ClassName;
  /**
   * ```css
   * .visibility\:\:\$show {}
   * ```
   */
  $show: ClassName;
}

interface OpacityAtomStyle {
  /**
   * ```css
   * .opacity\:\:\$0 {
   *   opacity: 0;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .opacity\:\:\$5 {
   *   opacity: 5;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .opacity\:\:\$10 {
   *   opacity: 10;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .opacity\:\:\$20 {
   *   opacity: 20;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .opacity\:\:\$30 {
   *   opacity: 30;
   * }
   * ```
   */
  $30: ClassName;
  /**
   * ```css
   * .opacity\:\:\$40 {
   *   opacity: 40;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .opacity\:\:\$50 {
   *   opacity: 50;
   * }
   * ```
   */
  $50: ClassName;
  /**
   * ```css
   * .opacity\:\:\$60 {
   *   opacity: 60;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .opacity\:\:\$70 {
   *   opacity: 70;
   * }
   * ```
   */
  $70: ClassName;
  /**
   * ```css
   * .opacity\:\:\$75 {
   *   opacity: 75;
   * }
   * ```
   */
  $75: ClassName;
  /**
   * ```css
   * .opacity\:\:\$80 {
   *   opacity: 80;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .opacity\:\:\$90 {
   *   opacity: 90;
   * }
   * ```
   */
  $90: ClassName;
  /**
   * ```css
   * .opacity\:\:\$95 {
   *   opacity: 95;
   * }
   * ```
   */
  $95: ClassName;
  /**
   * ```css
   * .opacity\:\:\$100 {
   *   opacity: 100;
   * }
   * ```
   */
  $100: ClassName;
}

interface ZAtomStyle {
  /**
   * ```css
   * .z\:\:\$0 {
   *   z-index: 0;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .z\:\:\$1 {
   *   z-index: 1;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .z\:\:\$2 {
   *   z-index: 2;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .z\:\:\$3 {
   *   z-index: 3;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .z\:\:\$4 {
   *   z-index: 4;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .z\:\:\$5 {
   *   z-index: 5;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .z\:\:\$10 {
   *   z-index: 10;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .z\:\:\$20 {
   *   z-index: 20;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .z\:\:\$30 {
   *   z-index: 30;
   * }
   * ```
   */
  $30: ClassName;
  /**
   * ```css
   * .z\:\:\$40 {
   *   z-index: 40;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .z\:\:\$50 {
   *   z-index: 50;
   * }
   * ```
   */
  $50: ClassName;
  /**
   * ```css
   * .z\:\:\$60 {
   *   z-index: 60;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .z\:\:\$auto {
   *   z-index: auto;
   * }
   * ```
   */
  $auto: ClassName;
  /**
   * ```css
   * .z\:\:\$_1 {
   *   z-index: -1;
   * }
   * ```
   */
  $_1: ClassName;
  /**
   * ```css
   * .z\:\:\$-2 {
   *   z-index: -2;
   * }
   * ```
   */
  '$-2': ClassName;
  /**
   * ```css
   * .z\:\:\$_3 {
   *   z-index: -3;
   * }
   * ```
   */
  $_3: ClassName;
  /**
   * ```css
   * .z\:\:\$_5 {
   *   z-index: -5;
   * }
   * ```
   */
  $_5: ClassName;
}

interface TextOrientationAtomStyle {
  /**
   * ```css
   * .textOrientation\:\:\$mixed {
   *   text-orientation: mixed;
   * }
   * ```
   */
  $mixed: ClassName;
  /**
   * ```css
   * .textOrientation\:\:\$up {
   *   text-orientation: upright;
   * }
   * ```
   */
  $up: ClassName;
  /**
   * ```css
   * .textOrientation\:\:\$s {
   *   text-orientation: sideways;
   * }
   * ```
   */
  $s: ClassName;
  /**
   * ```css
   * .textOrientation\:\:\$sr {
   *   text-orientation: sideways-right;
   * }
   * ```
   */
  $sr: ClassName;
  /**
   * ```css
   * .textOrientation\:\:\$glyph {
   *   text-orientation: use-glyph-orientation;
   * }
   * ```
   */
  $glyph: ClassName;
  /**
   * ```css
   * .textOrientation\:\:\$unset {
   *   text-orientation: unset;
   * }
   * ```
   */
  $unset: ClassName;
}

interface WritingModeAtomStyle {
  /**
   * ```css
   * .writingMode\:\:\$htb {
   *   writing-mode: horizontal-tb;
   * }
   * ```
   */
  $htb: ClassName;
  /**
   * ```css
   * .writingMode\:\:\$vrl {
   *   writing-mode: vertical-rl;
   * }
   * ```
   */
  $vrl: ClassName;
  /**
   * ```css
   * .writingMode\:\:\$vlr {
   *   writing-mode: vertical-lr;
   * }
   * ```
   */
  $vlr: ClassName;
  /**
   * ```css
   * .writingMode\:\:\$srl {
   *   writing-mode: sideways-rl;
   * }
   * ```
   */
  $srl: ClassName;
  /**
   * ```css
   * .writingMode\:\:\$slr {
   *   writing-mode: sideways-lr;
   * }
   * ```
   */
  $slr: ClassName;
  /**
   * ```css
   * .writingMode\:\:\$unset {
   *   writing-mode: unset;
   * }
   * ```
   */
  $unset: ClassName;
}

interface ScaleAtomStyle {
  /**
   * ```css
   * .scale\:\:\$0 {
   *   --transform-scale-x: 0;
   *   --transform-scale-y: 0;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .scale\:\:\$50 {
   *   --transform-scale-x: .5;
   *   --transform-scale-y: .5;
   * }
   * ```
   */
  $50: ClassName;
  /**
   * ```css
   * .scale\:\:\$75 {
   *   --transform-scale-x: .75;
   *   --transform-scale-y: .75;
   * }
   * ```
   */
  $75: ClassName;
  /**
   * ```css
   * .scale\:\:\$90 {
   *   --transform-scale-x: .9;
   *   --transform-scale-y: .9;
   * }
   * ```
   */
  $90: ClassName;
  /**
   * ```css
   * .scale\:\:\$95 {
   *   --transform-scale-x: .95;
   *   --transform-scale-y: .95;
   * }
   * ```
   */
  $95: ClassName;
  /**
   * ```css
   * .scale\:\:\$100 {
   *   --transform-scale-x: 1;
   *   --transform-scale-y: 1;
   * }
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .scale\:\:\$105 {
   *   --transform-scale-x: 1.05;
   *   --transform-scale-y: 1.05;
   * }
   * ```
   */
  $105: ClassName;
  /**
   * ```css
   * .scale\:\:\$110 {
   *   --transform-scale-x: 1.1;
   *   --transform-scale-y: 1.1;
   * }
   * ```
   */
  $110: ClassName;
  /**
   * ```css
   * .scale\:\:\$125 {
   *   --transform-scale-x: 1.25;
   *   --transform-scale-y: 1.25;
   * }
   * ```
   */
  $125: ClassName;
  /**
   * ```css
   * .scale\:\:\$150 {
   *   --transform-scale-x: 1.5;
   *   --transform-scale-y: 1.5;
   * }
   * ```
   */
  $150: ClassName;
}

interface ScaleXAtomStyle {
  /**
   * ```css
   * .scaleX\:\:\$0 {
   *   --transform-scale-x: 0;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .scaleX\:\:\$50 {
   *   --transform-scale-x: .5;
   * }
   * ```
   */
  $50: ClassName;
  /**
   * ```css
   * .scaleX\:\:\$75 {
   *   --transform-scale-x: .75;
   * }
   * ```
   */
  $75: ClassName;
  /**
   * ```css
   * .scaleX\:\:\$90 {
   *   --transform-scale-x: .9;
   * }
   * ```
   */
  $90: ClassName;
  /**
   * ```css
   * .scaleX\:\:\$95 {
   *   --transform-scale-x: .95;
   * }
   * ```
   */
  $95: ClassName;
  /**
   * ```css
   * .scaleX\:\:\$100 {
   *   --transform-scale-x: 1;
   * }
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .scaleX\:\:\$105 {
   *   --transform-scale-x: 1.05;
   * }
   * ```
   */
  $105: ClassName;
  /**
   * ```css
   * .scaleX\:\:\$110 {
   *   --transform-scale-x: 1.1;
   * }
   * ```
   */
  $110: ClassName;
  /**
   * ```css
   * .scaleX\:\:\$125 {
   *   --transform-scale-x: 1.25;
   * }
   * ```
   */
  $125: ClassName;
  /**
   * ```css
   * .scaleX\:\:\$150 {
   *   --transform-scale-x: 1.5;
   * }
   * ```
   */
  $150: ClassName;
}

interface ScaleYAtomStyle {
  /**
   * ```css
   * .scaleY\:\:\$0 {
   *   --transform-scale-y: 0;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .scaleY\:\:\$50 {
   *   --transform-scale-y: .5;
   * }
   * ```
   */
  $50: ClassName;
  /**
   * ```css
   * .scaleY\:\:\$75 {
   *   --transform-scale-y: .75;
   * }
   * ```
   */
  $75: ClassName;
  /**
   * ```css
   * .scaleY\:\:\$90 {
   *   --transform-scale-y: .9;
   * }
   * ```
   */
  $90: ClassName;
  /**
   * ```css
   * .scaleY\:\:\$95 {
   *   --transform-scale-y: .95;
   * }
   * ```
   */
  $95: ClassName;
  /**
   * ```css
   * .scaleY\:\:\$100 {
   *   --transform-scale-y: 1;
   * }
   * ```
   */
  $100: ClassName;
  /**
   * ```css
   * .scaleY\:\:\$105 {
   *   --transform-scale-y: 1.05;
   * }
   * ```
   */
  $105: ClassName;
  /**
   * ```css
   * .scaleY\:\:\$110 {
   *   --transform-scale-y: 1.1;
   * }
   * ```
   */
  $110: ClassName;
  /**
   * ```css
   * .scaleY\:\:\$125 {
   *   --transform-scale-y: 1.25;
   * }
   * ```
   */
  $125: ClassName;
  /**
   * ```css
   * .scaleY\:\:\$150 {
   *   --transform-scale-y: 1.5;
   * }
   * ```
   */
  $150: ClassName;
}

interface RotateAtomStyle {
  /**
   * ```css
   * .rotate\:\:\$0 {
   *   --transform-rotate: 0deg;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .rotate\:\:\$1 {
   *   --transform-rotate: 1deg;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .rotate\:\:\$2 {
   *   --transform-rotate: 2deg;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .rotate\:\:\$3 {
   *   --transform-rotate: 3deg;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .rotate\:\:\$6 {
   *   --transform-rotate: 6deg;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .rotate\:\:\$12 {
   *   --transform-rotate: 12deg;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .rotate\:\:\$45 {
   *   --transform-rotate: 45deg;
   * }
   * ```
   */
  $45: ClassName;
  /**
   * ```css
   * .rotate\:\:\$90 {
   *   --transform-rotate: 90deg;
   * }
   * ```
   */
  $90: ClassName;
  /**
   * ```css
   * .rotate\:\:\$180 {
   *   --transform-rotate: 180deg;
   * }
   * ```
   */
  $180: ClassName;
  /**
   * ```css
   * .rotate\:\:\$270 {
   *   --transform-rotate: 270deg;
   * }
   * ```
   */
  $270: ClassName;
  /**
   * ```css
   * .rotate\:\:\$315 {
   *   --transform-rotate: 315deg;
   * }
   * ```
   */
  $315: ClassName;
}

interface SkewXAtomStyle {
  /**
   * ```css
   * .skewX\:\:\$0 {
   *   --transform-skew-x: 0deg;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .skewX\:\:\$1 {
   *   --transform-skew-x: 1deg;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .skewX\:\:\$2 {
   *   --transform-skew-x: 2deg;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .skewX\:\:\$3 {
   *   --transform-skew-x: 3deg;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .skewX\:\:\$6 {
   *   --transform-skew-x: 6deg;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .skewX\:\:\$12 {
   *   --transform-skew-x: 12deg;
   * }
   * ```
   */
  $12: ClassName;
}

interface SkewYAtomStyle {
  /**
   * ```css
   * .skewY\:\:\$0 {
   *   --transform-skew-y: 0deg;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .skewY\:\:\$1 {
   *   --transform-skew-y: 1deg;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .skewY\:\:\$2 {
   *   --transform-skew-y: 2deg;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .skewY\:\:\$3 {
   *   --transform-skew-y: 3deg;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .skewY\:\:\$6 {
   *   --transform-skew-y: 6deg;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .skewY\:\:\$12 {
   *   --transform-skew-y: 12deg;
   * }
   * ```
   */
  $12: ClassName;
}

interface OriginAtomStyle {
  /**
   * ```css
   * .origin\:\:\$center {
   *   transform-origin: center;
   * }
   * ```
   */
  $center: ClassName;
  /**
   * ```css
   * .origin\:\:\$top {
   *   transform-origin: top;
   * }
   * ```
   */
  $top: ClassName;
  /**
   * ```css
   * .origin\:\:\$topRight {
   *   transform-origin: top right;
   * }
   * ```
   */
  $topRight: ClassName;
  /**
   * ```css
   * .origin\:\:\$right {
   *   transform-origin: right;
   * }
   * ```
   */
  $right: ClassName;
  /**
   * ```css
   * .origin\:\:\$bottomRight {
   *   transform-origin: bottom right;
   * }
   * ```
   */
  $bottomRight: ClassName;
  /**
   * ```css
   * .origin\:\:\$bottom {
   *   transform-origin: bottom;
   * }
   * ```
   */
  $bottom: ClassName;
  /**
   * ```css
   * .origin\:\:\$bottomLeft {
   *   transform-origin: bottom left;
   * }
   * ```
   */
  $bottomLeft: ClassName;
  /**
   * ```css
   * .origin\:\:\$left {
   *   transform-origin: left;
   * }
   * ```
   */
  $left: ClassName;
  /**
   * ```css
   * .origin\:\:\$topLeft {
   *   transform-origin: top left;
   * }
   * ```
   */
  $topLeft: ClassName;
}

interface TranslateXAtomStyle {
  /**
   * ```css
   * .translateX\:\:\$0 {
   *   --transform-translate-x: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .translateX\:\:\$1 {
   *   --transform-translate-x: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .translateX\:\:\$2 {
   *   --transform-translate-x: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .translateX\:\:\$3 {
   *   --transform-translate-x: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .translateX\:\:\$4 {
   *   --transform-translate-x: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .translateX\:\:\$5 {
   *   --transform-translate-x: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .translateX\:\:\$6 {
   *   --transform-translate-x: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .translateX\:\:\$7 {
   *   --transform-translate-x: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .translateX\:\:\$8 {
   *   --transform-translate-x: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .translateX\:\:\$9 {
   *   --transform-translate-x: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .translateX\:\:\$10 {
   *   --transform-translate-x: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .translateX\:\:\$11 {
   *   --transform-translate-x: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .translateX\:\:\$12 {
   *   --transform-translate-x: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .translateX\:\:\$14 {
   *   --transform-translate-x: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .translateX\:\:\$16 {
   *   --transform-translate-x: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .translateX\:\:\$20 {
   *   --transform-translate-x: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .translateX\:\:\$24 {
   *   --transform-translate-x: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .translateX\:\:\$28 {
   *   --transform-translate-x: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .translateX\:\:\$32 {
   *   --transform-translate-x: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .translateX\:\:\$36 {
   *   --transform-translate-x: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .translateX\:\:\$40 {
   *   --transform-translate-x: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .translateX\:\:\$44 {
   *   --transform-translate-x: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .translateX\:\:\$48 {
   *   --transform-translate-x: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .translateX\:\:\$52 {
   *   --transform-translate-x: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .translateX\:\:\$56 {
   *   --transform-translate-x: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .translateX\:\:\$60 {
   *   --transform-translate-x: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .translateX\:\:\$64 {
   *   --transform-translate-x: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .translateX\:\:\$72 {
   *   --transform-translate-x: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .translateX\:\:\$80 {
   *   --transform-translate-x: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .translateX\:\:\$96 {
   *   --transform-translate-x: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .translateX\:\:\$px {
   *   --transform-translate-x: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .translateX\:\:\$0_5 {
   *   --transform-translate-x: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .translateX\:\:\$1_5 {
   *   --transform-translate-x: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .translateX\:\:\$2_5 {
   *   --transform-translate-x: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .translateX\:\:\$3_5 {
   *   --transform-translate-x: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
  /**
   * ```css
   * .translateX\:\:\$1of2 {
   *   --transform-translate-x: 50%;
   * }
   * ```
   */
  $1of2: ClassName;
  /**
   * ```css
   * .translateX\:\:\$1of3 {
   *   --transform-translate-x: 33.333333%;
   * }
   * ```
   */
  $1of3: ClassName;
  /**
   * ```css
   * .translateX\:\:\$2of3 {
   *   --transform-translate-x: 66.666667%;
   * }
   * ```
   */
  $2of3: ClassName;
  /**
   * ```css
   * .translateX\:\:\$1of4 {
   *   --transform-translate-x: 25%;
   * }
   * ```
   */
  $1of4: ClassName;
  /**
   * ```css
   * .translateX\:\:\$2of4 {
   *   --transform-translate-x: 50%;
   * }
   * ```
   */
  $2of4: ClassName;
  /**
   * ```css
   * .translateX\:\:\$3of4 {
   *   --transform-translate-x: 75%;
   * }
   * ```
   */
  $3of4: ClassName;
  /**
   * ```css
   * .translateX\:\:\$full {
   *   --transform-translate-x: 100%;
   * }
   * ```
   */
  $full: ClassName;
}

interface TranslateYAtomStyle {
  /**
   * ```css
   * .translateY\:\:\$0 {
   *   --transform-translate-y: 0px;
   * }
   * ```
   */
  $0: ClassName;
  /**
   * ```css
   * .translateY\:\:\$1 {
   *   --transform-translate-y: 0.25rem;
   * }
   * ```
   */
  $1: ClassName;
  /**
   * ```css
   * .translateY\:\:\$2 {
   *   --transform-translate-y: 0.5rem;
   * }
   * ```
   */
  $2: ClassName;
  /**
   * ```css
   * .translateY\:\:\$3 {
   *   --transform-translate-y: 0.75rem;
   * }
   * ```
   */
  $3: ClassName;
  /**
   * ```css
   * .translateY\:\:\$4 {
   *   --transform-translate-y: 1rem;
   * }
   * ```
   */
  $4: ClassName;
  /**
   * ```css
   * .translateY\:\:\$5 {
   *   --transform-translate-y: 1.25rem;
   * }
   * ```
   */
  $5: ClassName;
  /**
   * ```css
   * .translateY\:\:\$6 {
   *   --transform-translate-y: 1.5rem;
   * }
   * ```
   */
  $6: ClassName;
  /**
   * ```css
   * .translateY\:\:\$7 {
   *   --transform-translate-y: 1.75rem;
   * }
   * ```
   */
  $7: ClassName;
  /**
   * ```css
   * .translateY\:\:\$8 {
   *   --transform-translate-y: 2rem;
   * }
   * ```
   */
  $8: ClassName;
  /**
   * ```css
   * .translateY\:\:\$9 {
   *   --transform-translate-y: 2.25rem;
   * }
   * ```
   */
  $9: ClassName;
  /**
   * ```css
   * .translateY\:\:\$10 {
   *   --transform-translate-y: 2.5rem;
   * }
   * ```
   */
  $10: ClassName;
  /**
   * ```css
   * .translateY\:\:\$11 {
   *   --transform-translate-y: 2.75rem;
   * }
   * ```
   */
  $11: ClassName;
  /**
   * ```css
   * .translateY\:\:\$12 {
   *   --transform-translate-y: 3rem;
   * }
   * ```
   */
  $12: ClassName;
  /**
   * ```css
   * .translateY\:\:\$14 {
   *   --transform-translate-y: 3.5rem;
   * }
   * ```
   */
  $14: ClassName;
  /**
   * ```css
   * .translateY\:\:\$16 {
   *   --transform-translate-y: 4rem;
   * }
   * ```
   */
  $16: ClassName;
  /**
   * ```css
   * .translateY\:\:\$20 {
   *   --transform-translate-y: 5rem;
   * }
   * ```
   */
  $20: ClassName;
  /**
   * ```css
   * .translateY\:\:\$24 {
   *   --transform-translate-y: 6rem;
   * }
   * ```
   */
  $24: ClassName;
  /**
   * ```css
   * .translateY\:\:\$28 {
   *   --transform-translate-y: 7rem;
   * }
   * ```
   */
  $28: ClassName;
  /**
   * ```css
   * .translateY\:\:\$32 {
   *   --transform-translate-y: 8rem;
   * }
   * ```
   */
  $32: ClassName;
  /**
   * ```css
   * .translateY\:\:\$36 {
   *   --transform-translate-y: 9rem;
   * }
   * ```
   */
  $36: ClassName;
  /**
   * ```css
   * .translateY\:\:\$40 {
   *   --transform-translate-y: 10rem;
   * }
   * ```
   */
  $40: ClassName;
  /**
   * ```css
   * .translateY\:\:\$44 {
   *   --transform-translate-y: 11rem;
   * }
   * ```
   */
  $44: ClassName;
  /**
   * ```css
   * .translateY\:\:\$48 {
   *   --transform-translate-y: 12rem;
   * }
   * ```
   */
  $48: ClassName;
  /**
   * ```css
   * .translateY\:\:\$52 {
   *   --transform-translate-y: 13rem;
   * }
   * ```
   */
  $52: ClassName;
  /**
   * ```css
   * .translateY\:\:\$56 {
   *   --transform-translate-y: 14rem;
   * }
   * ```
   */
  $56: ClassName;
  /**
   * ```css
   * .translateY\:\:\$60 {
   *   --transform-translate-y: 15rem;
   * }
   * ```
   */
  $60: ClassName;
  /**
   * ```css
   * .translateY\:\:\$64 {
   *   --transform-translate-y: 16rem;
   * }
   * ```
   */
  $64: ClassName;
  /**
   * ```css
   * .translateY\:\:\$72 {
   *   --transform-translate-y: 18rem;
   * }
   * ```
   */
  $72: ClassName;
  /**
   * ```css
   * .translateY\:\:\$80 {
   *   --transform-translate-y: 20rem;
   * }
   * ```
   */
  $80: ClassName;
  /**
   * ```css
   * .translateY\:\:\$96 {
   *   --transform-translate-y: 24rem;
   * }
   * ```
   */
  $96: ClassName;
  /**
   * ```css
   * .translateY\:\:\$px {
   *   --transform-translate-y: 1px;
   * }
   * ```
   */
  $px: ClassName;
  /**
   * ```css
   * .translateY\:\:\$0_5 {
   *   --transform-translate-y: 0.125rem;
   * }
   * ```
   */
  $0_5: ClassName;
  /**
   * ```css
   * .translateY\:\:\$1_5 {
   *   --transform-translate-y: 0.375rem;
   * }
   * ```
   */
  $1_5: ClassName;
  /**
   * ```css
   * .translateY\:\:\$2_5 {
   *   --transform-translate-y: 0.625rem;
   * }
   * ```
   */
  $2_5: ClassName;
  /**
   * ```css
   * .translateY\:\:\$3_5 {
   *   --transform-translate-y: 0.875rem;
   * }
   * ```
   */
  $3_5: ClassName;
  /**
   * ```css
   * .translateY\:\:\$1of2 {
   *   --transform-translate-y: 50%;
   * }
   * ```
   */
  $1of2: ClassName;
  /**
   * ```css
   * .translateY\:\:\$1of3 {
   *   --transform-translate-y: 33.333333%;
   * }
   * ```
   */
  $1of3: ClassName;
  /**
   * ```css
   * .translateY\:\:\$2of3 {
   *   --transform-translate-y: 66.666667%;
   * }
   * ```
   */
  $2of3: ClassName;
  /**
   * ```css
   * .translateY\:\:\$1of4 {
   *   --transform-translate-y: 25%;
   * }
   * ```
   */
  $1of4: ClassName;
  /**
   * ```css
   * .translateY\:\:\$2of4 {
   *   --transform-translate-y: 50%;
   * }
   * ```
   */
  $2of4: ClassName;
  /**
   * ```css
   * .translateY\:\:\$3of4 {
   *   --transform-translate-y: 75%;
   * }
   * ```
   */
  $3of4: ClassName;
  /**
   * ```css
   * .translateY\:\:\$full {
   *   --transform-translate-y: 100%;
   * }
   * ```
   */
  $full: ClassName;
}

interface AnimationAtomStyle {}
