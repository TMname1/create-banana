import { outPkgStr, outGitStr } from '../CLI/output.js';
import { execa } from 'execa';

export default async (ifExecute: boolean) => {
  if (!ifExecute) return;
  await execa`${outPkgStr}`;
  await execa`${outGitStr}`;
};
