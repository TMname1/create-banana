import { templatePath } from '../URL.js'
import path from 'path'
import fs from 'fs-extra'

const addPrettier = async (projectName, flag) => {
  // 没有选择Prettier则直接返回
  if (!flag) return
  // 路径
  const templatePrettierPath = path.join(templatePath, 'prettier')
  const targetPath = path.join(process.cwd(), projectName)
  const targetPackageJsonPath = path.join(targetPath, 'package.json')

  // 文件
  const targetPkg = await fs.readJson(targetPackageJsonPath)
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

  await fs.writeJson(targetPackageJsonPath, targetPkg, { spaces: 2 })

  // 复制.prettierrc文件
  const prettierrc = path.join(templatePrettierPath, '.prettierrc')
  fs.copy(prettierrc, path.join(targetPath, '.prettierrc'))
}

export default addPrettier
