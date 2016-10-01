var webpack = require('webpack');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');

var path = require('path');

var env = require('yargs').argv.mode;

var plugins = [], outputFile;


if (env === 'build') {
    plugins.push(new UglifyJsPlugin(
        {
            minimize: true
        }
    ));
    outputFile = 'bundle.min.js';
} else {
    plugins.push(new CopyWebpackPlugin([
        {
            from: __dirname + '/src/index.html',
            to: __dirname + '/dist'
        }
    ]));
    outputFile = 'bundle.js';
}


var config = {
    entry: __dirname + '/src/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: outputFile
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'eslint-loader',
                exclude: /(node_modules|dist)/
            }
        ]
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js']
    },
    plugins: plugins
};


module.exports = config;
