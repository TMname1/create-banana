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

const featsSelect = async () => {
  const useTypescript = await prompt(
    `Do you want to use ${chalk.yellow.bold('TypeScript')} in your project?`
  );
  const depFeats = await depSelect();
  const devDepFeats = await devDepSelect();

  return {
    useTypescript,
    ...depFeats,
    ...devDepFeats,
  };
};

type featsSelectType = Awaited<ReturnType<typeof featsSelect>>;

export { inputProjectName, featsSelect };
export type { featsSelectType };
