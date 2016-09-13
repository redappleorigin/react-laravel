var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var PrettyConsolePlugin = require('../../scripts/utils/pretty-console-plugin');
var WatchMissingNodeModulesPlugin = require('../../scripts/utils/WatchMissingNodeModulesPlugin');
var paths = require('../paths');
var env = require('../env');

env['__DEV__'] = true;
env['__CLIENT__'] = false;
env['__SERVER__'] = true;

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
    // This makes the bundle appear split into separate modules in the devtools.
    // We don't use source maps here because they can be confusing:
    // https://github.com/facebookincubator/create-react-app/issues/343#issuecomment-237241875
    // You may want 'cheap-module-source-map' instead if you prefer source maps.
    devtool: 'eval',
    // These are the "entry points" to our application.
    // This means they will be the "root" imports that are included in JS bundle.
    // The first two entry points enable "hot" CSS and auto-refreshes for JS.
    entry: {
        Server: [
            // We ship a few polyfills by default.
            require.resolve('../polyfills'),
            // Finally, this is your app's code:
            path.join(paths.appSrc, 'server.entry')
            // We include the app code last so that if there is a runtime error during
            // initialization, it doesn't blow up the WebpackDevServer client, and
            // changing JS code would still trigger a refresh.
        ],
    },
    output: {
        // Next line is not used in dev but WebpackDevServer crashes without it:
        path: paths.serverBuild,
        // This does not produce a real file. It's just the virtual path that is
        // served by WebpackDevServer in development. This is the JS bundle
        // containing code from all our entry points, and the Webpack runtime.
        filename: '[name].js',
    },
    resolve: {
        // This allows you to set a fallback for where Webpack should look for modules.
        // We read `NODE_PATH` environment variable in `paths.js` and pass paths here.
        // We use `fallback` instead of `root` because we want `node_modules` to "win"
        // if there any conflicts. This matches Node resolution mechanism.
        // https://github.com/facebookincubator/create-react-app/issues/253
        fallback: paths.nodePaths,
        // These are the reasonable defaults supported by the Node ecosystem.
        // We also include JSX as a common component filename extension to support
        // some tools, although we do not recommend using it, see:
        // https://github.com/facebookincubator/create-react-app/issues/290
        extensions: ['.js', '.json', '.jsx', ''],
        alias: {
            // Support React Native Web
            // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
            'react-native': 'react-native-web'
        }
    },
    // Resolve loaders (webpack plugins for CSS, images, transpilation) from the
    // directory of `react-scripts` itself rather than the project directory.
    // You can remove this after ejecting.
    resolveLoader: {
        root: paths.ownNodeModules,
        moduleTemplates: ['*-loader']
    },
    module: {
        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint',
                include: paths.appSrc,
            }
        ],
        loaders: [
            // Process JS with Babel.
            {
                test: /\.(js|jsx)$/,
                include: paths.appSrc,
                loader: 'babel',
                query: require('./babel.dev')
            },
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader turns CSS into JS modules that inject <style> tags.
            // In production, we use a plugin to extract that CSS to a file, but
            // in development "style" loader enables hot editing of CSS.
            {
                test: /\.css$/,
                loader: 'style!css!postcss'
            },
            // JSON is not enabled by default in Webpack but both Node and Browserify
            // allow it implicitly so we also enable it.
            {
                test: /\.json$/,
                loader: 'json'
            },
            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you `import` an asset, you get its (virtual) filename.
            // In production, they would get copied to the `build` folder.
            {
                test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                exclude: /\/favicon.ico$/,
                loader: 'file',
                query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            // A special case for favicon.ico to place it into build root directory.
            {
                test: /\/favicon.ico$/,
                include: [paths.appSrc],
                loader: 'file',
                query: {
                    name: 'favicon.ico?[hash:8]'
                }
            },
            // "url" loader works just like "file" loader but it also embeds
            // assets smaller than specified size as data URLs to avoid requests.
            {
                test: /\.(mp4|webm)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            // "html" loader is used to process template page (index.html) to resolve
            // resources linked with <link href="./relative/path"> HTML tags.
            {
                test: /\.html$/,
                loader: 'html',
                query: {
                    attrs: ['link:href'],
                }
            }
        ]
    },
    // Point ESLint to our predefined config.
    eslint: {
        configFile: paths.eslint,
        useEslintrc: false
    },
    plugins: [
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'development') { ... }. See `env.js`.
        new webpack.DefinePlugin(env),
        new PrettyConsolePlugin(),
        // Watcher doesn't work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        // See https://github.com/facebookincubator/create-react-app/issues/240
        new CaseSensitivePathsPlugin(),
        // If you require a missing module and then `npm install` it, you still have
        // to restart the development server for Webpack to discover it. This plugin
        // makes the discovery automatic so you don't have to restart.
        // See https://github.com/facebookincubator/create-react-app/issues/186
        new WatchMissingNodeModulesPlugin(paths.appNodeModules)
    ],
};
