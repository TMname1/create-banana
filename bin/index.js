#!/usr/bin/env node
import printString from '../utils/figletPrint.js'
import rainbowGradient from '../utils/rainbow.js'
import { input } from '@inquirer/prompts'
import createBaseProject from '../utils/template/base.js'

// print BANANA in rainbow colors
console.log(rainbowGradient(await printString('BANANA')))

const projectName = await input({ message: 'Enter your project name:', required: true })

createBaseProject(projectName)
