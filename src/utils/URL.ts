import { fileURLToPath } from 'url';

// get template path which in dist folder
export const templatePath = fileURLToPath(
  new URL('./template', import.meta.url)
);
