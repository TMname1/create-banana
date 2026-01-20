import { program } from 'commander';
import type { featsSelectType } from '#src/app/CLI/input.js';
import depManger from '#src/app/core/depManger.js';
import devDepManger from '#src/app/core/devDepManger.js';
import path from 'path';
import Generator from '#src/app/core/generator.js';
import fs from 'fs-extra';

program.description('Create a new project with features you select.');
program
  .option('--p3a, --usePinia', 'pinia state management', false)
  .option('-v, --useVueRouter', 'vue-router for routing', false)
  .option('--t9s, --useTailwindcss', 'tailwindcss for styling', false)
  .option(
    '--p23e, --usePiniaPluginPersistedstate',
    'pinia plugin persistedstate',
    false
  )
  .option('--h7e, --useHTML5Mode', 'HTML5 mode for routing', false)
  .option('--h6e, --useHashMode', 'hash mode for routing', false)
  .option('--t8t, --useTypescript', 'typescript support', false)
  .option('-e, --useEslint', 'eslint support', false)
  .option('--p6r, --usePrettier', 'prettier support', false)
  .option('--h3y, --useHusky', 'husky support', false)
  .option('-l, --useLintStaged', 'lint-staged support', false)
  .option('-c, --useCommitizen', 'commitizen support', false)
  .option(
    '--p23s, --usePrettierPluginTailwindcss',
    'prettier plugin tailwindcss support',
    false
  );
program.argument('<projectName>', 'Name of the project to create');

export default async () => {
  program.parse();

  const projectName = program.args[0] as string;
  const targetDir = path.join(process.cwd(), projectName);
  await fs.remove(targetDir);
  await fs.mkdir(targetDir);

  const files = new Generator(projectName, targetDir);
  const options: featsSelectType = program.opts();

  if (!options.usePinia) options.usePiniaPluginPersistedstate = false;
  if (!options.useEslint && !options.usePrettier) options.useHusky = false;
  if (!options.useHusky) options.useLintStaged = false;
  if (!(options.useTailwindcss && options.usePrettier))
    options.usePrettierPluginTailwindcss = false;
  // useVueRouter must choose one mode
  if (options.useVueRouter && !options.useHTML5Mode && !options.useHashMode) {
    options.useHTML5Mode = true;
  }

  depManger(files, options);
  devDepManger(files, options);

  await files.generate();
};
