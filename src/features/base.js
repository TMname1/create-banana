import fs from 'fs-extra';
import { templatePath } from '#utils/URL.js';
import path from 'path';

export default (files, feats) => {
  const basePath = path.join(templatePath, 'base');
  files.writePkg(fs.readJSONSync(path.join(basePath, 'package.json')));
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
