const path = require('path');

const config = {
    entry: {
        main: './src/index'
    },
    output: {
        libraryTarget: "umd",
        path: path.join(__dirname, './lib'),
        filename: 'zue.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
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
    ]
};

module.exports = config;