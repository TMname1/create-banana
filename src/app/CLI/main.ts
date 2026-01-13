import path from 'path';
import confirmPathExists from '#src/utils/pathExists.js';
import Generator from '#src/app/core/generator.js';
import { inputProjectName } from './input.js';
import {
  outPkgCommand,
  outGitCommand,
  PrintBANANA,
  rainbowPrint,
} from './output.js';
import featsManager from '#src/app/core/featsManger.js';

export default async () => {
  await PrintBANANA();

  const projectName = await inputProjectName();
  const targetDir = path.join(process.cwd(), projectName);
  // ensure the target directory does not already exist
  // if it exists, prompt the user to confirm overwriting
  await confirmPathExists(projectName, targetDir);

  // create a new Generator to handle feature choices and file generation
  const files = new Generator(targetDir);
  // TODO: add TS feat support
  const featsList = await featsManager(files);
  files.generate();

  // TODO: 自动化流程
  /** 自动化流程: 目前只生成了文件，让用户手动安装依赖。
    建议: 在生成结束后，询问用户 "是否立即安装依赖?" 和 "是否初始化 Git 仓库?"。
    实现: 使用 execa 或 cross-spawn 自动执行 install 和 git init 命令。 
  */
  rainbowPrint(
    '\nProject initialization complete. You may now execute the following commands:\n'
  );
  outPkgCommand(projectName, featsList);

  rainbowPrint('Initialize Git using the following command:\n');
  outGitCommand();
};
