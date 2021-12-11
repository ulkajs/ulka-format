#!/usr/bin/env node

const run = require("../dist/cli");

run(process.cwd(), process.argv.slice(2)).catch(console.log);
