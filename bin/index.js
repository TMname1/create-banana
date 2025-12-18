#!/usr/bin/env node
import chalk from 'chalk'
import printString from '../utils/figletPrint.js'
import rainbowGradient from '../utils/rainbow.js'

// print BANANA in rainbow colors
console.log(chalk.blue(rainbowGradient(await printString('BANANA'))))
