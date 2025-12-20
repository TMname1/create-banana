#!/usr/bin/env node
import printString from '../utils/figletPrint.js'
import rainbowGradient from '../utils/rainbow.js'
import { input } from '@inquirer/prompts'
import createBaseProject from '../utils/template/base.js'
import { checkbox } from '@inquirer/prompts'
import addEslint from '../utils/template/eslint.js'
import addPrettier from '../utils/template/prettier.js'
import addEslintConfig from '../template/eslint/eslintConfig/index.js'

// print BANANA in rainbow colors
console.log(rainbowGradient(await printString('BANANA')))

const projectName = await input({ message: 'Enter your project name:', required: true })

const feats = await checkbox({
  message: 'Select a package manager',
  choices: [
    { name: 'Eslint', value: 'eslint' },
    { name: 'Prettier', value: 'prettier' },
  ],
})

const useEslint = feats.includes('eslint')
const usePrettier = feats.includes('prettier')

await createBaseProject(projectName)
await addEslint(projectName, useEslint)
await addPrettier(projectName, useEslint, usePrettier)
await addEslintConfig(projectName, usePrettier, useEslint)
