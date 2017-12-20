const path = require('path');
var merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var baseWebpackConfig = require('./webpack.base.js');

module.exports = merge(baseWebpackConfig, {
    entry: {
        main: './demo/dist.js'
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: './',
        filename: 'main.[hash:7].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'myiue',
            template: 'demo/dist.html',
            filename: './index.html',
            showErrors: true,
            hash: true,
            inject: 'body'
        }),
        new CleanWebpackPlugin(
            ['main.*.js'],
            {
                root: path.join(__dirname, '../dist'),
                verbose: true, //开启在控制台输出信息
                dry: false //启用删除文件
            }
        )
    ]
});
