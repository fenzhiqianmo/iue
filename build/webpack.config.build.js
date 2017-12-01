const path = require('path');

const config = {
    entry: {
        main: './iue/src/index.js'
    },
    output: {
        libraryTarget: "umd",
        path: path.join(__dirname, '../iue/lib'),
        filename: 'iue.js'
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
    ]
};

module.exports = config;