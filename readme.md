# Instructions

<img src="https://github.com/user-attachments/assets/34804eef-bd69-4dda-9177-ebd8c81c0afd" width="400">

To create a new project, run:

```bash
pnpm create banana
```

## CLI usage 

```bash
Usage: index [options] <projectName>

Create a new project with features you select.

Arguments:
  projectName                             Name of the project to create

Options:
  --p3a, --usePinia                       pinia state management (default: false)
  -v, --useVueRouter                      vue-router for routing (default: false)
  --t9s, --useTailwindcss                 tailwindcss for styling (default: false)
  --p23e, --usePiniaPluginPersistedstate  pinia plugin persistedstate (default: false)
  --h7e, --useHTML5Mode                   HTML5 mode for routing (default: false)
  --h6e, --useHashMode                    hash mode for routing (default: false)
  --t8t, --useTypescript                  typescript support (default: false)
  -e, --useEslint                         eslint support (default: false)
  --p6r, --usePrettier                    prettier support (default: false)
  --h3y, --useHusky                       husky support (default: false)
  -l, --useLintStaged                     lint-staged support (default: false)
  -c, --useCommitizen                     commitizen support (default: false)
  --p23s, --usePrettierPluginTailwindcss  prettier plugin tailwindcss support (default: false)
  -h, --help                              display help for command
```

## Test

To execute test, run:

```bash
pnpm test
```

The test will run E2E_test, which involves initializing the git repository and testing that the package.json directives work. Match Snapshots are run after each E2E_test passed.

# Currently implemented functions

## dependencies

- [pinia](https://pinia.vuejs.org/)
  - [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)
- [vue-router](https://router.vuejs.org/)
- [tailwindcss](https://tailwindcss.com/)

## devDependencies

- [typescript](https://www.typescriptlang.org/)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
  - [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- [husky](https://typicode.github.io/husky/)
  - [lint-staged](https://github.com/lint-staged/lint-staged)
- [commitizen](https://github.com/commitizen/cz-cli)
