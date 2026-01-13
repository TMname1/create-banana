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

fs.copySync(
  fileURLToPath(new URL('../template', import.meta.url)),
  fileURLToPath(new URL('../dist/template', import.meta.url))
);
