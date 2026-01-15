# Instructions

To create a new project, run:

```bash
pnpm create banana
```

Follow the interactive prompts to key in your project name and select features

# Currently implemented functions

- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [pinia](https://pinia.vuejs.org/)
  - [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)
- [vue-router](https://router.vuejs.org/)
- [husky](https://typicode.github.io/husky/)
  - [lint-staged](https://github.com/lint-staged/lint-staged)
- [commitizen](https://github.com/commitizen/cz-cli)

# Project structure

```text
create-tm
├─ script
│  └─ build.js
├─ src
│  ├─ app
│  │  ├─ CLI
│  │  │  ├─ input.ts
│  │  │  ├─ main.ts
│  │  │  └─ output.ts
│  │  ├─ core
│  │  │  ├─ execute.ts
│  │  │  ├─ featsManger.ts
│  │  │  └─ generator.ts
│  │  └─ features
│  │     ├─ base.ts
│  │     ├─ commitizen.ts
│  │     ├─ eslint.ts
│  │     ├─ husky.ts
│  │     ├─ lintStaged.ts
│  │     ├─ pinia.ts
│  │     ├─ prettier.ts
│  │     └─ vueRouter.ts
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
