import fs from 'fs-extra';
import { templatePath } from '#src/utils/URL.js';
import path from 'path';
import type Generator from '#src/app/core/generator.js';
import type { featsSelectType } from '#src/app/CLI/input.js';

export default (files: Generator, feats: featsSelectType) => {
  const { useEslint, usePrettier, useLintStaged } = feats;

  if (!useLintStaged) return;

  const lintStagedPath = path.join(templatePath, 'devDep', 'lintStaged');

  const pkg = fs.readJSONSync(path.join(lintStagedPath, 'package.json'));
  files.extendDevDepsPkg(pkg);
  files.extendScriptsPkg(pkg);

  let config: object = {};
  if (useEslint) {
    config = fs.readJSONSync(path.join(lintStagedPath, 'eslint.json'));
  } else if (usePrettier) {
    config = fs.readJSONSync(path.join(lintStagedPath, 'prettier.json'));
  }
  files.writePkg(config);
};
