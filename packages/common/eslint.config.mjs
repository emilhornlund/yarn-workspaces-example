import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.ts'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      eslintConfigPrettier,
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
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
]);
