// test/generator.test.ts
import { describe } from 'vitest';
import path from 'path';

import snapShotTest from './utils/snapShotTest.ts';
import { scenarios } from '../script/test.ts';
import E2E_test from './utils/E2E_test.ts';

const SNAPSHOT_TEST_ROOT_PATH = path.join(process.cwd(), process.env.SNAPSHOT_TEST_ROOT as string);

describe.sequential('E2E tests and snapshots', async () => {
  for (const scenario of scenarios) {
    await E2E_test(scenario);

    snapShotTest(SNAPSHOT_TEST_ROOT_PATH, scenario);
  }
});
