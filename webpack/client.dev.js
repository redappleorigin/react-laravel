const path = require('path')
const webpack = require('webpack')
const CONFIG = require('./base')

const {
    CLIENT_ENTRY,
    CLIENT_OUTPUT,
    // SERVER_ENTRY,
    PUBLIC_PATH
} = CONFIG;

module.exports = {
    devtool: 'eval',
    entry: {
        Client: [
            'react-hot-loader/patch',

            // The script refreshing the browser on none hot updates
            'webpack-dev-server/client?http://localhost:8080',

            // For hot style updates
            'webpack/hot/only-dev-server',

            // Main app
            CLIENT_ENTRY
        ],
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: PUBLIC_PATH,
        path: CLIENT_OUTPUT
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: (module) => {
                return module.resource && module.resource.indexOf('node_modules') !== -1
            },
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __DEV__: true,
            __CLIENT__: true,
            __SERVER__: false,
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|server)/,
                query: {
                    cacheDirectory: true,
                    presets: [
                        'es2015',
                        'react',
                        'stage-0',
                    ],
                    plugins: [
                        'react-html-attrs',
                        'react-hot-loader/babel',
                    ]
                }
            },
        ]
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        hot: true,
        noInfo: true,
        historyApiFallback: true,
        stats: {
            colors: true,
        },
    },
}
