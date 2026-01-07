import path from 'path';
import confirmPathExists from '#utils/pathExists.js';
import Generator from './generator.js';
import { inputProjectName } from './input.js';
import {
  outPkgCommand,
  outGitCommand,
  PrintBANANA,
  rainbowPrint,
} from './output.js';
import featsManager from './featsManger.js';

export default async () => {
  await PrintBANANA();

  const projectName = await inputProjectName();
  const targetDir = path.join(process.cwd(), projectName);
  // 确认路径存在，存在就询问是否覆盖
  await confirmPathExists(projectName, targetDir);

  // 创建文件生成器，根据选择功能生成模板
  const files = new Generator(targetDir);
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
