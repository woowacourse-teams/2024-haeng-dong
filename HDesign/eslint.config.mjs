import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {fixupConfigRules, fixupPluginRules} from '@eslint/compat';
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      'airbnb',
      'airbnb/hooks',
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:import/typescript',
      'plugin:import/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'prettier',
      'plugin:prettier/recommended',
    ),
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
      parser: tsParser,
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },

        typescript: {
          directory: './lib',
        },
      },

      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },

    rules: {
      'no-use-before-define': 0,
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'import/prefer-default-export': 0,
      'import/no-named-as-default': 0,
      'import/extensions': 0,
      'import/no-cycle': 0,
      'react/no-unknown-property': 0,
      'react/jsx-filename-extension': [1, {extensions: ['.ts', '.tsx']}],
      'react/function-component-definition': 0,
      'react/jsx-props-no-spreading': 0,
      'react/jsx-key': 0,
      'react/button-has-type': 'off',
      'no-shadow': 0,
      'no-console': 0,
      'no-alert': 0,
      'react/no-children-prop': 'off',
      'react/no-array-index-key': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'react/jsx-no-constructed-context-values': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',

      '@typescript-eslint/no-unused-vars': 0,

      // 'react/jsx-uses-vars': 'error',
      // '@typescript-eslint/no-use-before-define': ['error'],
      // '@typescript-eslint/explicit-module-boundary-types': 'error',

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
              pattern: '@components/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@layouts/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@assets/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@theme/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@token/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@types/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@utils/*',
              group: 'internal',
              position: 'after',
            },
          ],
        },
      ],
    },
  },
];
