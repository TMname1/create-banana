import fs from 'fs-extra';
import { templatePath } from '#src/utils/URL.js';
import path from 'path';
import type Generator from '#src/app/core/generator.js';
import type { featsSelectType } from '#src/app/CLI/input.js';

export default (files: Generator, feats: featsSelectType) => {
  const { useEslint, usePrettier, useHusky, useLintStaged } = feats;

  if (!useHusky) return;

  const huskyPath = path.join(templatePath, 'husky');

  const pkg = fs.readJSONSync(path.join(huskyPath, 'package.json'));
  files.extendDevDepsPkg(pkg);
  files.extendScriptsPkg(pkg);

  // TODO: After npx husky-init finished,this render can only execute
  files.render(
    path.join(huskyPath, 'pre-commit.ejs'),
    path.join('.husky', 'pre-commit'),
    {
      useEslint,
      usePrettier,
      useLintStaged,
    }
  );
};
