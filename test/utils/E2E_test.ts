import { execa } from 'execa';
import type { ResultPromise } from 'execa';
import killPort from 'kill-port';
import path from 'path';
import waitOn from 'wait-on';
import { it } from 'vitest';
import fs from 'fs-extra';

const E2E_TEST_ROOT_PATH = path.join(process.cwd(), process.env.E2E_TEST_ROOT as string);
const CLI_BIN_PATH = path.join(process.cwd(), process.env.CLI_BIN as string);
const PORT = process.env.PORT as string;
const URL = `tcp:${PORT}`;
const SNAPSHOT_TEST_ROOT_PATH = path.join(process.cwd(), process.env.SNAPSHOT_TEST_ROOT as string);

type runStepCommandFn = () => ResultPromise<{
  shell: boolean;
  reject: boolean;
  cwd: string;
}>;

const runStep = async (commandFn: runStepCommandFn, ifKill = false) => {
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

  it(`E2E test for ${name}`, async () => {
    if (await fs.pathExists(path.join(SNAPSHOT_TEST_ROOT_PATH, scenario.name))) {
      return;
    }

    await fs.emptyDir(E2E_TEST_ROOT_PATH);

    const $execa = execa({
      shell: true,
      reject: false,
    });

    await runStep(
      () =>
        $execa({
          cwd: E2E_TEST_ROOT_PATH,
        })`node ${CLI_BIN_PATH} ${name} ${args}`
    );

    const $$execa = $execa({
      cwd: path.join(E2E_TEST_ROOT_PATH, name),
    });

    await runStep(() => $$execa`git init`);
    await runStep(() => $$execa`pnpm install`);
    if (args.includes('-e') || args.includes('--p6r')) {
      if (args.includes('-e')) {
        await runStep(() => $$execa`pnpm lint`);
      } else {
        await runStep(() => $$execa`pnpm format`);
      }
    }
    await runStep(() => $$execa`pnpm dev`, true);
    await runStep(() => $$execa`pnpm build`);
  }, 40000);
};
