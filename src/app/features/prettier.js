import fs from 'fs-extra';
import { templatePath } from '#src/utils/URL.js';
import path from 'path';

export default (files, { usePrettier }) => {
  if (!usePrettier) return;

  const prettierPath = path.join(templatePath, 'prettier');
  const pkg = fs.readJSONSync(path.join(prettierPath, 'package.json'));

  files.extendDevDepsPkg(pkg);
  files.extendScriptsPkg(pkg);

  files.copy(path.join(prettierPath, '.prettierrc'), '.prettierrc');
};
