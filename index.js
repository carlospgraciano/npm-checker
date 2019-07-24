'use strict'
const ora = require('ora');
const packages = require('./packages');
const Table = require('./Table');
const loader = ora();

module.exports = async (cli) => {
    let content = null;
    const { input, flags: { directory, name } } = cli;

    loader.start('Checking...');

    const type = input[0];

    switch(type) {
        // case 's':
        //     content = await packages.getPackageInfo(name);
        //     break;
        case 'ni':
            content = await packages.getNonInstalledPkgs(directory);
            break;
        case 'i':
        default:
            content = await packages.getInstalledPkgs(directory);
            break;
    }
    
    loader.stop();
    
    const table = new Table();
    table.displayTable(content);
};