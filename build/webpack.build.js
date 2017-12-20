const path = require('path');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.js');

module.exports = merge(baseWebpackConfig, {
    entry: {
        main: './iue/src/index.js'
    },
    output: {
        libraryTarget: "umd",
        path: path.join(__dirname, '../iue/lib'),
        filename: 'iue.js'
    }
});
