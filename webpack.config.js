var webpack = require('webpack');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var CopyWebpackPlugin = require('copy-webpack-plugin');


var config = {
    entry: __dirname + '/src/js/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist/js',
        filename: 'bundle.min.js'
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
    plugins: [
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/index.html',
                to: __dirname + '/dist'
            },
            {
                from: __dirname + '/src/css/style.css',
                to: __dirname + '/dist/css'
            }
        ]),
        new UglifyJsPlugin(
            {
                minimize: true
            }
        )
    ]
};


module.exports = config;
