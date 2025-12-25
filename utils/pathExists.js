// 确认路径是否存在，若存在则提示是否覆盖
// 若选择覆盖则删除已存在的文件夹，并新建一个文件夹
// 若选择不覆盖则退出程序
import fs from 'fs-extra';
import { select } from '@inquirer/prompts';
import chalk from 'chalk';

const confirmPathExists = async (projectName, projectDir) => {
  try {
    // 判断文件夹是否存在
    if (await fs.pathExists(projectDir)) {
      // 如果存在就提示是否要覆盖
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
        // 退出程序
        process.exit(0);
      } else {
        // 删除已存在的文件夹并新建一个文件夹
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
