import fs from 'fs-extra';
import { templatePath } from '#src/utils/URL.js';
import path from 'path';
import type Generator from '#src/app/core/generator.js';
import type { featsSelectType } from '#src/app/CLI/input.js';

export default (files: Generator, feats: featsSelectType) => {
  const { useEslint, usePrettier, useHusky, useLintStaged } = feats;

  if (!useHusky) return;

  const huskyPath = path.join(templatePath, 'husky');

  const pkg = fs.readJSONSync(path.join(huskyPath, 'static', 'package.json'));
  files.extendDevDepsPkg(pkg);
  files.extendScriptsPkg(pkg);

  // TODO: copy .husky/_ files

  files.render(
    path.join(huskyPath, 'ejs', 'pre-commit.ejs'),
    path.join('.husky', 'pre-commit'),
    {
      useEslint,
      usePrettier,
      useLintStaged,
    }
  );
};
