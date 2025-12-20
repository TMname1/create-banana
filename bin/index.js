#!/usr/bin/env node
import printString from '../utils/figletPrint.js'
import rainbowGradient from '../utils/rainbow.js'
import { input } from '@inquirer/prompts'
import createBaseProject from '../utils/template/base.js'
import { checkbox } from '@inquirer/prompts'
import addEslint from '../utils/template/Eslint.js'

// print BANANA in rainbow colors
console.log(rainbowGradient(await printString('BANANA')))

const projectName = await input({ message: 'Enter your project name:', required: true })

const feats = await checkbox({
  message: 'Select a package manager',
  choices: [{ name: 'Eslint', value: 'eslint' }],
})

if (feats.includes('eslint')) {
  await createBaseProject(projectName)
  await addEslint(projectName)
} else {
  await createBaseProject(projectName)
}
