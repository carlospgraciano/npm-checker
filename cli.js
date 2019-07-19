#!/usr/bin/env node
'use strict'
const meow = require('meow');
const handleCLI = require('.');

const cli = meow(`
        Usage
        $ npm-check [COMMAND]

        Options
        --directory, -d  Your project root directory, where your package.json is located

        Examples
        $ npm-check
        $ npm-check --directory ./someFolder
        $ npm-check -d ./someFolder
`, {
    flags: {
        directory: {
            type: 'string',
            alias: 'd',
            default: process.cwd(),
        },
    }
});

handleCLI(cli);