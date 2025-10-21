import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { prettier, 'simple-import-sort': simpleImportSort },
    rules: {
      ...prettier.configs.recommended.rules,
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$', '^react-dom$'],
            ['^node:'],
            ['^@?\\w'],
            ['^@app(?:/|$)', '^@src(?:/|$)', '^~(?:/|$)', '^src(?:/|$)', '^/'],
            ['^\\.\\.(?!/?$)', '^\\.\\./', '^\\.(?!/?$)', '^\\./'],
            ['^.+\\.(svg|png|jpe?g|gif|webp|avif)$'],
            ['^.+\\.(css|scss|sass|less|styl)$', '^\\u0000'],
          ],
        },
      ],
    },
  },
  {
    files: ['**/index.ts'],
    rules: {
      'simple-import-sort/exports': 'error',
    },
  },
])
