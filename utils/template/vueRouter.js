import { templatePath } from '../URL.js';
import path from 'path';
import fs from 'fs-extra';

const addVueRouter = async (projectName, flag) => {
  // 没有选择vueRouter则直接返回
  if (!flag) return;
  // 路径
  const templateVueRouterPath = path.join(templatePath, 'vue-router');
  const targetPath = path.join(process.cwd(), projectName);
  const targetPackageJsonPath = path.join(targetPath, 'package.json');

  // 文件
  const targetPkg = await fs.readJson(targetPackageJsonPath);
  const vueRouterPkg = await fs.readJson(
    path.join(templateVueRouterPath, 'package.json')
  );

  // 添加package.json的内容
  targetPkg.devDependencies = {
    ...targetPkg.devDependencies,
    ...vueRouterPkg.devDependencies,
  };
  await fs.writeJson(targetPackageJsonPath, targetPkg, { spaces: 2 });

  // 复制components文件
  fs.copySync(
    path.join(templateVueRouterPath, 'components'),
    path.join(targetPath, 'components'),
    { overwrite: false }
  );
  // 复制router文件
  fs.copySync(
    path.join(templateVueRouterPath, 'router'),
    path.join(targetPath, 'router')
  );
  // 复制views文件
  fs.copySync(
    path.join(templateVueRouterPath, 'views'),
    path.join(targetPath, 'views')
  );
};

export default addVueRouter;
