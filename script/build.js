import esbuild from 'esbuild';

esbuild
  .build({
    // this will start searching from root directory
    entryPoints: ['./src/bin/index.ts'],
    bundle: true,
    platform: 'node',
    outfile: './dist/index.js',
    format: 'esm',
    packages: 'external',
  })
  .catch(() => process.exit(1));
