import fs from 'fs-extra';
import { templatePath } from '#src/utils/URL.js';
import path from 'path';
import type Generator from '#src/app/core/generator.js';
import type { featsSelectType } from '#src/app/CLI/input.js';

export default (files: Generator, feats: featsSelectType) => {
  const { usePinia, usePiniaPluginPersistedstate } = feats;
  if (!usePinia) return;

  const piniaPath = path.join(templatePath, 'pinia');

  files.extendDepsPkg(fs.readJSONSync(path.join(piniaPath, 'package.json')));

  files.copy(
    path.join(piniaPath, 'counter.js'),
    path.join('src', 'stores', 'counter.js')
  );

  if (!usePiniaPluginPersistedstate) return;

  const persistPath = path.join(piniaPath, 'pinia-plugin-persistedstate');

  files.extendDepsPkg(fs.readJSONSync(path.join(persistPath, 'package.json')));

  files.copy(
    path.join(persistPath, 'key.js'),
    path.join('src', 'stores', 'key.js')
  );
};
