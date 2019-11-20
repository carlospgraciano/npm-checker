'use strict'
const ora = require('ora');
const Table = require('./Table');
const { getPackageSearch, getNonInstalledPkgs, getInstalledPkgs } = require('./packages');
const loader = ora();
const Util = require('./Util');
const Packages = require('./packages');

module.exports = async (cli) => {
    const { input, flags: { directory, name } } = cli;
    // let content = null;

    // loader.start('Checking...');

    const { dependencies } = await Util.getPackageJSONFile(directory);    
    const nodeModuleDir = await Util.getNodeModulesDir(directory);
    const packagesList = await Packages.getPackagesList(dependencies, nodeModuleDir);
    console.log("PACKAGE LIST", packagesList);
    // const type = input[0];
    // switch(type) {
    //     case 's':
    //         content = await getPackageSearch(name);
    //         break;
    //     case 'ni':
    //         content = await getNonInstalledPkgs(directory);
    //         break;
    //     case 'i':
    //     default:
    //         content = await getInstalledPkgs(directory);
    //         break;
    // }
    
    // loader.stop();

    // const table = new Table();
    // table.displayTable(content);
};