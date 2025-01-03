const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    sourceType: 'module',
    ecmaVersion: 'latest',
    extraFileExtensions: ['.md', '.mdx'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        project,
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
      },
      typescript: {
        project,
        alwaysTryTypes: true,
      },
    },
    'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|html)$'],
  },
  ignorePatterns: [
    '.*.js',
    'node_modules/',
    'dist/',
    'tailwind.config.ts',
    'postcss.config.cjs',
    '.eslintrc.cjs',
  ],
  plugins: [
    '@typescript-eslint',
    'only-warn',
    'eslint-plugin-import-helpers',
    'react-refresh',
    'sonarjs',
    'testing-library',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    require.resolve('@vercel/style-guide/eslint/next'),
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:vitest/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:sonarjs/recommended-legacy',
    'plugin:unicorn/recommended',
    'turbo',
    'prettier',
    'plugin:@eslint-community/eslint-comments/recommended',
  ],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:vitest/recommended'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
    {
      files: ['tailwind.config.ts'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
    {
      files: ['*.cjs'],
      rules: {
        'unicorn/no-empty-file': 'off',
      },
    },
    {
      files: ['**/actions/**/*.ts'],
      rules: {
        '@typescript-eslint/require-await': 'off',
      },
    },
    {
      files: ['app/components/ui/**/*.tsx'],
      rules: {
        'react-refresh/only-export-components': 'off',
      },
    },
  ],
  rules: {
    'no-undef': 'off',
    'prefer-const': 'warn',
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: false },
    ],
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowArray: true,
        allowNumber: true,
        allowRegExp: true,
      },
    ],
    '@typescript-eslint/restrict-plus-operands': [
      'error',
      {
        allowNumberAndString: true,
      },
    ],
    'sonar/no-nested-functions': 'off',
    'sonarjs/pseudo-random': 'off',
    'sonarjs/no-array-index-key': 'off',
    'sonarjs/no-nested-conditional': 'off',
    'sonarjs/function-return-type': 'off',
    'sonarjs/use-type-alias': 'off',
    'sonarjs/no-misused-promises': 'off',
    'sonarjs/no-base-to-string': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-unreadable-array-destructuring': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-spread': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          ref: true,
          props: true,
          Props: true,
          param: true,
          params: true,
          Param: true,
          Params: true,
          args: true,
          env: true,
          fn: true,
        },
      },
    ],
    'import/no-cycle': 'warn',
    'import/consistent-type-specifier-style': ['off'],
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
      },
    ],
    'react/prop-types': 'off',
    'react-refresh/only-export-components': 'off',
  },
};
