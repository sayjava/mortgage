var webpack = require('webpack');
module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "dist/bundle.js"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                plugins: ['transform-react-jsx'],
                query: {
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            }
        ]
    }
}