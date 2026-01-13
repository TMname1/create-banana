import base from '#src/app/features/base.js';
import pinia from '#src/app/features/pinia.js';
import eslint from '#src/app/features/eslint.js';
import prettier from '#src/app/features/prettier.js';
import vueRouter from '#src/app/features/vueRouter.js';
import { featsSelect } from '#src/app/CLI/input.js';
import type Generator from './generator.js';

export default async (files: Generator) => {
  const featsList = await featsSelect();
  base(files, featsList);
  pinia(files, featsList);
  eslint(files, featsList);
  prettier(files, featsList);
  vueRouter(files, featsList);
  return featsList;
};
