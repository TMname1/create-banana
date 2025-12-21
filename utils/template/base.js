// 获取base模板
import path from 'path'
import { templatePath } from '../URL.js'
import fs from 'fs-extra'
import confirmPathExists from '../pathExists.js'

const basePath = path.join(templatePath, 'base', 'baseFiles')

const createBaseProject = async (projectName) => {
  const projectDir = path.join(process.cwd(), projectName)
  // 确认路径存在
  await confirmPathExists(projectName, projectDir)
  // 复制模板文件到目标目录
  fs.copySync(basePath, projectDir)

  const packageJsonPath = path.join(projectDir, 'package.json')
  const packageJson = await fs.readJson(packageJsonPath)
  packageJson.name = projectName
  // 写回package.json文件
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
}

export default createBaseProject
