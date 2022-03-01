/**
 * Use this to set the rules of specificity for your configuration file.
 */
export const overrides = new Map([
  ['p', new Set(['px', 'py', 'pt', 'pr', 'pl', 'pb'])],
  ['px', new Set(['pl', 'pr'])],
  ['py', new Set(['pt', 'pb'])],
  ['m', new Set(['mx', 'my', 'mt', 'mr', 'ml', 'mb'])],
  ['mx', new Set(['mr', 'ml'])],
  ['mb', new Set(['mt', 'mb'])],
  ['pbl', new Set(['pbls', 'pble'])],
  ['pin', new Set(['pins', 'pine'])],
]);
