// const table = require('text-table');
const table = require('table');
const chalk = require('chalk');
const packages = require('./packages');

class Table {
    constructor() {
        this.table = [];
    }

    getTableRow(payload = {}) {
        const { local = {}, npm = {} } = payload;
        if(Object.keys(npm) == 0) return [chalk.bold.red(local.name), chalk.bold.red(local.version), chalk.bold.red(`Package not found in npm library`)];
        return [chalk.bold.green(local.name), chalk.bold.green(local.version.replace('^', 'v')),  chalk.bold.green(npm.version)];    
    };

    _getTableContent(content) {
        console.log("CONTENT", content);
        return content.map((pkg) => this.getTableRow(pkg));
    }

    _setTableContent(content) {
        this.table = [...this.table, this._getTableContent(content)];
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