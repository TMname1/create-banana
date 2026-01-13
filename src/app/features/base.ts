import fs from 'fs-extra';
import { templatePath } from '#src/utils/URL.js';
import path from 'path';
import type Generator from '#src/app/core/generator.js';
import type { featsSelectType } from '#src/app/CLI/input.js';

export default (files: Generator, feats: featsSelectType) => {
  const basePath = path.join(templatePath, 'base');
  files.writePkg(
    fs.readJSONSync(path.join(basePath, 'static', 'package.json'))
  );
  files.copy(path.join(basePath, 'static'), '');
  files.render(
    path.join(basePath, 'ejs', 'App.vue.ejs'),
    path.join('src', 'App.vue'),
    {
      ...feats,
    }
  );
  files.render(
    path.join(basePath, 'ejs', 'main.js.ejs'),
    path.join('src', 'main.js'),
    {
      ...feats,
    }
  );
};
