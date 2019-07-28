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
            console.log(chalk.red.bold('NPM package json file not found!'));
            process.exit(0);
        }
    };
    
    static async getNodeModulesDir(appDir) {
        try {
            const readDir = util.promisify(fs.readdir);
            return await readDir(`${appDir}/node_modules`);
        } catch(err) {
            console.log(chalk.red.bold('Node module folder not found!'));
            process.exit(0);
        }
    };
    
    static async getPKGDependencies(appDir) {
        const pkgFile = await Util.getPackageJSONFile(appDir);
        if(!pkgFile.dependencies) return console.log(chalk.bgRed.bold('NPM package json dependencies not found!'));
        return pkgFile.dependencies;
    };
    
    static getPackageByName(packages, name) {
        return packages.find((pkg) => pkg.name == name);
    };

    static async searchPackage(pkgName, opts) {
        return await search(pkgName, opts);
    };

    static isEmpty(value) {
        switch(value.constructor.name) {
            case 'Object':
                return (Object.keys(value).length === 0);
            case 'Array':
                return (value.length === 0);
            case 'String':
                return (!value);
            default:
                return true;
        }
    };
};

module.exports = Util;