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
    ? `cd ${projectName} && git init && npx husky-init && ` + outPkgStr
    : `cd ${projectName} && ` + outPkgStr;

  log(
    chalk.cyan(
      boxen(chalk.rgb(...greenColor)(`\n  ${outPkgStr}  \n`), {
        title: 'commands',
        titleAlignment: 'center',
      })
    )
  );
};

let outGitStr: string;
const outGitCommand = (
  projectName: string,
  { useHusky, useCommitizen }: featsSelectType
) => {
  outGitStr = useHusky
    ? `cd ${projectName} && git add .`
    : `cd ${projectName} && git init && git add .`;

  const commitStr = useCommitizen
    ? 'pnpm commit'
    : 'git commit -m "Initial commit"';

  outGitStr += ` && ${commitStr}`;

  log(
    chalk.cyan(
      boxen(chalk.rgb(...greenColor)(`\n  ${outGitStr}  \n`), {
        title: 'commands',
        titleAlignment: 'center',
      })
    )
  );
};

let outCommitizenStr: string;
const outCommitizenCommand = (
  projectName: string,
  { useCommitizen }: featsSelectType
) => {
  if (!useCommitizen) return;

  outCommitizenStr = `cd ${projectName} && pnpm i -g commitizen && commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact`;
  log(
    chalk.cyan(
      boxen(chalk.rgb(...greenColor)(`\n  ${outCommitizenStr}  \n`), {
        title: 'commands',
        titleAlignment: 'center',
      })
    ),
    '\n'
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
  outCommitizenCommand,
  outPkgStr,
  outGitStr,
  outCommitizenStr,
  greenColor,
  PrintBANANA,
  rainbowPrint,
};
