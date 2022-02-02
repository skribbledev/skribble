function createConfig() {}

/**
 * The configuration file.
 */
const config = {
  /**
   * The css variables that are used.
   */
  vars: {
    /// All colors will eventually be converted to hsl triplets.
    color: {
      primary: 'hsl(187, 100%, 42%)',
      secondary: 'hsl(36, 100%, 50%)',
      background: 'hsl(0, 0%, 98%)',
      text: 'hsl(0, 0%, 13%)',
      border: 'hsl(0, 0%, 13%)',
    },
    opacity: {
      background: 1,
      text: 1,
    },
  },
  atoms: {
    color: {
      description: ``,
      elements: {},
      primary: 'hsl(187, 100%, 42%)',
      secondary: 'hsl(36, 100%, 50%)',
      background: 'hsl(0, 0%, 98%)',
      text: 'hsl(0, 0%, 13%)',
      border: 'hsl(0, 0%, 13%)',
    },
  },
};
