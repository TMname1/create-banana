import { it } from 'vitest';
import readFiles from './readFiles.ts';
import { execa } from 'execa';
import path from 'path';
import { expect } from 'vitest';
import { scenarioType } from '../../script/test.ts';
import fs from 'fs-extra';

const CLI_BIN_PATH = path.join(process.cwd(), process.env.CLI_BIN as string);
const SNAPSHOT_TEST_ROOT_PATH = path.join(process.cwd(), process.env.SNAPSHOT_TEST_ROOT as string);

export default (TEST_ROOT: string, scenario: scenarioType) => {
  const { name, args } = scenario;

  it(`Snapshot for ${name}`, async () => {
    const projectPath = path.join(TEST_ROOT, name);

    await fs.emptyDir(path.join(SNAPSHOT_TEST_ROOT_PATH, name));

    await execa({
      shell: true,
      cwd: TEST_ROOT,
    })`node ${CLI_BIN_PATH} ${name} ${args}`;

    const fileTree = await readFiles(projectPath);

    expect(fileTree).toMatchSnapshot();
  });
};
