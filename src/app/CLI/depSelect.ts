import { checkbox, select } from '@inquirer/prompts';
import chalk from 'chalk';
import prompt from '#src/utils/prompt.js';

export default async () => {
  const feats = await checkbox({
    message: `Please select the ${chalk.yellow('dependencies')} to include:`,
    choices: [
      { name: 'Pinia', value: 'pinia' },
      { name: 'Vue-Router', value: 'vue-router' },
    ],
  });

  const usePinia = feats.includes('pinia');
  const useVueRouter = feats.includes('vue-router');

  let usePiniaPluginPersistedstate = false;
  if (usePinia) {
    usePiniaPluginPersistedstate = await prompt(
      `Do you want to use ${chalk.yellow.bold(
        'pinia-plugin-persistedstate'
      )} for Pinia state persistence?`
    );
  }

  let useHTML5Mode = false;
  let useHashMode = false;
  if (useVueRouter) {
    const webMode = await select({
      message: `Select the ${chalk.yellow('Vue-Router mode')} to use:`,
      choices: [
        { name: 'HTML5 Mode', value: 'html5' },
        { name: 'Hash Mode', value: 'hash' },
      ],
    });
    useHTML5Mode = webMode.includes('html5');
    useHashMode = webMode.includes('hash');
  }

  return {
    usePinia,
    useVueRouter,
    usePiniaPluginPersistedstate,
    useHTML5Mode,
    useHashMode,
  };
};
