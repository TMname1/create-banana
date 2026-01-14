import esbuild from 'esbuild';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

esbuild
  .build({
    // this will start searching from root directory
    entryPoints: ['./src/bin/index.ts'],
    bundle: true,
    platform: 'node',
    outfile: './dist/index.js',
    format: 'esm',
    packages: 'external',
    minify: true,
  })
  .catch(() => process.exit(1));

const sourse = fileURLToPath(new URL('../template', import.meta.url));
const target = fileURLToPath(new URL('../dist/template', import.meta.url));

fs.removeSync(target);
fs.copySync(sourse, target, {
  overwrite: true,
});
