import printString from '#src/utils/figletPrint.js';
import rainbowGradient from '#src/utils/rainbow.js';
import chalk from 'chalk';
import boxen from 'boxen';

const log = console.log;
// refer to vue cli output style
const greenColor: [number, number, number] = [22, 198, 12];

const outPkgCommand = (
  projectName: string,
  { useEslint, usePrettier }: { useEslint: boolean; usePrettier: boolean }
) => {
  const eslintStr = chalk.rgb(...greenColor)(
    `\n  cd ${projectName} && pnpm i && pnpm lint && pnpm dev  \n`
  );
  const prettierStr = chalk.rgb(...greenColor)(
    `\n  cd ${projectName} && pnpm i && pnpm format && pnpm dev  \n`
  );
  const noFormatStr = chalk.rgb(...greenColor)(
    `\n  cd ${projectName} && pnpm i && pnpm dev  \n`
  );

  const outStr = useEslint
    ? eslintStr
    : usePrettier
      ? prettierStr
      : noFormatStr;

  log(
    chalk.cyan(
      boxen(outStr, {
        title: 'commands',
        titleAlignment: 'center',
      })
    ),
    '\n'
  );
};

const outGitCommand = () => {
  // TODO: 以后有commitizen再改这里
  log(
    chalk.cyan(
      boxen(
        chalk.rgb(...greenColor)(
          '\n  git init && git add . && git commit -m "Initial commit"  \n'
        ),
        {
          title: 'commands',
          titleAlignment: 'center',
        }
      )
    )
  );
};

const PrintBANANA = async () => {
  log(rainbowGradient(await printString('BANANA')));
};

const rainbowPrint = async (str: string) => {
  log(rainbowGradient(str));
};

export { outPkgCommand, outGitCommand, PrintBANANA, rainbowPrint };
