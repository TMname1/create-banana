// 渲染eslint.config.js文件
// 通过模板匹配prettier的选择情况
import ejs from 'ejs'
import { templatePath } from '#utils/URL.js'
import fs from 'fs-extra'
import path from 'path'

const addEslintConfig = async (projectName, usePrettier, flag) => {
  if (!flag) return
  await fs.writeFile(
    path.join(process.cwd(), projectName, 'eslint.config.js'),
    ejs.render(
      await fs.readFile(path.join(templatePath, 'eslint', 'eslint.config.js.ejs'), 'utf-8'),
      { usePrettier },
    ),
  )
}

export default addEslintConfig
