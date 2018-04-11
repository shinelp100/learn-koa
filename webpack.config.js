// webpack.config.js
const webpack = require('webpack');

module.exports = {
    output: {
        // 指定输出文件名
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        // 设置加载器
        loaders: [{
            // 使用babel进行转换  安装 cnpm install babel-cli babel-preset-es2015 --save
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         }
    //     })
    // ]
};