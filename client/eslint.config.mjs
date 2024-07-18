import {dirname} from 'path';
import {fileURLToPath} from 'url';
import reactPlugin from 'eslint-plugin-react';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptParser from '@typescript-eslint/parser';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-vars': 'error',
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
          pathGroups: [
            {
              pattern: 'react*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@hooks/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@apis/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@pages/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@components/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@assets/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@utils/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@constants/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@mocks/*',
              group: 'internal',
              position: 'after',
            },
          ],
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          directory: './src',
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
  },
];
