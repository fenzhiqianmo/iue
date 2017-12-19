const path = require('path');

const config = {
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
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: "pre",
                exclude: /node_modules/,
                include: /iue/,
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: /iue/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            }
        ]
    },
    plugins: []
};

module.exports = config;