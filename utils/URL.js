// 获得相对路径和模板目录路径的工具函数
import path from 'path'
import { fileURLToPath } from 'url'

// 拼接相对路径
const relativePath = (fileURL, targetURL) => {
  const __filename = fileURLToPath(fileURL)
  const __dirname = path.dirname(__filename)
  return path.join(__dirname, targetURL)
}
export { relativePath }

// 获取模板目录路径
const templatePath = fileURLToPath(new URL('../template', import.meta.url))
export { templatePath }
