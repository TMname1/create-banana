import chalk from 'chalk';
import { input, checkbox } from '@inquirer/prompts';
import prompt from '#src/utils/prompt.js';

const inputProjectName = async () => {
  return await input({
    message: `Enter your ${chalk.yellow('project name')}:`,
    required: true,
  });
};

const featsSelect = async () => {
  const feats = await checkbox({
    message: `Please select the ${chalk.yellow('features')} to include:`,
    choices: [
      { name: 'Eslint', value: 'eslint' },
      { name: 'Prettier', value: 'prettier' },
      { name: 'Pinia', value: 'pinia' },
      { name: 'Vue-Router', value: 'vue-router' },
    ],
  });

  const useEslint = feats.includes('eslint');
  const usePrettier = feats.includes('prettier');
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
    usePinia,
    useVueRouter,
    usePiniaPluginPersistedstate,
    useHusky,
    useLintStaged,
  };
};

type featsSelectType = Awaited<ReturnType<typeof featsSelect>>;

export { inputProjectName, featsSelect };
export type { featsSelectType };
