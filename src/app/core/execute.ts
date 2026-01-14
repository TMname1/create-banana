import {
  outPkgStr,
  outGitStr,
  outCommitizenStr,
  greenColor,
} from '../CLI/output.js';
import { execa } from 'execa';
import prompt from '#src/utils/prompt.js';
import chalk from 'chalk';

export default async () => {
  if (
    !(await prompt(
      `Do you want to ${chalk.yellow.bold('execute')} the above commands now?`
    ))
  ) {
    return;
  }

  await execa({ shell: true, stdio: 'inherit' })`${outPkgStr}`;

  if (
    await prompt(
      `Do you want to ${chalk.yellow.bold('install the commitizen')} now?`
    )
  ) {
    await execa({ shell: true, stdio: 'inherit' })`${outCommitizenStr}`;
  }

  if (
    await prompt(
      `Do you want to ${chalk.yellow.bold('execute the git')} commands now?`
    )
  ) {
    await execa({ shell: true, stdio: 'inherit' })`${outGitStr}`;
  }

  console.log(
    chalk.rgb(...greenColor).bold('\nAll commands executed successfully!\n')
  );
};
