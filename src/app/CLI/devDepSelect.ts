import { checkbox } from '@inquirer/prompts';
import chalk from 'chalk';
import prompt from '#src/utils/prompt.js';

export default async () => {
  const feats = await checkbox({
    message: `Please select the ${chalk.yellow('devDependencies')} to include:`,
    choices: [
      { name: 'Eslint', value: 'eslint' },
      { name: 'Prettier', value: 'prettier' },
      { name: 'Commitizen', value: 'commitizen' },
    ],
  });

  const useEslint = feats.includes('eslint');
  const usePrettier = feats.includes('prettier');
  const useCommitizen = feats.includes('commitizen');

  let useHusky = false;
  if (useEslint || usePrettier) {
    useHusky = await prompt(
      `Do you want to use ${chalk.yellow.bold('Husky')} for Git hooks?`
    );
  }

  let useLintStaged = false;
  if (useHusky) {
    useLintStaged = await prompt(
      `Do you want to use ${chalk.yellow.bold(
        'lint-staged'
      )} to run linters on staged files?`
    );
  }

  return {
    useEslint,
    usePrettier,
    useHusky,
    useLintStaged,
    useCommitizen,
  };
};
