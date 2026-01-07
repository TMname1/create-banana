# Currently implemented functions

- eslint
- prettier
- pinia
  - pinia-plugin-persistedstate
- vue-router

# Project structure

```text
create-tm
├─ bin
│  └─ index.js
├─ src
│  ├─ CLI
│  │  ├─ input.js
│  │  ├─ main.js
│  │  └─ output.js
│  ├─ core
│  │  ├─ featsManger.js
│  │  └─ generator.js
│  └─ features
│     ├─ base.js
│     ├─ eslint.js
│     ├─ pinia.js
│     ├─ prettier.js
│     └─ vueRouter.js
├─ template
│  ├─ base
│  ├─ eslint
│  ├─ pinia
│  ├─ prettier
│  └─ vue-router
├─ utils
│  ├─ figletPrint.js
│  ├─ pathExists.js
│  ├─ rainbow.js
│  └─ URL.js
├─ eslint.config.js
├─ LICENSE
├─ package.json
├─ pnpm-lock.yaml
└─ readme.md
```
