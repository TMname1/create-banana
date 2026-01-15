import chalk from 'chalk';
import { input, checkbox, select } from '@inquirer/prompts';
import prompt from '#src/utils/prompt.js';

const inputProjectName = async () => {
  return await input({
    message: `Enter your ${chalk.yellow('project name')}:`,
    required: true,
    validate: (value) => {
      // Check for illegal characters generally not allowed in filenames across OSs (Windows is most restrictive)
      if (/[\\/:*?"<>|]/.test(value)) {
        return 'Project name cannot contain special characters like \\ / : * ? " < > |';
      }
      return true;
    },
  });
};

const featsSelect = async () => {
  const useTypescript = await prompt(
    `Do you want to use ${chalk.yellow.bold('TypeScript')} in your project?`
  );

  const feats = await checkbox({
    message: `Please select the ${chalk.yellow('features')} to include:`,
    choices: [
      { name: 'Eslint', value: 'eslint' },
      { name: 'Prettier', value: 'prettier' },
      { name: 'Pinia', value: 'pinia' },
      { name: 'Vue-Router', value: 'vue-router' },
      { name: 'Commitizen', value: 'commitizen' },
    ],
  });

  const useEslint = feats.includes('eslint');
  const usePrettier = feats.includes('prettier');
  const usePinia = feats.includes('pinia');
  const useVueRouter = feats.includes('vue-router');
  const useCommitizen = feats.includes('commitizen');

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
    useTypescript,
    useEslint,
    usePrettier,
    usePinia,
    useVueRouter,
    usePiniaPluginPersistedstate,
    useHusky,
    useLintStaged,
    useCommitizen,
    useHTML5Mode,
    useHashMode,
  };
};

type featsSelectType = Awaited<ReturnType<typeof featsSelect>>;

export { inputProjectName, featsSelect };
export type { featsSelectType };
