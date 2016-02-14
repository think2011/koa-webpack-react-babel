'use strict';
const path    = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry  : [
        'webpack-hot-middleware/client',
        './app/index'
    ],
    output : {
        path    : path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module : {
        loaders: [
            {
                test  : /\.jsx?$/,
                loader: 'babel'
            },
            {
                test   : /\.css/,
                loaders: [
                    'style',
                    'css'
                ]
            },
            {
                test   : /\.scss/,
                loaders: [
                    'style',
                    'css',
                    'sass'
                ]
            }
        ]
    }
};