// comfirm path exists, if exists, prompt whether to overwrite
// if choose to overwrite, delete the existing folder and create a new folder
// if choose not to overwrite, exit the program
import fs from 'fs-extra';
import { select } from '@inquirer/prompts';
import chalk from 'chalk';

const confirmPathExists = async (projectName: string, projectDir: string) => {
  try {
    if (fs.pathExistsSync(projectDir)) {
      const isOverwrite = await select({
        message: `The target folder "${projectName}" is not empty. ${chalk.yellow('Overwrite')}?`,
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false },
        ],
      });
      if (!isOverwrite) {
        // TODO: 放一个更友好的提示
        //  例如：X操作取消(换英文)
        console.log('canceled!');
        process.exit(0);
      } else {
        await fs.remove(projectDir);
        await fs.mkdir(projectDir);
      }
    }
  } catch (err) {
    // TODO: 放一个更友好的提示
    console.error(err);
    process.exit(1);
  }
};

export default confirmPathExists;
