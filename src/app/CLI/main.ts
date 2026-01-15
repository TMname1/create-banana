import path from 'path';
import confirmPathExists from '#src/utils/pathExists.js';
import Generator from '#src/app/core/generator.js';
import { inputProjectName } from './input.js';
import {
  outPkgCommand,
  outGitCommand,
  PrintBANANA,
  rainbowPrint,
  outCommitizenCommand,
  greenColor,
} from './output.js';
import featsManager from '#src/app/core/featsManger.js';
import execute from '../core/execute.js';
import ora from 'ora';
import chalk from 'chalk';

export default async () => {
  await PrintBANANA();

  const projectName = await inputProjectName();
  const targetDir = path.join(process.cwd(), projectName);
  // ensure the target directory does not already exist
  // if it exists, prompt the user to confirm overwriting
  await confirmPathExists(projectName, targetDir);

  // create a new Generator to handle feature choices and file generation
  const files = new Generator(projectName, targetDir);
  // TODO: add TS feat support
  const featsList = await featsManager(files);

  const spinner = ora('Generating files...').start();
  await files.generate();
  spinner.succeed('Files generated successfully.');

  rainbowPrint(
    '\nProject initialization complete. You may execute the following commands:\n'
  );
  outPkgCommand(projectName, featsList);

  outCommitizenCommand(projectName, featsList);

  rainbowPrint('\nAnd initialize Git using the following commands:\n');
  outGitCommand(projectName, featsList);

  await execute(featsList);
  console.log(
    chalk.rgb(...greenColor).bold('\nAll commands executed successfully!\n')
  );
};
