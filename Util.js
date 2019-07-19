const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const search = require('libnpmsearch');

class Util {
    static async getPackageJSONFile(appDir) {
        try {
            const readFile = util.promisify(fs.readFile);
            const data = await readFile(`${appDir}/package.json`);
            return JSON.parse(data);
        } catch(err) {
            console.log(chalk.bgRed.bold('NPM package json file not found!'));
            process.exit(0);
        }
    };
    
    static async getNodeModulesDir(appDir) {
        try {
            const readDir = util.promisify(fs.readdir);
            return await readDir(`${appDir}/node_modules`);
        } catch(err) {
            console.log(chalk.bgRed.bold('Node module folder not found!'));
            process.exit(0);
        }
    };
    
    static getPKGDependencies(pkgFile) {
        const { dependencies } = pkgFile;
        if(!dependencies) return console.log(chalk.bgRed.bold('NPM package json dependencies not found!'));
        return dependencies;
    };
    
    static getInstalledPkgs(nodeModuleDir, pkgDependencies) {
        const installedPkgs = nodeModuleDir.filter((pkg) => Object.keys(pkgDependencies).includes(pkg));
        const pkgs = installedPkgs.map((pkg) => {
            if(pkgDependencies[pkg]) return { name: pkg, version: pkgDependencies[pkg] };
        });
        return pkgs;
    };
    
    static getNonInstalledPkgs(installedPkgs, pkgDependencies) {
        const nonInstalledPkgs = Object.keys(pkgDependencies).filter(dependency => !installedPkgs.some((pkg) => pkg.name == dependency));
        const pkgs = nonInstalledPkgs.map((pkg) => {
            if(pkgDependencies[pkg]) return { name: pkg, version: pkgDependencies[pkg] };
        });
        return pkgs;
    };
    
    static getPackageByName(packages, name) {
        return packages.find((pkg) => pkg.name == name);
    };

    static async searchPackage(pkgName, opts) {
        return await search(pkgName, opts);
    };
};

module.exports = Util;