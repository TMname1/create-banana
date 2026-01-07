import fs from 'fs-extra';
import { templatePath } from '#utils/URL.js';
import path from 'path';

export default (files, { useVueRouter, usePiniaPluginPersistedstate }) => {
  if (!useVueRouter) return;
  const vueRouterPath = path.join(templatePath, 'vue-router');

  files.extendDepsPkg(
    fs.readJSONSync(path.join(vueRouterPath, 'package.json'))
  );

  files.copy(path.join(vueRouterPath, 'static'), 'src');

  files.render(
    path.join(vueRouterPath, 'ejs', 'AboutView.vue.ejs'),
    path.join('src', 'views', 'AboutView.vue'),
    { usePiniaPluginPersistedstate }
  );
};
