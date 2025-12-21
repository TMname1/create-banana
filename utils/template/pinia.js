// 添加pinia功能
import path from 'path'
import fs from 'fs-extra'
import { templatePath } from '../URL.js'

const addPinia = async (projectName, flag) => {
  if (!flag) return
  const targetPkg = await fs.readJson(
    path.join(path.join(process.cwd(), projectName), 'package.json'),
  )
  const piniaPkg = await fs.readJson(path.join(templatePath, 'pinia', 'package.json'))

  // package.json的配置
  targetPkg.dependencies = {
    ...targetPkg.dependencies,
    ...piniaPkg.dependencies,
  }

  // 复制stores文件夹
  fs.copySync(
    path.join(templatePath, 'pinia', 'stores'),
    path.join(process.cwd(), projectName, 'src'),
  )
}

export default addPinia
