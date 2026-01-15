import { outPkgStr, outGitStr, outCommitizenStr } from '../CLI/output.js';
import { execa } from 'execa';
import prompt from '#src/utils/prompt.js';
import chalk from 'chalk';
import type { featsSelectType } from '#src/app/CLI/input.js';

export default async (feats: featsSelectType) => {
  if (
    !(await prompt(
      `Do you want to ${chalk.yellow.bold('execute')} the above commands now?`
    ))
  ) {
    return;
  }

  await execa({ shell: true, stdio: 'inherit' })`${outPkgStr}`;

  let installCommitizen = false;
  if (feats.useCommitizen) {
    installCommitizen = await prompt(
      `Do you want to ${chalk.yellow.bold('install the commitizen')} now?`
    );
    if (installCommitizen) {
      await execa({ shell: true, stdio: 'inherit' })`${outCommitizenStr}`;
    }
  }

  // if you select to use commitizen but not install it, skip git execution
  if (feats.useCommitizen && !installCommitizen) return;

  if (
    await prompt(
      `Do you want to ${chalk.yellow.bold('execute the git')} commands now?`
    )
  ) {
    await execa({ shell: true, stdio: 'inherit' })`${outGitStr}`;
  }
};
