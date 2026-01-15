import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import json from '@eslint/json';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.vue'],
    plugins: { vue: pluginVue },
    extends: [pluginVue.configs['flat/essential']],
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },

  // only apply TypeScript configs to .ts files
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),

  // global Prettier config
  {
    plugins: { prettier: prettierPlugin },
    extends: [prettierConfig],
    rules: {
      'prettier/prettier': ['warn'],
    },
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
    'template/*',
    '.tmp/*',
    '*.min.js',
    '*.bundle.js',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    '.env*',
    'docs/.vitepress/dist/*',
  ]),
]);
