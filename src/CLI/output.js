import printString from '#utils/figletPrint.js';
import rainbowGradient from '#utils/rainbow.js';
import chalk from 'chalk';
import boxen from 'boxen';

const log = console.log;
// 参考create-vue的颜色
const greenColor = [22, 198, 12];

const outPkgCommand = (projectName, { useEslint, usePrettier }) => {
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

const rainbowPrint = async (str) => {
  log(rainbowGradient(str));
};

export { outPkgCommand, outGitCommand, PrintBANANA, rainbowPrint };
