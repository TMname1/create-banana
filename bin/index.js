#!/usr/bin/env node
// import printString from '#utils/figletPrint.js';
// import rainbowGradient from '#utils/rainbow.js';
// import { input } from '@inquirer/prompts';
// import createBaseProject from '#utils/template/base/base.js';
// import { checkbox } from '@inquirer/prompts';
// import addEslint from '#utils/template/eslint/eslint.js';
// import addPrettier from '#utils/template/prettier.js';
// import addEslintConfig from '#utils/template/eslint/eslintConfig.js';
// import addPinia from '#utils/template/pinia/pinia.js';
// import addAppVue from '#utils/template/base/appVue.js';
// import path from 'path';
// import confirmPathExists from '#utils/pathExists.js';
// import addMain from '#utils/template/base/main.js';
// import { select } from '@inquirer/prompts';
// import addPiniaPluginPersistedstate from '#utils/template/pinia/piniaPluginPersistedstate.js';
// import chalk from 'chalk';
// import boxen from 'boxen';
// import addVueRouter from '#utils/template/vueRouter/vueRouter.js';
// import addAboutView from '#utils/template/vueRouter/aboutView.js';
import main from '#src/core/index.js';

await main();

// print BANANA in rainbow colors
// const log = console.log;
// log(rainbowGradient(await printString('BANANA')));

// const projectName = await input({
//   message: `Enter your ${chalk.yellow('project name')}:`,
//   required: true,
// });

// 确认路径存在
// await confirmPathExists(projectName, path.join(process.cwd(), projectName));

// const feats = await checkbox({
//   message: `Please select the ${chalk.yellow('features')} to include:`,
//   choices: [
//     { name: 'Eslint', value: 'eslint' },
//     { name: 'Prettier', value: 'prettier' },
//     { name: 'Pinia', value: 'pinia' },
//     { name: 'Vue-Router', value: 'vue-router' },
//   ],
// });

// const useEslint = feats.includes('eslint');
// const usePrettier = feats.includes('prettier');
// const usePinia = feats.includes('pinia');
// const useVueRouter = feats.includes('vue-router');

// let usePiniaPluginPersistedstate = false;
// if (usePinia) {
//   usePiniaPluginPersistedstate = await select({
//     message: `Do you want to use ${chalk.yellow.bold('pinia-plugin-persistedstate')} for Pinia state persistence?`,
//     choices: [
//       { name: 'Yes', value: true },
//       { name: 'No', value: false },
//     ],
//   });
// }

// await createBaseProject(projectName);
// await addAppVue(
//   projectName,
//   usePinia,
//   usePiniaPluginPersistedstate,
//   useVueRouter
// );
// await addMain(
//   projectName,
//   usePinia,
//   usePiniaPluginPersistedstate,
//   useVueRouter
// );

// await addPinia(projectName, usePinia, usePiniaPluginPersistedstate);
// await addPiniaPluginPersistedstate(projectName, usePiniaPluginPersistedstate);

// await addEslint(projectName, useEslint);
// await addEslintConfig(projectName, usePrettier, useEslint);

// TODO: 完成下面这些feats
// await addPrettier(projectName, usePrettier);

// await addVueRouter(projectName, useVueRouter);
// await addAboutView(projectName, usePiniaPluginPersistedstate, useVueRouter);

// 参考create-vue的颜色
// const greenColor = [22, 198, 12];

// 安装依赖以及格式化提示
// log(
//   rainbowGradient(
//     '\nProject initialization complete. You may now execute the following commands:\n'
//   )
// );

// const eslintStr = chalk.rgb(...greenColor)(
//   `\n  cd ${projectName} && pnpm i && pnpm lint && pnpm dev  \n`
// );
// const prettierStr = chalk.rgb(...greenColor)(
//   `\n  cd ${projectName} && pnpm i && pnpm format && pnpm dev  \n`
// );
// const noFormatStr = chalk.rgb(...greenColor)(
//   `\n  cd ${projectName} && pnpm i && pnpm dev  \n`
// );

// let outStr = '';
// useEslint
//   ? (outStr = eslintStr)
//   : usePrettier
//     ? (outStr = prettierStr)
//     : (outStr = noFormatStr);

// log(
//   chalk.cyan(
//     boxen(outStr, {
//       title: 'commands',
//       titleAlignment: 'center',
//     })
//   ),
//   '\n'
// );

// 初始化Git
// log(rainbowGradient('Initialize Git using the following command:\n'));
// // TODO: 以后有commitizen再改这里
// log(
//   chalk.cyan(
//     boxen(
//       chalk.rgb(...greenColor)(
//         '\n  git init && git add . && git commit -m "Initial commit"  \n'
//       ),
//       {
//         title: 'commands',
//         titleAlignment: 'center',
//       }
//     )
//   )
// );
