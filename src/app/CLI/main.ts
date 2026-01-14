import path from 'path';
import confirmPathExists from '#src/utils/pathExists.js';
import Generator from '#src/app/core/generator.js';
import { inputProjectName } from './input.js';
import {
  outPkgCommand,
  outGitCommand,
  PrintBANANA,
  rainbowPrint,
} from './output.js';
import featsManager from '#src/app/core/featsManger.js';
import execute from '../core/execute.js';

export default async () => {
  await PrintBANANA();

  const projectName = await inputProjectName();
  const targetDir = path.join(process.cwd(), projectName);
  // ensure the target directory does not already exist
  // if it exists, prompt the user to confirm overwriting
  await confirmPathExists(projectName, targetDir);

  // create a new Generator to handle feature choices and file generation
  const files = new Generator(targetDir);
  // TODO: add TS feat support
  const featsList = await featsManager(files);
  await files.generate();

  // FIXME: add some test function here to verify the generated files

  rainbowPrint(
    '\nProject initialization complete. You may execute the following commands:\n'
  );
  outPkgCommand(projectName, featsList);

  rainbowPrint('And initialize Git using the following commands:\n');
  outGitCommand(projectName, featsList);

  await execute();
};
