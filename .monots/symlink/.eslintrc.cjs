module.exports = {
  extends: ['monots', 'monots/full'],
  parserOptions: {
    project: ['./.monots/tsconfig.lint.json'],
  },
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 'off',
  },
  overrides: [
    {
      files: [
        './.monots/**',
        './.storybook/**',
        '**/__stories__/**',
        'websites/**',
        'packages/*/demos/**',
        'vite.config.ts',
      ],
      rules: { 'import/no-default-export': 'off' },
    },
    {
      files: ['pages/**'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            case: 'kebabCase',
            ignore: ['[a-z-]*\\$\\.tsx?$'],
          },
        ],
      },
    },
  ],
};
