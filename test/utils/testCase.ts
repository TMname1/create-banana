import { it } from 'vitest';
import readFiles from './readFiles.ts';
import { execa } from 'execa';
import path from 'path';
import { expect } from 'vitest';
import { scenarioType } from '../../script/test.ts';

const CLI_BIN_PATH = path.join(process.cwd(), process.env.CLI_BIN as string);

export default (TEST_ROOT: string, scenario: scenarioType) => {
  const { name, args } = scenario;

  it(`generates a ${name}`, async () => {
    const projectPath = path.join(TEST_ROOT, name);

    await execa({
      shell: true,
      cwd: TEST_ROOT,
    })`node ${CLI_BIN_PATH} ${name} ${args}`;

    const fileTree = await readFiles(projectPath);

    expect(fileTree).toMatchSnapshot();
  });
};
