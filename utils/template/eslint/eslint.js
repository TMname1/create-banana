// 添加Eslint功能
import path from 'path';
import fs from 'fs-extra';
import { templatePath } from '../../URL.js';

// TODO: 优化变量名长度，提高可读性
const addEslint = async (projectName, flag) => {
  // 没有选择Eslint则直接返回
  if (!flag) return;
  // 路径
  const templateEslintPath = path.join(templatePath, 'eslint');
  const targetPath = path.join(process.cwd(), projectName);
  const targetPackageJsonPath = path.join(targetPath, 'package.json');

  // 文件
  // 读取package.json文件
  const targetPkg = await fs.readJson(targetPackageJsonPath);
  // 读取添加Eslint附加的package.json文件
  const eslintPkg = await fs.readJson(
    path.join(templateEslintPath, 'package.json')
  );

  targetPkg.devDependencies = {
    ...targetPkg.devDependencies,
    ...eslintPkg.devDependencies,
  };

  targetPkg.scripts = {
    ...targetPkg.scripts,
    ...eslintPkg.scripts,
  };

  await fs.writeJson(targetPackageJsonPath, targetPkg, { spaces: 2 });
};

export default addEslint;
