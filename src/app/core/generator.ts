import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

interface PackageJSON {
  dependencies?: {
    [key: string]: string;
  };
  devDependencies?: {
    [key: string]: string;
  };
  scripts?: {
    [key: string]: string;
  };
}

export default class Generator {
  targetDir: string;
  pkg: PackageJSON;
  fileMiddlewares: Array<() => void>;

  constructor(targetDir: string) {
    this.targetDir = targetDir;
    this.pkg = {};
    this.fileMiddlewares = [];
  }

  // package.json functions
  writePkg(pkg: PackageJSON) {
    this.pkg = { ...this.pkg, ...pkg };
  }

  extendDepsPkg(deps: PackageJSON) {
    this.pkg.dependencies = { ...this.pkg.dependencies, ...deps.dependencies };
  }
  extendDevDepsPkg(devDeps: PackageJSON) {
    this.pkg.devDependencies = {
      ...this.pkg.devDependencies,
      ...devDeps.devDependencies,
    };
  }
  extendScriptsPkg(scripts: PackageJSON) {
    this.pkg.scripts = { ...this.pkg.scripts, ...scripts.scripts };
  }

  /**
   * @param {string} source - source file path
   * @param {string} target - target file path
   */
  copy(source: string, target: string) {
    this.fileMiddlewares.push(() => {
      fs.copySync(source, path.join(this.targetDir, target));
    });
  }

  /**
   * render a template file with ejs
   * @param {string} source - source file path
   * @param {string} target - target file path
   * @param {object} feats - ejs render options
   */
  render(source: string, target: string, feats: object) {
    this.fileMiddlewares.push(() => {
      fs.writeFileSync(
        path.join(this.targetDir, target),
        ejs.render(fs.readFileSync(source, 'utf-8'), feats)
      );
    });
  }

  // finally generate all files
  async generate() {
    this.fileMiddlewares.forEach((fileFunction) => fileFunction());
    fs.writeFileSync(
      path.join(this.targetDir, 'package.json'),
      JSON.stringify(this.pkg, null, 2)
    );
  }
}
