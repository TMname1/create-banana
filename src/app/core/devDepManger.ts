import eslint from '../features/devDep/eslint.js';
import prettier from '../features/devDep/prettier.js';
import husky from '../features/devDep/husky.js';
import lintStaged from '../features/devDep/lintStaged.js';
import commitizen from '../features/devDep/commitizen.js';
import type Generator from './generator.js';
import type { featsSelectType } from '../CLI/input.js';

export default async (files: Generator, featsList: featsSelectType) => {
  eslint(files, featsList);
  prettier(files, featsList);
  husky(files, featsList);
  lintStaged(files, featsList);
  commitizen(files, featsList);
  return featsList;
};
