// const CLI_OPTIONS = [
//   { flags: '--p3a, --usePinia', description: 'pinia state management' },
//   { flags: '-v, --useVueRouter', description: 'vue-router for routing' },
//   { flags: '--t9s, --useTailwindcss', description: 'tailwindcss for styling' },
//   {
//     flags: '--p23e, --usePiniaPluginPersistedstate',
//     description: 'pinia plugin persistedstate',
//   },
//   { flags: '--h7e, --useHTML5Mode', description: 'HTML5 mode for routing' },
//   { flags: '--h6e, --useHashMode', description: 'hash mode for routing' },
//   { flags: '--t8t, --useTypescript', description: 'typescript support' },
//   { flags: '-e, --useEslint', description: 'eslint support' },
//   { flags: '--p6r, --usePrettier', description: 'prettier support' },
//   { flags: '--h3y, --useHusky', description: 'husky support' },
//   { flags: '-l, --useLintStaged', description: 'lint-staged support' },
//   { flags: '-c, --useCommitizen', description: 'commitizen support' },
//   {
//     flags: '--p23s, --usePrettierPluginTailwindcss',
//     description: 'prettier plugin tailwindcss support',
//   },
// ] as const;

// Define test Matrix
const scenarios = [
  { name: 'min-app', args: '' },
  { name: 'vue-router-app', args: '-v' },
  {
    name: 'router-hash-tailwind-prettier-app',
    args: '-v --h6e --t9s --p6r --p23s --t8t',
  },
  {
    name: 'full-app',
    args: '-v --p3a --t9s --p23e --h7e --h6e --t8t -e --p6r --h3y -l -c --p23s',
  },
];

type scenarioType = {
  name: string;
  args: string;
};

export { scenarios };
export type { scenarioType };
