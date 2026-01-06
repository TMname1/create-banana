import chalk from 'chalk';
import { input } from '@inquirer/prompts';
import path from 'path';
import confirmPathExists from '#utils/pathExists.js';
import { base } from '#utils/exportFeat.js';
import Generator from './generator.js';

const projectName = await input({
  message: `Enter your ${chalk.yellow('project name')}:`,
  required: true,
});

const targetDir = path.join(process.cwd(), projectName);
// 确认路径存在
await confirmPathExists(projectName, targetDir);

const files = new Generator(targetDir);

// FIXME: 只是为了过eslint
const feats = {};

base(files, feats);

// TODO:
// 打印功能分开
// 选择功能分开
// 根据选择功能通过渲染函数进行渲染分开

// 把generator传入features中
