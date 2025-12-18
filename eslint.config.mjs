import js from '@eslint/js'
import globals from 'globals'
import json from '@eslint/json'
import { defineConfig } from 'eslint/config'
import prettierPlugin from 'eslint-plugin-prettier'

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
          $schema: 'https://json.schemastore.org/prettierrc',
          semi: false,
          singleQuote: true,
          printWidth: 100,
          endOfLine: 'auto',
        },
      ],
    },
  },
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
])
