import { $ } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import waitOn from 'wait-on';

// clean testDist directory
const targetDir = path.join(process.cwd(), 'testDist');
console.log(`\n[Test] Cleaning ${targetDir}...`);
await fs.remove(targetDir);
await fs.ensureDir(targetDir);

const cliBin = path.join(targetDir, '../dist/index.js');

const runStep = async (stepName, commandFn) => {
  console.log(`\n[Test] Running step: ${stepName}...`);
  try {
    const result = await commandFn();
    if (result.exitCode !== 0) {
      throw new Error(`Exit code ${result.exitCode}`);
    }
    // TODO: use ora to show spinner
    console.log(`✅ ${stepName} passed.`);
  } catch (e) {
    console.error(`\n❌ ${stepName} failed:`);
    console.error(e.message);
    process.exit(1);
  }
};

// await runStep(
//   'Scaffold Project',
//   () =>
//     $({
//       cwd: targetDir,
//       reject: false,
//     })`node ${cliBin} install-all --p3a -v --t9s --p23e --h7e --t8t -e --p6r --h3y -l -c --p23s`
// );

await runStep(
  'Scaffold Project',
  () =>
    $({
      cwd: targetDir,
      shell: true,
      reject: false,
    })`node ${cliBin} install-all -v`
);

const $$ = $({
  cwd: path.join(targetDir, 'install-all'),
  shell: true,
  reject: false,
  stdout: 'inherit',
});

await runStep('Git Init', () => $$`git init`);
await runStep('pnpm install', () => $$`pnpm i`);
// await runStep('pnpm lint', () => $$`pnpm lint`);

console.log('\n[Test] Running step: pnpm dev...');
// Use $ directly to avoid shell: true, which prevents proper process killing on Windows
// const devProcess = $({
//   cwd: path.join(targetDir, 'install-all'),
//   reject: false,
// })`pnpm dev`;

const devProcess = $$`pnpm dev`;

await waitOn({ resources: ['http://localhost:5173'] });
// FIXME: it cant kill the process when await to server is ready
devProcess.kill();
// $$`kill ${devProcess.pid}`;
console.log('✅ pnpm dev passed.');

await runStep('pnpm build', () => $$`pnpm build`);

console.log('\n🎉 All tests passed successfully!');

// TODO: add Test Matrix to test different features combinations
