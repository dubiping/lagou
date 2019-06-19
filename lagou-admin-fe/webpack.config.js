const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')


module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname,'./dev')
    },
    devServer: {
        contentBase: path.resolve(__dirname,'dev'),
        compress: true,
        port: 8888,
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'http://localhost:3000'
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                        limit: 1,
                        }
                    },
                    {
                        loader : "file-loader",
                        options : {
                            name : "[name].[ext]"
                        }
                    }
                ]
            },
            {
                "test" : /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.hbs$/i,
                use: {
                  loader: 'handlebars-loader'
                }
            },
            // {
            //       test : /\.(js|jsx)$/,
            //       use : {
            //             loader : "babel-loader"
            //       }
            // },
            {
                test: /\.html$/i,
                use: {
                  loader: 'string-loader'
                }
            },
        ]
    }
    ,
    plugins: [
        new HtmlPlugin({
            filename: 'index.html', // 目标文件名
            template: './index.html' // 源文件路径
        }),
        new CopyPlugin([
            { from: './src/public', to: './public' }
        ])
    ]
}