// 添加Eslint功能
import path from 'path'
import fs from 'fs-extra'
import { templatePath } from '../URL.js'

const addEslint = async (projectName) => {
  // 路径
  const basePackageJsonPath = path.join(templatePath, 'base', 'package.json')
  const eslintPackageJsonPath = path.join(templatePath, 'Eslint', 'package.json')
  const targetPackageJsonPath = path.join(process.cwd(), projectName, 'package.json')

  // 读取package.json文件
  const basePkg = await fs.readJson(basePackageJsonPath)
  // 读取添加Eslint附加的package.json文件
  const eslintPkg = await fs.readJson(eslintPackageJsonPath)

  basePkg.devDependencies = {
    ...basePkg.devDependencies,
    ...eslintPkg.devDependencies,
  }

  await fs.writeJson(targetPackageJsonPath, basePkg, { spaces: 2 })

  // 复制Eslint配置文件
  const eslintConfigPath = path.join(templatePath, 'Eslint', 'eslint.config.js')
  const eslintConfigTargetPath = path.join(process.cwd(), projectName, 'eslint.config.js')
  fs.copyFileSync(eslintConfigPath, eslintConfigTargetPath)
}

export default addEslint
