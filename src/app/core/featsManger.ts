import base from '#src/features/base.js';
import pinia from '#src/features/pinia.js';
import eslint from '#src/features/eslint.js';
import prettier from '#src/app/features/prettier.js';
import vueRouter from '#src/features/vueRouter.js';
import { featsSelect } from '#src/CLI/input.js';

export default async (files) => {
  const featsList = await featsSelect();
  base(files, featsList);
  pinia(files, featsList);
  eslint(files, featsList);
  prettier(files, featsList);
  vueRouter(files, featsList);
  return featsList;
};
