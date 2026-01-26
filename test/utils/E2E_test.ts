import { execa } from 'execa';
import type { ResultPromise } from 'execa';
import killPort from 'kill-port';
import path from 'path';
import waitOn from 'wait-on';

const E2E_TEST_ROOT_PATH = path.join(process.cwd(), process.env.E2E_TEST_ROOT as string);
const CLI_BIN_PATH = path.join(process.cwd(), process.env.CLI_BIN as string);
const PORT = process.env.PORT as string;
const URL = `tcp:${PORT}`;

type runStepCommandFn = () => ResultPromise<{
  shell: boolean;
  reject: boolean;
  cwd: string;
}>;

const runStep = async (stepName: string, commandFn: runStepCommandFn, ifKill = false) => {
  try {
    let result;
    if (ifKill) {
      const subprocess = commandFn();
      await waitOn({
        resources: [URL],
        timeout: 30000,
      });
      await killPort(Number(PORT));
      // To ensure the subprocess exit after killing the port
      result = await subprocess;
    } else {
      result = await commandFn();
    }
    if (result.exitCode !== 0 && !ifKill) {
      throw result;
    }
  } catch (e) {
    throw e;
  }
};

export default async (scenario: { name: string; args: string }) => {
  const { name, args } = scenario;

  const $execa = execa({
    shell: true,
    reject: false,
  });

  await runStep(
    `Create ${name}`,
    () =>
      $execa({
        cwd: E2E_TEST_ROOT_PATH,
      })`node ${CLI_BIN_PATH} ${name} ${args}`
  );

  const $$execa = $execa({
    cwd: path.join(E2E_TEST_ROOT_PATH, name),
  });

  await runStep('Git Init', () => $$execa`git init`);
  await runStep('pnpm install', () => $$execa`pnpm i`);
  if (args.includes('-e') || args.includes('--p6r')) {
    if (args.includes('-e')) {
      await runStep('pnpm lint', () => $$execa`pnpm lint`);
    } else {
      await runStep('pnpm format', () => $$execa`pnpm format`);
    }
  }
  await runStep('pnpm dev', () => $$execa`pnpm dev`, true);
  await runStep('pnpm build', () => $$execa`pnpm build`);
};
