const path = require('path')
const webpack = require('webpack')
const CONFIG = require('./base')

const { CLIENT_ENTRY, CLIENT_OUTPUT, SERVER_ENTRY, PUBLIC_PATH } = CONFIG

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        Client: CLIENT_ENTRY,
        Server: SERVER_ENTRY,
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: PUBLIC_PATH,
        path: CLIENT_OUTPUT
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'common'}),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            '__DEV__': true
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                // exclude: /(node_modules|server)/,
                exclude: /(node_modules)/,
                query: {
                    cacheDirectory: true,
                    presets: [
                        "es2015",
                        "react",
                        "stage-0"
                    ]
                }
            },
        ]
    },
    node: {
        fs: "empty"
    }
}
