import fs from 'fs-extra';
import { templatePath } from '#src/utils/URL.js';
import path from 'path';
import type Generator from '#src/app/core/generator.js';
import type { featsSelectType } from '#src/app/CLI/input.js';

export default (files: Generator, feats: featsSelectType) => {
  if (!feats.useTailwindcss) return;

  const tailwindcssPath = path.join(templatePath, 'tailwindcss');

  files.extendDepsPkg(
    fs.readJSONSync(path.join(tailwindcssPath, 'package.json'))
  );

  files.copy(
    path.join(tailwindcssPath, 'src', 'styles'),
    path.join('src', 'styles')
  );
};
