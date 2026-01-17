# Instructions

To create a new project, run:

```bash
pnpm create banana
```

Follow the interactive prompts to key in your project name and select features

# Currently implemented functions

## dependencies

- [pinia](https://pinia.vuejs.org/)
  - [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)
- [vue-router](https://router.vuejs.org/)

## devDependencies

- [typescript](https://www.typescriptlang.org/)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
  - [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- [husky](https://typicode.github.io/husky/)
  - [lint-staged](https://github.com/lint-staged/lint-staged)
- [commitizen](https://github.com/commitizen/cz-cli)
- [tailwindcss](https://tailwindcss.com/)

# Project structure

```text
create-tm
├─ script
│  └─ build.js
├─ src
│  ├─ app
│  │  ├─ CLI
│  │  │  ├─ depSelect.ts
│  │  │  ├─ devDepSelect.ts
│  │  │  ├─ input.ts
│  │  │  ├─ main.ts
│  │  │  └─ output.ts
│  │  ├─ core
│  │  │  ├─ depManger.ts
│  │  │  ├─ devDepManger.ts
│  │  │  ├─ execute.ts
│  │  │  ├─ featsManger.ts
│  │  │  └─ generator.ts
│  │  └─ features
│  │     ├─ dep
│  │     │  ├─ base.ts
│  │     │  ├─ pinia.ts
│  │     │  └─ vueRouter.ts
│  │     └─ devDep
│  │        ├─ commitizen.ts
│  │        ├─ eslint.ts
│  │        ├─ husky.ts
│  │        ├─ lintStaged.ts
│  │        └─ prettier.ts
│  ├─ bin
│  │  └─ index.ts
│  └─ utils
│     ├─ figletPrint.ts
│     ├─ pathExists.ts
│     ├─ prompt.ts
│     ├─ rainbow.ts
│     └─ URL.ts
├─ template
│  ├─ base
│  ├─ commitizen
│  ├─ eslint
│  ├─ husky
│  ├─ lintStaged
│  ├─ pinia
│  ├─ prettier
│  └─ vue-router
├─ eslint.config.js
├─ LICENSE
├─ package.json
├─ pnpm-lock.yaml
├─ readme.md
└─ tsconfig.json
```
