const path = require('path');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.js');

module.exports = merge(baseWebpackConfig, {
    entry: {
        main: './demo/dev'
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/dist/',
        filename: 'iue.js'
    },
    devServer: {
      contentBase: path.join(__dirname, "../demo/"),
      compress: true,
      port: 9000
    }
});
