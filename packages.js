const Util = require('./Util');

const _reduceDependencies = function(dependencies, cb, defaultValue = []) {
    return Object.keys(dependencies).reduce((...args) => cb(...args), defaultValue);
};

const _hasDependencyInstalled = function(dependency, nodeModuleDir) {
    return nodeModuleDir.find((pkg) => pkg === dependency) !== undefined;
};

const _getInstalledPkgs = function(dependencies, nodeModuleDir) {
    return _reduceDependencies(dependencies, (acc, dependency) => {
        if (_hasDependencyInstalled(dependency, nodeModuleDir)) {
            return [...acc, { name: dependency, version: dependencies[dependency] }];
        }
        return acc;
    })
};

const _getNonInstalledPkgs = function(dependencies, nodeModuleDir) {
    return _reduceDependencies(dependencies, (acc, dependency) => {
        if (!_hasDependencyInstalled(dependency, nodeModuleDir)) {
            return [...acc, { name: dependency, version: dependencies[dependency] }];
        }
        return acc;
    });
};

const _getPkgs = async function(pkgs) {
    let pkgsList = [];
    for await(const pkg of pkgs) {
        const { name, version } = pkg;
        const npm = await getPackageInfo(name);
        pkgsList = [...pkgsList, { local: { name, version }, npm }];
    }
    return pkgsList;
};

const getPackageInfo = async (name) => {
    const searchedPkgs = await Util.searchPackage(name, { limit: 1 });
    const package = searchedPkgs[0];
    return { name: package.name, version: package.version };
};

const getPackageSearch = async (pkgName) => {
    const npm = await getPackageInfo(pkgName);
    return [{ local: {}, npm, }];
};

const getPackagesList = async function(dependencies, nodeModuleDir) {
    const installedPkgs = _getInstalledPkgs(dependencies, nodeModuleDir);
    const nonInstalledPkgs = _getNonInstalledPkgs(dependencies, nodeModuleDir);
    return await _getPkgs([...installedPkgs, ...nonInstalledPkgs]);
};

module.exports = {
    getPackagesList,
    getPackageSearch
};