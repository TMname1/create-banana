import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export default class Generator {
  constructor(targetDir) {
    this.targetDir = targetDir;
    this.pkg = {};
    this.fileMiddlewares = [];
  }

  // package.json 方法
  writePkg(pkg) {
    this.pkg = { ...this.pkg, ...pkg };
  }

  extendDepsPkg(deps) {
    this.pkg.dependencies = { ...this.pkg.dependencies, ...deps };
  }
  extendDevDepsPkg(devDeps) {
    this.pkg.devDependencies = { ...this.pkg.devDependencies, ...devDeps };
  }
  extendScriptsPkg(scripts) {
    this.pkg.scripts = { ...this.pkg.scripts, ...scripts };
  }

  /**
   * 复制文件(夹)
   * @param {string} source - 源文件路径
   * @param {string} target - 目标文件路径
   */
  copy(source, target) {
    this.fileMiddlewares.push(() => {
      fs.copySync(source, path.join(this.targetDir, target));
    });
  }

  /**
   * 处理ejs模板文件
   * @param {string} source - 源文件路径
   * @param {string} target - 目标文件路径
   * @param {object} feats - 模板数据
   */
  render(source, target, feats) {
    this.fileMiddlewares.push(() => {
      fs.writeFileSync(
        path.join(this.targetDir, target),
        ejs.render(fs.readFileSync(source, 'utf-8'), feats)
      );
    });
  }

  // 最后调用，执行所有写入
  async generate() {
    fs.writeFileSync(
      path.join(this.targetDir, 'package.json'),
      JSON.stringify(this.pkg, null, 2)
    );
    this.fileMiddlewares.forEach((fileFunction) => fileFunction());
  }
}
