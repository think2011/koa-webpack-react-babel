'use strict';
const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEBUG = process.env.NODE_ENV === 'DEBUG';

const paths = {
    src : './app',
    dist: './dist'
};

var webpackCfg = {
    entry  : [
        `${paths.src}/index`
    ],
    output : {
        path    : path.join(__dirname, paths.dist),
        filename: 'bundle.[hash:8].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${paths.src}/index.html`
        })
    ],
    module : {
        loaders: [
            {
                test  : /\.jsx?$/,
                loader: 'babel?compact=false'
            },
            {
                test   : /\.css/,
                loaders: [
                    'style',
                    'css',
                    'autoprefixer'
                ]
            },
            {
                test   : /\.scss/,
                loaders: [
                    'style',
                    'css',
                    'autoprefixer',
                    'sass'
                ]
            }
        ]
    }
};

// 定制开发环境
if (DEBUG) {
    webpackCfg.devtool = 'cheap-module-eval-source-map';
    webpackCfg.entry.unshift('webpack-hot-middleware/client');
    webpackCfg.output.filename = 'bundle.js';
    webpackCfg.plugins.push(
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    );
} else {
    webpackCfg.plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}


module.exports = webpackCfg;