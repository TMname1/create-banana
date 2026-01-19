#!/usr/bin/env node
import main from '#src/app/CLI/main.js';
import commander from '#src/app/CLI/commander.js';

if (process.argv.length > 2) {
  await commander();
} else {
  await main();
}
