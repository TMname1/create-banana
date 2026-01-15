import fs from 'fs-extra';
import { templatePath } from '#src/utils/URL.js';
import path from 'path';
import type Generator from '#src/app/core/generator.js';
import type { featsSelectType } from '#src/app/CLI/input.js';

export default (files: Generator, feats: featsSelectType) => {
  const basePath = feats.useTypescript
    ? path.join(templatePath, 'base', 'TS')
    : path.join(templatePath, 'base');

  files.writePkg(
    fs.readJSONSync(path.join(basePath, 'static', 'package.json'))
  );
  files.copy(path.join(basePath, 'static'), '');
  // To fix .gitignore can't publish to npm issue
  files.rename('_gitignore', '.gitignore');
  files.render(
    path.join(basePath, 'ejs', 'App.vue.ejs'),
    path.join('src', 'App.vue'),
    {
      ...feats,
    }
  );
  files.render(
    path.join(
      basePath,
      'ejs',
      feats.useTypescript ? 'main.ts.ejs' : 'main.js.ejs'
    ),
    path.join('src', feats.useTypescript ? 'main.ts' : 'main.js'),
    {
      ...feats,
    }
  );
};
