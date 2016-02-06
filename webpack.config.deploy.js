var webpack = require('webpack');
module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "dist/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                plugins: ['transform-react-jsx'],
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin()
    ]
}