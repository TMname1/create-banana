import base from '../features/dep/base.js';
import pinia from '../features/dep/pinia.js';
import vueRouter from '../features/dep/vueRouter.js';
import type Generator from './generator.js';
import type { featsSelectType } from '../CLI/input.js';

export default async (files: Generator, featsList: featsSelectType) => {
  base(files, featsList);
  pinia(files, featsList);
  vueRouter(files, featsList);
  return featsList;
};
