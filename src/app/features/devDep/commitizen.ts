import fs from 'fs-extra';
import { templatePath } from '#src/utils/URL.js';
import path from 'path';
import type Generator from '#src/app/core/generator.js';
import type { featsSelectType } from '#src/app/CLI/input.js';

export default (files: Generator, feats: featsSelectType) => {
  const { useCommitizen } = feats;

  if (!useCommitizen) return;

  const commitizenPath = path.join(templatePath, 'devDep', 'commitizen');

  const pkg = fs.readJSONSync(path.join(commitizenPath, 'package.json'));
  files.extendScriptsPkg(pkg);
};
