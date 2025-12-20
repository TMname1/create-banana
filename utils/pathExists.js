// 确认路径是否存在，若存在则提示是否覆盖
// 若选择覆盖则删除已存在的文件夹，并新建一个文件夹
// 若选择不覆盖则退出程序
import fs from 'fs-extra'
import { confirm } from '@inquirer/prompts'

const confirmPathExists = async (projectDir) => {
  try {
    // 判断文件夹是否存在
    if (await fs.pathExists(projectDir)) {
      // 如果存在就提示是否要覆盖
      const isOverwrite = await confirm({
        message: '文件夹已存在，是否覆盖？',
        default: true,
      })
      if (!isOverwrite) {
        // TODO: 放一个更友好的提示
        console.log('canceled!')
        // 退出程序
        process.exit(0)
      } else {
        // 删除已存在的文件夹并新建一个文件夹
        await fs.remove(projectDir)
        await fs.mkdir(projectDir)
      }
    }
  } catch (err) {
    // TODO: 放一个更友好的提示
    console.error(err)
  }
}

export default confirmPathExists
