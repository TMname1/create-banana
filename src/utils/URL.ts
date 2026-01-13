import { fileURLToPath } from 'url';

// get template path
export const templatePath = fileURLToPath(
  // new URL('../template', import.meta.url)
  new URL('../dist/template', import.meta.url)
);
