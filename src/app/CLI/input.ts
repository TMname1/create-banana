import chalk from 'chalk';
import { input, checkbox, select } from '@inquirer/prompts';

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
    usePiniaPluginPersistedstate = await select({
      message: `Do you want to use ${chalk.yellow.bold('pinia-plugin-persistedstate')} for Pinia state persistence?`,
      choices: [
        { name: 'Yes', value: true },
        { name: 'No', value: false },
      ],
    });
  }

  return {
    useEslint,
    usePrettier,
    usePinia,
    useVueRouter,
    usePiniaPluginPersistedstate,
  };
};

type featsSelectType = Awaited<ReturnType<typeof featsSelect>>;

export { inputProjectName, featsSelect };
export type { featsSelectType };
