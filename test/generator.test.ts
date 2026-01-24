// test/generator.test.ts
import { describe, beforeAll } from 'vitest';
import path from 'path';
import fs from 'fs-extra';
import testCase from './utils/testCase.ts';
import { scenarios } from '../script/test.ts';

const SNAPSHOT_TEST_ROOT_PATH = path.join(
  process.cwd(),
  process.env.SNAPSHOT_TEST_ROOT as string
);

describe('CLI Generator Snapshots', () => {
  beforeAll(async () => {
    await fs.emptyDir(SNAPSHOT_TEST_ROOT_PATH);
  });

  for (const scenario of scenarios) {
    testCase(SNAPSHOT_TEST_ROOT_PATH, scenario);
  }
});
