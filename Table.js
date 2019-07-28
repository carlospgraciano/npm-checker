const { table } = require('table');
const chalk = require('chalk');
const Util = require('./Util');

class Table {
    constructor() {
        this.table = [];
    }

    getTableRow(payload) {
        const { local = {}, npm = {} } = payload;
        
        if(Util.isEmpty(npm)) return [chalk.bold.red(local.name), chalk.bold.red(local.version), chalk.bold.red(`Package not found in npm library`)];
        else if (Util.isEmpty(local)) return [chalk.bold.green(npm.name), chalk.bold.red("Local version not found"), chalk.bold.green(npm.version)];

        return [chalk.bold.green(local.name), chalk.bold.green(local.version),  chalk.bold.green(npm.version)];    
    };

    _getTableContent(content) {
        return content.map((pkg) => this.getTableRow(pkg));
    }

    _setTableContent(content) {
        const tableContent = this._getTableContent(content);
        this.table = [...this.table, ...tableContent];
    }

    _setTableHeaders() {
        const headers = [chalk.bold.blue('Package'), chalk.bold.blue('Current package version'), chalk.bold.blue('Latest package version')];
        this.table = [headers, ...this.table];
    }

    displayTable(content) {
        // Set table headers
        this._setTableHeaders();

        // Set table content
        this._setTableContent(content);

        const config = { 
            columns: {
                0: {
                  alignment: 'center',
                },
                1: {
                  alignment: 'center',
                },
                2: {
                  alignment: 'center',
                }
            }
        };
        
        const output = table(this.table, config);

        console.log(output);
    }
}

module.exports = Table;