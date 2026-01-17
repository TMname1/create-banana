import { checkbox } from '@inquirer/prompts';
import chalk from 'chalk';
import prompt from '#src/utils/prompt.js';
import type { devDepFeatsType } from './input.js';
import { depFeats } from './input.js';

export default async (devDepFeats: devDepFeatsType) => {
  const feats = await checkbox({
    message: `Please select the ${chalk.yellow('devDependencies')} to include:`,
    choices: [
      { name: 'Eslint', value: 'eslint' },
      { name: 'Prettier', value: 'prettier' },
      { name: 'Commitizen', value: 'commitizen' },
    ],
  });

  devDepFeats.useEslint = feats.includes('eslint');
  devDepFeats.usePrettier = feats.includes('prettier');
  devDepFeats.useCommitizen = feats.includes('commitizen');

  if (devDepFeats.useEslint || devDepFeats.usePrettier) {
    devDepFeats.useHusky = await prompt(
      `Do you want to use ${chalk.yellow.bold('Husky')} for Git hooks?`
    );
  }

  if (devDepFeats.useHusky) {
    devDepFeats.useLintStaged = await prompt(
      `Do you want to use ${chalk.yellow.bold(
        'lint-staged'
      )} to run linters on staged files?`
    );
  }

  if (depFeats.useTailwindcss && devDepFeats.usePrettier) {
    devDepFeats.usePrettierPluginTailwindcss = await prompt(
      `Do you want to use ${chalk.yellow.bold('Prettier-Plugin-Tailwindcss')} for Tailwind CSS formatting?`
    );
  }
};
