class Overrides {
  #overrides = new Map<string, Set<string>>();

  constructor(values?: Record<string, string[]>) {
    if (values) {
      this.setValues(values);
    }
  }

  /**
   * Set override groups. This will override any existing groups for clashing
   * identifiers.
   */
  setValues(values: Record<string, string[]>) {
    for (const [key, value] of Object.entries(values)) {
      this.#overrides.set(key, new Set(value));
    }
  }

  /**
   * Check if an identifier has overrides.
   */
  has(name: string) {
    return this.#overrides.has(name);
  }

  /**
   * Get the overrides for a given identifier.
   */
  get(name: string) {
    return [...(this.#overrides.get(name) ?? [])];
  }
}

export const overrides = new Overrides({
  p: ['px', 'py', 'pt', 'pr', 'pl', 'pb'],
  px: ['pl', 'pr'],
  py: ['pt', 'pb'],
  m: ['mx', 'my', 'mt', 'mr', 'ml', 'mb'],
  mx: ['mr', 'ml'],
  mb: ['mt', 'mb'],
  pbl: ['pbls', 'pble'],
  pin: ['pins', 'pine'],
});
