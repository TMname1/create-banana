import fs from 'fs-extra';
import { templatePath } from '#src/utils/URL.js';
import path from 'path';
import type Generator from '#src/app/core/generator.js';
import type { featsSelectType } from '#src/app/CLI/input.js';

export default (files: Generator, feats: featsSelectType) => {
  const {
    useVueRouter,
    usePiniaPluginPersistedstate,
    useTypescript,
    useHTML5Mode,
    useHashMode,
  } = feats;

  if (!useVueRouter) return;

  const vueRouterPath = useTypescript
    ? path.join(templatePath, 'dep', 'vue-router', 'TS')
    : path.join(templatePath, 'dep', 'vue-router');

  files.extendDepsPkg(
    fs.readJSONSync(path.join(vueRouterPath, 'package.json'))
  );

  files.copy(path.join(vueRouterPath, 'static'), 'src');

  files.render(
    path.join(vueRouterPath, 'ejs', 'AboutView.vue.ejs'),
    path.join('src', 'views', 'AboutView.vue'),
    { usePiniaPluginPersistedstate }
  );

  files.render(
    path.join(
      vueRouterPath,
      'ejs',
      'router',
      useTypescript ? 'index.ts.ejs' : 'index.js.ejs'
    ),
    path.join('src', 'router', useTypescript ? 'index.ts' : 'index.js'),
    {
      useHTML5Mode,
      useHashMode,
    }
  );
};
