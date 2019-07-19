const table = require('text-table');
const chalk = require('chalk');
const Util = require('./Util');

class Table {
    constructor() {
        this.table = [];
    }    

    getTableRow(currentPackage, pkg) {
        if(!currentPackage) return [chalk.bold.red(pkg.name), chalk.bold.red(`Package not found in npm library`)];
        return [chalk.bold.green(currentPackage.name), chalk.bold.green(pkg.version.replace('^', '')),  chalk.bold.green(currentPackage.version)];    
    };

    async _getTableContent(content) {
        return await Promise.all(content.map(async (pkg) => {
            const searchedPkgs = await Util.searchPackage(pkg.name, { limit: 1 });
            const currentPackage = Util.getPackageByName(searchedPkgs, pkg.name);
            return this.getTableRow(currentPackage, pkg);
        }));
    }

    async _setTableContent(content) {
        this.table = await this._getTableContent(content);
    }

    _getTableHeaders() {
        return [chalk.bold.blue('Package'), chalk.bold.blue('Current package version'), chalk.bold.blue('Latest package version')];
    }

    _setTableHeaders() {
        const headers = this._getTableHeaders();
        this.table = [headers, ...this.table];
    }

    async displayTable(content) {
        // Set table content
        await this._setTableContent(content);

        // Set table headers
        this._setTableHeaders();

        const t = table(this.table);

        console.log(t);
    }
}

module.exports = Table;