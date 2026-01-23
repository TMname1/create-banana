import { execa } from 'execa';
import fs from 'fs-extra';
import killPort from 'kill-port';
import path from 'path';
import waitOn from 'wait-on';
import ora from 'ora';

// clean testDist directory
const targetDir = path.join(process.cwd(), 'testDist');
const spinner = ora(`\n[Test] Cleaning ${targetDir}...`).start();
await fs.emptyDir(targetDir);
spinner.succeed(`[Test] Cleaned ${targetDir}.`);

const cliBin = path.join(targetDir, '../dist/index.js');
const port = 5173;
const testFolderName = 'test-1';

const runStep = async (stepName, commandFn, ifKill = false) => {
  const runStepSpinner = ora(`\n[Test] Running step: ${stepName}...`).start();
  try {
    let result;
    if (ifKill) {
      const subprocess = commandFn();
      await waitOn({ resources: [`http://localhost:${port}`], timeout: 30000 });
      await killPort(port);
      result = await subprocess;
    } else {
      result = await commandFn();
    }
    if (result.exitCode !== 0 && !ifKill) {
      throw new Error(`Exit code ${result.exitCode}`);
    }
    runStepSpinner.succeed(`[Test] ${stepName} passed.`);
  } catch (e) {
    throw new Error(`[Test] ${stepName} failed. ${e.message}`);
  }
};

const $execa = execa({
  shell: true,
  reject: false,
});

await runStep(
  'Scaffold Project',
  () =>
    $execa({
      cwd: targetDir,
    })`node ${cliBin} ${testFolderName}`
);

const $$execa = $execa({
  cwd: path.join(targetDir, testFolderName),
});

await runStep('Git Init', () => $$execa`git init`);
await runStep('pnpm install', () => $$execa`pnpm i`);
// await runStep('pnpm lint', () => $$execa`pnpm lint`);

await runStep('pnpm dev', () => $$execa`pnpm dev`, true);
await runStep('pnpm build', () => $$execa`pnpm build`);

console.log('\n🎉 All tests passed successfully!');

// TODO: add Test Matrix to test different features combinations
