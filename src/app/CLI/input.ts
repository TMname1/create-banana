import chalk from 'chalk';
import { input } from '@inquirer/prompts';
import prompt from '#src/utils/prompt.js';
import depSelect from './depSelect.js';
import devDepSelect from './devDepSelect.js';

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

const depFeats = {
  usePinia: false,
  useVueRouter: false,
  useTailwindcss: false,
  usePiniaPluginPersistedstate: false,
  useHTML5Mode: false,
  useHashMode: false,
};

const devDepFeats = {
  useEslint: false,
  usePrettier: false,
  useHusky: false,
  useLintStaged: false,
  useCommitizen: false,
  usePrettierPluginTailwindcss: false,
};

const featsSelect = async () => {
  const useTypescript = await prompt(
    `Do you want to use ${chalk.yellow.bold('TypeScript')} in your project?`
  );

  await depSelect(depFeats);
  await devDepSelect(devDepFeats);

  return {
    useTypescript,
    ...depFeats,
    ...devDepFeats,
  };
};

type featsSelectType = Awaited<ReturnType<typeof featsSelect>>;
type depFeatsType = typeof depFeats;
type devDepFeatsType = typeof devDepFeats;

export { inputProjectName, featsSelect, depFeats };
export type { featsSelectType, depFeatsType, devDepFeatsType };
