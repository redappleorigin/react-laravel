// TODO: we can split this file into several files (pre-eject, post-eject, test)
// and use those instead. This way we don't need to branch here.

var path = require('path');

function resolveApp(relativePath) {
    return path.resolve(relativePath);
}

module.exports = {
    appBuild: resolveApp('public/js'),
    appHtml: resolveApp('client/src/index.html'),
    appFavicon: resolveApp('public/favicon.ico'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('client/src'),
    appNodeModules: resolveApp('node_modules'),
    eslint: resolveApp('client/config/eslint.js'),
    ownNodeModules: resolveApp('node_modules'),
    serverBuild: resolveApp('client/build'),
};
