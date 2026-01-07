import path from 'path';
import confirmPathExists from '#utils/pathExists.js';
import base from '#src/features/base.js';
import Generator from './generator.js';
import { inputProjectName, featsSelect } from './input.js';
import {
  outPkgCommand,
  outGitCommand,
  PrintBANANA,
  rainbowPrint,
} from './output.js';
import pinia from '#src/features/pinia.js';
import eslint from '#src/features/eslint.js';
import prettier from '#src/features/prettier.js';

export default async () => {
  await PrintBANANA();

  const projectName = await inputProjectName();
  const targetDir = path.join(process.cwd(), projectName);
  // 确认路径存在
  await confirmPathExists(projectName, targetDir);

  const {
    useEslint,
    usePrettier,
    usePinia,
    useVueRouter,
    usePiniaPluginPersistedstate,
  } = await featsSelect();

  const files = new Generator(targetDir);
  base(files, { usePinia, usePiniaPluginPersistedstate, useVueRouter });
  pinia(files, { usePinia, usePiniaPluginPersistedstate });
  eslint(files, { useEslint, usePrettier });
  prettier(files, usePrettier);
  files.generate();

  rainbowPrint(
    '\nProject initialization complete. You may now execute the following commands:\n'
  );
  outPkgCommand(useEslint, usePrettier, projectName);

  rainbowPrint('Initialize Git using the following command:\n');
  outGitCommand();
};
