const ERROR = 'error'
const OFF = 0

module.exports = {
  env: {
    browser: true,
    es2021: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['**/*.css'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      ERROR,
      {
        args: 'all',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'simple-import-sort/imports': ERROR,
    'simple-import-sort/exports': ERROR,
    'react/no-unescaped-entities': OFF,
    'react/display-name': OFF,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': ERROR,
    '@typescript-eslint/no-empty-function': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
  },
}
