/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 * Sample Eslint config for NodeJS ExpressJS MongoDB project
 */
module.exports = {
  root: true,
  env: { es2020: true, node: true },
  extends: ['eslint:recommended', 'eslint-config-prettier', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    allowImportExportEverywhere: true,
  },
  plugins: ['prettier'],
  rules: {
    'no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'es5',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: false,
      },
    ],
  },
}
