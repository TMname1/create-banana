import { program } from 'commander';
import type { featsSelectType } from '#src/app/CLI/input.js';
import depManger from '#src/app/core/depManger.js';
import devDepManger from '#src/app/core/devDepManger.js';
import path from 'path';
import Generator from '#src/app/core/generator.js';
import fs from 'fs-extra';

const CLI_OPTIONS = [
  { flags: '--p3a, --usePinia', description: 'pinia state management' },
  { flags: '-v, --useVueRouter', description: 'vue-router for routing' },
  { flags: '--t9s, --useTailwindcss', description: 'tailwindcss for styling' },
  {
    flags: '--p23e, --usePiniaPluginPersistedstate',
    description: 'pinia plugin persistedstate',
  },
  { flags: '--h7e, --useHTML5Mode', description: 'HTML5 mode for routing' },
  { flags: '--h6e, --useHashMode', description: 'hash mode for routing' },
  { flags: '--t8t, --useTypescript', description: 'typescript support' },
  { flags: '-e, --useEslint', description: 'eslint support' },
  { flags: '--p6r, --usePrettier', description: 'prettier support' },
  { flags: '--h3y, --useHusky', description: 'husky support' },
  { flags: '-l, --useLintStaged', description: 'lint-staged support' },
  { flags: '-c, --useCommitizen', description: 'commitizen support' },
  {
    flags: '--p23s, --usePrettierPluginTailwindcss',
    description: 'prettier plugin tailwindcss support',
  },
] as const;

program.description('Create a new project with features you select.');

CLI_OPTIONS.forEach(({ flags, description }) => {
  program.option(flags, description, false);
});

program.argument('<projectName>', 'Name of the project to create');

const resolveOptions = (options: featsSelectType) => {
  if (!options.usePinia) options.usePiniaPluginPersistedstate = false;
  if (!options.useEslint && !options.usePrettier) options.useHusky = false;
  if (!options.useHusky) options.useLintStaged = false;
  if (!(options.useTailwindcss && options.usePrettier))
    options.usePrettierPluginTailwindcss = false;
  // useVueRouter must choose one mode
  if (options.useVueRouter && !options.useHTML5Mode && !options.useHashMode) {
    options.useHTML5Mode = true;
  }
  // useVueRouter only one mode
  if (options.useHTML5Mode && options.useHashMode) {
    options.useHashMode = false;
  }
};

export default async () => {
  program.parse();

  const projectName = program.args[0] as string;
  // Use fs.emptyDir to safely handle directory creation/clearing
  const targetDir = path.join(process.cwd(), projectName);
  await fs.emptyDir(targetDir);

  const files = new Generator(projectName, targetDir);
  const options: featsSelectType = program.opts();

  resolveOptions(options);

  depManger(files, options);
  devDepManger(files, options);

  await files.generate();
};
