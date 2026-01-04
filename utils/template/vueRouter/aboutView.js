import ejs from 'ejs';
import { templatePath } from '#utils/URL.js';
import fs from 'fs-extra';
import path from 'path';

const addAboutView = async (
  projectName,
  usePiniaPluginPersistedstate,
  useVueRouter
) => {
  if (!useVueRouter) return;
  await fs.writeFile(
    path.join(process.cwd(), projectName, 'src', 'views', 'AboutView.vue'),
    ejs.render(
      await fs.readFile(
        path.join(templatePath, 'vue-router', 'views', 'AboutView.vue.ejs'),
        'utf-8'
      ),
      {
        usePiniaPluginPersistedstate,
      }
    )
  );
  await fs.remove(
    path.join(process.cwd(), projectName, 'src', 'AboutView.vue.ejs')
  );
};

export default addAboutView;
