const Util = require('./Util');

const getInstalledPkgs = async (appDir) => {
    const dependencies = await Util.getPKGDependencies(appDir);
    const nodeModuleDir = await Util.getNodeModulesDir(appDir);
    const installedLocalPkgs = nodeModuleDir.filter((nModule) => Object.keys(dependencies).includes(nModule));
    const installedPkgs = await getPkgs(installedLocalPkgs);
    console.log("INSTALLED PACKAGES", installedPkgs);
    return Promise.all(installedPkgs);
};

const getNonInstalledPkgs = async (appDir) => {
    const dependencies = await Util.getPKGDependencies(appDir);
    const installedPkgs = await getInstalledPkgs(appDir);
    const nonInstalledLocalPkgs = Object.keys(dependencies).filter(dependency => !installedPkgs.some((pkg) => pkg.name == dependency));
    const nonInstalledPkgs = await getPkgs(nonInstalledLocalPkgs);
    console.log("NON INSTALLED PACKAGES", nonInstalledPkgs);
    return Promise.all(nonInstalledPkgs);
};

const getPkgs = async (pkgs) => {
    return pkgs.map(async (pkg) => {
        const local = { name: pkg, version: dependencies[pkg] };
        const npm = await getPackageInfo(pkg);
        return { local, npm };
    })
};

const getPackageInfo = async (name) => {
    const searchedPkgs = await Util.searchPackage(name, { limit: 1 });
    return Util.getPackageByName(searchedPkgs, name);
};

module.exports = {
    getInstalledPkgs,
    getNonInstalledPkgs,
    getPackageInfo,
};