import fs from 'fs-extra';
import { templatePath } from '#utils/URL.js';
import path from 'path';

export default (files, useEslint, usePrettier) => {
  if (!useEslint) return;

  const eslintPath = path.join(templatePath, 'eslint');

  const pkg = fs.readJSONSync(path.join(eslintPath, 'package.json'));
  files.extendDevDepsPkg(pkg);
  files.extendScriptsPkg(pkg);

  files.render(
    path.join(eslintPath, 'eslint.config.js.ejs'),
    'eslint.config.js',
    {
      usePrettier,
    }
  );
};
