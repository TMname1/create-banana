// 渲染main.js，通过模板匹配pinia的使用情况
import ejs from 'ejs'
import { templatePath } from '#utils/URL.js'
import fs from 'fs-extra'
import path from 'path'

const addMain = async (projectName, usePinia) => {
  await fs.writeFile(
    path.join(process.cwd(), projectName, 'src', 'main.js'),
    ejs.render(await fs.readFile(path.join(templatePath, 'base', 'src', 'main.js.ejs'), 'utf-8'), {
      usePinia,
    }),
  )
  await fs.remove(path.join(process.cwd(), projectName, 'src', 'main.js.ejs'))
}

export default addMain
