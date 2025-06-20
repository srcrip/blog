module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'standard-with-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended'
  ],
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['*.cjs'],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },
    // Disable no-undef for TS files
    {
      files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
      rules: {
        'no-undef': 'off',
        "@typescript-eslint/explicit-function-return-type": "error"
      },
    },
  ],
  settings: {
    'svelte': {
      'typescript': () => require('typescript')
    }
  },
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 'latest',
    extraFileExtensions: ['.svelte']
  },
  rules: {
    'no-cond-assign': ['error', 'except-parens'],
    // Needs fix from: https://github.com/sveltejs/eslint-plugin-svelte3/issues/41
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxBOF: 2,
        maxEOF: 0
      }
    ],
    // sometimes useful in svelte
    'no-self-assign': 'warn',
    'no-return-assign': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'warn',
    '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }]
  }
}
