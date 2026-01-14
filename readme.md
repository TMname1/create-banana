# Currently implemented functions

- eslint
- prettier
- pinia
  - pinia-plugin-persistedstate
- vue-router
- husky
  - lint-staged
- commitizen

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
