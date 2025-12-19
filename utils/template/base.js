// 获取base模板
import path from 'path'
import { templatePath } from '../URL.js'
import fs from 'fs-extra'
import { confirm } from '@inquirer/prompts'

const basePath = path.join(templatePath, 'base')

const createBaseProject = async (projectName) => {
  const projectDir = path.join(process.cwd(), projectName)

  try {
    // 判断文件夹是否存在
    if (await fs.pathExists(projectDir)) {
      // 如果存在就提示是否要覆盖
      const isOverwrite = await confirm({
        message: '文件夹已存在，是否覆盖？',
        default: true,
      })
      if (!isOverwrite) {
        console.log('canceled!')
        return
      }
    } else {
      // 不存在就自动创建
      await fs.ensureDir(projectDir)
    }

    // 复制模板文件到目标目录
    fs.copySync(basePath, projectDir)
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

export default createBaseProject
