// test/generator.test.ts
import { describe, beforeAll, it, afterEach } from 'vitest';
import path from 'path';
import fs from 'fs-extra';
import testCase from './utils/testCase.ts';
import { scenarios } from '../script/test.ts';
import E2E_test from './utils/E2E_test.ts';

const SNAPSHOT_TEST_ROOT_PATH = path.join(process.cwd(), process.env.SNAPSHOT_TEST_ROOT as string);
const E2E_TEST_ROOT_PATH = path.join(process.cwd(), process.env.E2E_TEST_ROOT as string);

let E2EHasFailed = false;

describe.sequential('E2E tests', async () => {
  beforeAll(async () => {
    await fs.emptyDir(E2E_TEST_ROOT_PATH);
  });

  afterEach(({ task }) => {
    if (task.result?.state === 'fail') {
      E2EHasFailed = true;
    }
  });

  for (const scenario of scenarios) {
    it(`E2E test for ${scenario.name}`, async () => {
      if (fs.existsSync(path.join(SNAPSHOT_TEST_ROOT_PATH, scenario.name))) {
        return;
      }
      await E2E_test(scenario);
    }, 30000);
  }
});

describe.sequential('snapshot tests', async () => {
  beforeAll(async () => {
    if (E2EHasFailed) {
      throw new Error('E2E has failed, skipping snapshot tests.');
    }
    await fs.emptyDir(SNAPSHOT_TEST_ROOT_PATH);
  });

  for (const scenario of scenarios) {
    testCase(SNAPSHOT_TEST_ROOT_PATH, scenario);
  }
});
