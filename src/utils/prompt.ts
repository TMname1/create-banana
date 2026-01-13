import { select } from '@inquirer/prompts';
export default async (message: string) => {
  return await select({
    message,
    choices: [
      { name: 'Yes', value: true },
      { name: 'No', value: false },
    ],
  });
};
