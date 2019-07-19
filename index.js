'use strict'
const ora = require('ora');
const Table = require('./Table');
const Util = require('./Util');
const loader = ora();

module.exports = async (cli) => {
    const { flags: { directory } } = cli;
    
    loader.start('Checking...');
   
    const pkgFile = await Util.getPackageJSONFile(directory);
    const pkgDependencies = Util.getPKGDependencies(pkgFile);
    const nodeModuleDir = await Util.getNodeModulesDir(directory);
    const installedPkgs = Util.getInstalledPkgs(nodeModuleDir, pkgDependencies);
    const nonInstalledPkgs = Util.getNonInstalledPkgs(installedPkgs, pkgDependencies);
    
    loader.stop();
    
    const table = new Table();
    table.displayTable(nonInstalledPkgs);
};