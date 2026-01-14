import { outPkgStr, outGitStr } from '../CLI/output.js';
import { execa } from 'execa';
import prompt from '#src/utils/prompt.js';
import chalk from 'chalk';

export default async () => {
  if (
    !(await prompt(
      `Do you want to ${chalk.yellow.bold('execute')} the above commands now?`
    ))
  )
    return;

  await execa`${outPkgStr}`;
  console.log('i have come here');

  if (
    await prompt(
      `Do you want to ${chalk.yellow.bold('execute the git')} commands now?`
    )
  )
    await execa`${outGitStr}`;
};
