import printString from '#src/utils/figletPrint.js';
import rainbowGradient from '#src/utils/rainbow.js';
import chalk from 'chalk';
import boxen from 'boxen';
import type { featsSelectType } from '#src/app/CLI/input.js';

// FIXME: Is there a better way to execute and log commands?

const log = console.log;
// refer to vue cli output style
const greenColor: [number, number, number] = [22, 198, 12];

let outPkgStr: string;
const outPkgCommand = (
  projectName: string,
  { useEslint, usePrettier, useHusky }: featsSelectType
) => {
  const eslintStr = chalk.rgb(...greenColor)(
    `cd ${projectName} && pnpm i && pnpm lint && pnpm dev  \n`
  );
  const prettierStr = chalk.rgb(...greenColor)(
    `cd ${projectName} && pnpm i && pnpm format && pnpm dev  \n`
  );
  const noFormatStr = chalk.rgb(...greenColor)(
    `cd ${projectName} && pnpm i && pnpm dev  \n`
  );

  outPkgStr = useEslint ? eslintStr : usePrettier ? prettierStr : noFormatStr;
  outPkgStr = useHusky
    ? chalk.rgb(...greenColor)('\n  git init && ') + outPkgStr
    : '\n  ' + outPkgStr;

  log(
    chalk.cyan(
      boxen(outPkgStr, {
        title: 'commands',
        titleAlignment: 'center',
      })
    ),
    '\n'
  );
};

let outGitStr: string;
const outGitCommand = ({ useHusky }: featsSelectType) => {
  // TODO: You need to change this when add commitizen support
  outGitStr = useHusky
    ? '\n  git add . && git commit -m "Initial commit"  \n'
    : '\n  git init && git add . && git commit -m "Initial commit"  \n';

  log(
    chalk.cyan(
      boxen(chalk.rgb(...greenColor)(outGitStr), {
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
};
