// 添加Eslint功能
import path from 'path'
import fs from 'fs-extra'
import { templatePath } from '../URL.js'

const addEslint = async (projectName) => {
  // 路径
  const templateEslintPath = path.join(templatePath, 'Eslint')
  const targetPath = path.join(process.cwd(), projectName)
  // 文件
  const basePackageJsonPath = path.join(templatePath, 'base', 'package.json')
  const eslintPackageJsonPath = path.join(templateEslintPath, 'package.json')
  const targetPackageJsonPath = path.join(targetPath, 'package.json')

  // 读取package.json文件
  const basePkg = await fs.readJson(basePackageJsonPath)
  // 读取添加Eslint附加的package.json文件
  const eslintPkg = await fs.readJson(eslintPackageJsonPath)

  basePkg.devDependencies = {
    ...basePkg.devDependencies,
    ...eslintPkg.devDependencies,
  }

  basePkg.scripts = {
    ...basePkg.scripts,
    ...eslintPkg.scripts,
  }

  await fs.writeJson(targetPackageJsonPath, basePkg, { spaces: 2 })

  // 复制Eslint配置文件
  const eslintConfigPath = path.join(templateEslintPath, 'eslint.config.js')
  const eslintConfigTargetPath = path.join(targetPath, 'eslint.config.js')
  fs.copyFileSync(eslintConfigPath, eslintConfigTargetPath)

  // 复制.eslintignore文件
  const eslintIgnorePath = path.join(templateEslintPath, '.eslintignore')
  const eslintIgnoreTargetPath = path.join(targetPath, '.eslintignore')
  fs.copyFileSync(eslintIgnorePath, eslintIgnoreTargetPath)
}

export default addEslint
