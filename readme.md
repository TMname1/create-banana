# Currently implemented functions

- eslint
- prettier
- pinia
  - pinia-plugin-persistedstate
- vue-router

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
│  │  │  ├─ featsManger.ts
│  │  │  └─ generator.ts
│  │  └─ features
│  │     ├─ base.ts
│  │     ├─ eslint.ts
│  │     ├─ pinia.ts
│  │     ├─ prettier.ts
│  │     └─ vueRouter.ts
│  ├─ bin
│  │  └─ index.ts
│  └─ utils
│     ├─ figletPrint.ts
│     ├─ pathExists.ts
│     ├─ rainbow.ts
│     └─ URL.ts
├─ template
│  ├─ base
│  ├─ eslint
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
