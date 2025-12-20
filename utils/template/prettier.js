import { templatePath } from '../URL.js'
import path from 'path'
import fs from 'fs-extra'

const addPrettier = async (projectName, useEslint, flag) => {
  // 没有选择Prettier则直接返回
  if (!flag) return
  // 路径
  const templatePrettierPath = path.join(templatePath, 'prettier')
  const targetPath = path.join(process.cwd(), projectName)
  const targetPackageJson = path.join(targetPath, 'package.json')

  // 文件
  const targetPkg = await fs.readJson(targetPackageJson)
  const prettierPkg = await fs.readJson(path.join(templatePrettierPath, 'package.json'))

  // 添加package.json的内容
  targetPkg.scripts = {
    ...targetPkg.scripts,
    ...prettierPkg.scripts,
  }

  targetPkg.devDependencies = {
    ...targetPkg.devDependencies,
    ...prettierPkg.devDependencies,
  }

  await fs.writeJson(targetPackageJson, targetPkg, { spaces: 2 })

  // 复制.prettierignore文件
  const prettierignore = path.join(templatePrettierPath, '.prettierignore')
  fs.copy(prettierignore, path.join(targetPath, '.prettierignore'))

  // 复制.prettierrc.js文件
  const prettierrc = path.join(templatePrettierPath, '.prettierrc')
  fs.copy(prettierrc, path.join(targetPath, '.prettierrc.js'))
}

export default addPrettier
