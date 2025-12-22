// 渲染App.vue，通过模板匹配pinia的使用情况
import ejs from 'ejs'
import { templatePath } from '#utils/URL.js'
import fs from 'fs-extra'
import path from 'path'

const addAppVue = async (projectName, usePinia) => {
  await fs.writeFile(
    path.join(process.cwd(), projectName, 'src', 'App.vue'),
    ejs.render(await fs.readFile(path.join(templatePath, 'base', 'src', 'App.vue.ejs'), 'utf-8'), {
      usePinia,
    }),
  )
  await fs.remove(path.join(process.cwd(), projectName, 'src', 'App.vue.ejs'))
}

export default addAppVue
