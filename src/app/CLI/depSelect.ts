import { checkbox, select } from '@inquirer/prompts';
import chalk from 'chalk';
import prompt from '#src/utils/prompt.js';
import type { depFeatsType } from './input.js';

export default async (depFeats: depFeatsType) => {
  const feats = await checkbox({
    message: `Please select the ${chalk.yellow('dependencies')} to include:`,
    choices: [
      { name: 'Pinia', value: 'pinia' },
      { name: 'Vue-Router', value: 'vue-router' },
      { name: 'TailwindCSS', value: 'tailwindcss' },
    ],
  });

  depFeats.usePinia = feats.includes('pinia');
  depFeats.useVueRouter = feats.includes('vue-router');
  depFeats.useTailwindcss = feats.includes('tailwindcss');

  if (depFeats.usePinia) {
    depFeats.usePiniaPluginPersistedstate = await prompt(
      `Do you want to use ${chalk.yellow.bold(
        'pinia-plugin-persistedstate'
      )} for Pinia state persistence?`
    );
  }

  if (depFeats.useVueRouter) {
    const webMode = await select({
      message: `Select the ${chalk.yellow('Vue-Router mode')} to use:`,
      choices: [
        { name: 'HTML5 Mode', value: 'html5' },
        { name: 'Hash Mode', value: 'hash' },
      ],
    });
    depFeats.useHTML5Mode = webMode.includes('html5');
    depFeats.useHashMode = webMode.includes('hash');
  }
};
