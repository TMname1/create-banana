import fs from 'fs-extra';
import { templatePath } from '#src/utils/URL.js';
import path from 'path';
import type Generator from '#src/app/core/generator.js';
import type { featsSelectType } from '#src/app/CLI/input.js';

export default (files: Generator, feats: featsSelectType) => {
  const { useEslint, usePrettier, useTypescript } = feats;

  if (!useEslint) return;

  const eslintPath = useTypescript
    ? path.join(templatePath, 'eslint', 'TS')
    : path.join(templatePath, 'eslint');

  const pkg = fs.readJSONSync(path.join(eslintPath, 'package.json'));
  files.extendDevDepsPkg(pkg);
  files.extendScriptsPkg(pkg);

  files.render(
    path.join(
      eslintPath,
      useTypescript ? 'eslint.config.ts.ejs' : 'eslint.config.js.ejs'
    ),
    useTypescript ? 'eslint.config.ts' : 'eslint.config.js',
    {
      usePrettier,
    }
  );

  if (!usePrettier) return;

  files.extendDevDepsPkg(
    fs.readJSONSync(path.join(eslintPath, 'prettierPkg.json'))
  );
};
