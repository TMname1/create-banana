import base from '../features/base.js';
import pinia from '../features/pinia.js';
import eslint from '../features/eslint.js';
import prettier from '../features/prettier.js';
import vueRouter from '../features/vueRouter.js';
import husky from '../features/husky.js';
import lintStaged from '../features/lintStaged.js';
import commitizen from '../features/commitizen.js';
import { featsSelect } from '../CLI/input.js';
import type Generator from './generator.js';

export default async (files: Generator) => {
  const featsList = await featsSelect();
  base(files, featsList);
  pinia(files, featsList);
  eslint(files, featsList);
  prettier(files, featsList);
  vueRouter(files, featsList);
  husky(files, featsList);
  lintStaged(files, featsList);
  commitizen(files, featsList);
  return featsList;
};
