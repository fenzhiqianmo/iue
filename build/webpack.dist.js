const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        main: './demo/dist.js'
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: './',
        filename: 'main.[hash:7].js'
    },
    module: {
        rules: [
            {
                test: /\.iue$/,
                loader: 'iue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            }
        ]
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
};

module.exports = config;