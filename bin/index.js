#!/usr/bin/env node
import printString from '#/figletPrint.js'
import rainbowGradient from '#/rainbow.js'
import { input } from '@inquirer/prompts'
import createBaseProject from '#/template/base.js'
import { checkbox } from '@inquirer/prompts'
import addEslint from '#/template/eslint.js'
import addPrettier from '#/template/prettier.js'
import addEslintConfig from '../template/eslint/eslintConfig/index.js'
import addPinia from '#/template/pinia.js'
import addAppVue from '../template/base/appVue/index.js'

// print BANANA in rainbow colors
console.log(rainbowGradient(await printString('BANANA')))

const projectName = await input({ message: 'Enter your project name:', required: true })

const feats = await checkbox({
  message: 'Please select the features to include:',
  choices: [
    { name: 'Eslint', value: 'eslint' },
    { name: 'Prettier', value: 'prettier' },
    { name: 'Pinia', value: 'pinia' },
  ],
})

const useEslint = feats.includes('eslint')
const usePrettier = feats.includes('prettier')
const usePinia = feats.includes('pinia')

// TODO: 把addAppVue和addEslintConfig整合进createBaseProject和addEslint函数中
await createBaseProject(projectName)
await addAppVue(projectName, usePinia)

await addPinia(projectName, usePinia)

await addEslint(projectName, useEslint)
await addEslintConfig(projectName, usePrettier, useEslint)

await addPrettier(projectName, useEslint, usePrettier)
