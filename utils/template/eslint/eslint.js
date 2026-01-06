// 添加Eslint功能
import path from 'path';
import fs from 'fs-extra';
import { templatePath } from '../../URL.js';

const addEslint = async (projectName, flag) => {
  // 没有选择Eslint则直接返回
  if (!flag) return;
  // 路径
  const targetPackageJsonPath = path.join(
    process.cwd(),
    projectName,
    'package.json'
  );

  // 文件
  // 读取package.json文件
  const targetPkg = await fs.readJson(targetPackageJsonPath);
  // 读取添加Eslint附加的package.json文件
  const eslintPkg = await fs.readJson(
    path.join(templatePath, 'eslint', 'package.json')
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
