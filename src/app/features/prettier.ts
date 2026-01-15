import fs from 'fs-extra';
import { templatePath } from '#src/utils/URL.js';
import path from 'path';
import type Generator from '#src/app/core/generator.js';
import type { featsSelectType } from '#src/app/CLI/input.js';

export default (files: Generator, feats: featsSelectType) => {
  const { usePrettier } = feats;

  if (!usePrettier) return;

  const prettierPath = path.join(templatePath, 'prettier');
  const pkg = fs.readJSONSync(path.join(prettierPath, 'package.json'));

  files.extendDevDepsPkg(pkg);
  files.extendScriptsPkg(pkg);

  files.copy(path.join(prettierPath, '.prettierrc'), '.prettierrc');
  files.copy(path.join(prettierPath, '.prettierignore'), '.prettierignore');
};
