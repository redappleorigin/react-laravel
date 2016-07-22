const path = require('path')
const webpack = require('webpack')
const CONFIG = require('./base')

const {
    SERVER_ENTRY,
    SERVER_OUTPUT,
    PUBLIC_PATH
} = CONFIG;

module.exports = {
    devtool: 'eval',
    entry: {
        Server: SERVER_ENTRY,
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: SERVER_OUTPUT
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules)/,
                query: {
                    cacheDirectory: true,
                    presets: [
                        "es2015",
                        "react",
                        "stage-0",
                    ],
                    plugins: [
                        "react-html-attrs",
                    ]
                }
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __DEV__: true,
            __CLIENT__: false,
            __SERVER__: true,
        }),
    ],
    node: {
        fs: "empty"
    }
}
