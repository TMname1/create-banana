import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, prettier: prettierPlugin },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          printWidth: 80,
          tabWidth: 2,
          useTabs: false,
          semi: true,
          singleQuote: true,
          quoteProps: 'as-needed',
          jsxSingleQuote: false,
          trailingComma: 'es5',
          bracketSpacing: true,
          bracketSameLine: false,
          arrowParens: 'always',
          endOfLine: 'auto',
        },
      ],
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },

  globalIgnores([
    'node_modules/*',
    'dist/*',
    'build/*',
    'out/*',
    '.next/*',
    '.nuxt/*',
    'coverage/*',
    'public/*',
    'assets/*',
    '.cache/*',
    '.temp/*',
    '.tmp/*',
    '*.min.js',
    '*.bundle.js',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    '.env*',
    'docs/.vitepress/dist/*',
    '.eslintcache',
  ]),
]);
