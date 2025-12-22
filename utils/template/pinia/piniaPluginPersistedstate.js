// 添加pinia自动持久化功能
import fs from 'fs-extra'
import path from 'path'
import { templatePath } from '#utils/URL.js'

const addPiniaPluginPersistedstate = async (projectName, flag) => {
  if (!flag) return
  const targetPkg = fs.readJsonSync(path.join(process.cwd(), projectName, 'package.json'))
  const persistPkg = fs.readJsonSync(
    path.join(templatePath, 'pinia', 'pinia-plugin-persistedstate', 'package.json'),
  )

  // package.json的配置
  targetPkg.dependencies = {
    ...targetPkg.dependencies,
    ...persistPkg.dependencies,
  }

  fs.writeJSONSync(path.join(process.cwd(), projectName, 'package.json'), targetPkg, { spaces: 2 })

  fs.copySync(
    path.join(templatePath, 'pinia', 'pinia-plugin-persistedstate', 'key.js'),
    path.join(process.cwd(), projectName, 'src', 'stores', 'key.js'),
  )
}

export default addPiniaPluginPersistedstate
