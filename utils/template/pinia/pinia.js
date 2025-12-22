// 添加pinia功能
import path from 'path'
import fs from 'fs-extra'
import { templatePath } from '#utils/URL.js'

const addPinia = async (projectName, flag) => {
  if (!flag) return
  const targetPkg = fs.readJsonSync(path.join(process.cwd(), projectName, 'package.json'))
  const piniaPkg = fs.readJsonSync(path.join(templatePath, 'pinia', 'package.json'))

  // package.json的配置
  targetPkg.dependencies = {
    ...targetPkg.dependencies,
    ...piniaPkg.dependencies,
  }

  fs.writeJSONSync(path.join(process.cwd(), projectName, 'package.json'), targetPkg, { spaces: 2 })

  fs.copySync(
    path.join(templatePath, 'pinia', 'counter.js'),
    path.join(process.cwd(), projectName, 'src', 'stores', 'counter.js'),
  )
}

export default addPinia
