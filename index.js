'use strict'
const ora = require('ora');
const Table = require('./Table');
const { getPackageSearch, getNonInstalledPkgs, getInstalledPkgs } = require('./packages');
const loader = ora();

module.exports = async (cli) => {
    const { input, flags: { directory, name } } = cli;
    let content = null;

    loader.start('Checking...');

    const type = input[0];

    switch(type) {
        case 's':
            content = await getPackageSearch(name);
            break;
        case 'ni':
            content = await getNonInstalledPkgs(directory);
            break;
        case 'i':
        default:
            content = await getInstalledPkgs(directory);
            break;
    }
    
    loader.stop();

    const table = new Table();
    table.displayTable(content);
};