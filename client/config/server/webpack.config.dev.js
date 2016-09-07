var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var PrettyConsolePlugin = require('../../scripts/utils/pretty-console-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var paths = require('../paths');

module.exports = {
    devtool: 'eval',
    entry: {
        Server: [
            require.resolve('../polyfills'),
            path.join(paths.appSrc, 'server.entry')
        ],
    },
    output: {
        filename: '[name].js',
        path: paths.serverBuild,
    },
    resolve: {
        extensions: ['', '.js', '.json'],
        alias: {
            // This `alias` section can be safely removed after ejection.
            // We do this because `babel-runtime` may be inside `react-scripts`,
            // so when `babel-plugin-transform-runtime` imports it, it will not be
            // available to the app directly. This is a temporary solution that lets
            // us ship support for generators. However it is far from ideal, and
            // if we don't have a good solution, we should just make `babel-runtime`
            // a dependency in generated projects.
            // See https://github.com/facebookincubator/create-react-app/issues/255
            'babel-runtime/regenerator': require.resolve('babel-runtime/regenerator')
        }
    },
    resolveLoader: {
        root: paths.ownNodeModules,
        moduleTemplates: ['*-loader']
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: paths.appSrc,
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                include: paths.appSrc,
                loader: 'babel',
                query: require('./babel.dev')
            },
            {
                test: /\.css$/,
                include: [paths.appSrc, paths.appNodeModules],
                loader: 'style!css!postcss'
            },
            {
                test: /\.json$/,
                include: [paths.appSrc, paths.appNodeModules],
                loader: 'json'
            },
            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
                include: [paths.appSrc, paths.appNodeModules],
                loader: 'file',
                query: {
                    name: 'static/media/[name].[ext]'
                }
            },
            {
                test: /\.(mp4|webm)(\?.*)?$/,
                include: [paths.appSrc, paths.appNodeModules],
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'static/media/[name].[ext]'
                }
            }
        ]
    },
    eslint: {
        configFile: paths.eslint,
        useEslintrc: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
            __DEV__: true,
            __CLIENT__: false,
            __SERVER__: true,
        }),
        new PrettyConsolePlugin(),
        new CaseSensitivePathsPlugin(),
    ],
};
