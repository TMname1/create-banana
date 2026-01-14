import printString from '#src/utils/figletPrint.js';
import rainbowGradient from '#src/utils/rainbow.js';
import chalk from 'chalk';
import boxen from 'boxen';
import type { featsSelectType } from '#src/app/CLI/input.js';

const log = console.log;
// refer to vue cli output style
const greenColor: [number, number, number] = [22, 198, 12];

let outPkgStr: string;
const outPkgCommand = (
  projectName: string,
  { useEslint, usePrettier, useHusky }: featsSelectType
) => {
  const eslintStr = `pnpm i && pnpm lint`;
  const prettierStr = `pnpm i && pnpm format`;
  const noFormatStr = `pnpm i`;
  outPkgStr = useEslint ? eslintStr : usePrettier ? prettierStr : noFormatStr;
  // husky needs git init first
  outPkgStr = useHusky
    ? `cd ${projectName} && git init && ` + outPkgStr
    : `cd ${projectName} && ` + outPkgStr;

  log(
    chalk.cyan(
      boxen(chalk.rgb(...greenColor)(`\n  ${outPkgStr}  \n`), {
        title: 'commands',
        titleAlignment: 'center',
      })
    ),
    '\n'
  );
};

let outGitStr: string;
const outGitCommand = (projectName: string, { useHusky }: featsSelectType) => {
  // TODO: You need to change this when add commitizen support
  outGitStr = useHusky
    ? `cd ${projectName} && git add . && git commit -m "Initial commit"`
    : `cd ${projectName} && git init && git add . && git commit -m "Initial commit"`;

  log(
    chalk.cyan(
      boxen(chalk.rgb(...greenColor)(`\n  ${outGitStr}  \n`), {
        title: 'commands',
        titleAlignment: 'center',
      })
    )
  );
};

const PrintBANANA = async () => {
  log(rainbowGradient((await printString('BANANA')) as string));
};

const rainbowPrint = async (str: string) => {
  log(rainbowGradient(str));
};

export {
  outPkgCommand,
  outGitCommand,
  PrintBANANA,
  rainbowPrint,
  outPkgStr,
  outGitStr,
  greenColor,
};
