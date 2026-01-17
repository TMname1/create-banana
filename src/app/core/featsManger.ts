import { featsSelect } from '../CLI/input.js';
import type Generator from './generator.js';
import depManger from './depManger.js';
import devDepManger from './devDepManger.js';

export default async (files: Generator) => {
  const featsList = await featsSelect();
  depManger(files, featsList);
  devDepManger(files, featsList);
  return featsList;
};
