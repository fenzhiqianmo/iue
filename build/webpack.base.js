const path = require('path');

const config = {
    resolve: {
        alias: {
          '@': path.resolve(__dirname, '../iue/src/')
        }
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
    }
};

module.exports = config;