const Util = require('./Util');

const getInstalledPkgs = async (appDir) => {
    const dependencies = await Util.getPKGDependencies(appDir);
    const nodeModuleDir = await Util.getNodeModulesDir(appDir);
    const installedLocalPkgs = nodeModuleDir.reduce((acc, nModule) => {
        if (Util.has(dependencies, nModule)) {
            acc = [...acc, { name: nModule, version: dependencies[nModule] }];
        }
        return acc;
    }, []);
    const installedPkgs = await getPkgs(installedLocalPkgs);
    return Promise.all(installedPkgs);
};

const getNonInstalledPkgs = async (appDir) => {
    const dependencies = await Util.getPKGDependencies(appDir);
    const installedPkgs = await getInstalledPkgs(appDir);
    const nonInstalledLocalPkgs = Object.keys(dependencies).reduce((acc, dependency) => {
        if (!installedPkgs.some((pkg) => pkg.local.name === dependency)) {
            acc = [...acc, { name: dependency, version: dependencies[dependency] }];
        }
        return acc;
    }, []);
    const nonInstalledPkgs = await getPkgs(nonInstalledLocalPkgs);
    return Promise.all(nonInstalledPkgs);
};

const getPkgs = async (pkgs) => {
    return pkgs.map(async ({ name, version }) => {
        const local = { name, version };
        const npm = await getPackageInfo(name);
        return { local, npm };
    })
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

module.exports = {
    getInstalledPkgs,
    getNonInstalledPkgs,
    getPackageSearch
};