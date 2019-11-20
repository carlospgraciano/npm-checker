#!/usr/bin/env node
'use strict'
const meow = require('meow');
const handleCLI = require('.');

const cli = meow(`
        Usage
        $ npm-check <inputs> [options]

        Inputs
        i Check for installed packages
        ni Check for non-installed packages
        s Check for a specific package

        Options
        --directory, -d  Your project root directory, where your package file is located
        --name, -n Name of a specific package

        Examples
        $ npm-check
        $ npm-check --directory ./someFolder
        $ npm-check -d ./someFolder
        $ npm-check n-i --directory ./someFolder
        $ npm-check n-i -d ./someFolder
`, {
    flags: {
        directory: {
            type: 'string',
            alias: 'd',
            default: process.cwd(),
        },
        name: {
            type: 'string',
            alias: 'n',
            default: '',
        }
    }
});

handleCLI(cli);