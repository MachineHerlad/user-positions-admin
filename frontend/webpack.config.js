const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode:'development',

    devtool: 'source-map',

    entry:{
        'js/app': './src/app.js'
    },

    output: {
        path:path.join(__dirname, './dist'),
        filename: '[name].js'
    },

        module:{
            rules:[
                {
                    test: /\.art$/,
                    use:{
                        loader:'art-template-loader'
                    }
                    
                },
                {
                    test:/.\css$/,
                    loaders:['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                      {
                        loader: 'url-loader',
                        options: {
                          limit: 8192
                        }
                      }
                    ]
                  }
            ]
        }
    ,

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './public/index.html'),
            filename: 'index.html',
        }),
        new CopyPlugin({
            patterns:[
                {
                    from: 'public/*.ico', //文件起始路径
                    to: path.join(__dirname, './dist/favicon.ico')
                },
                {
                    from: 'public/libs',
                    to: path.join(__dirname, './dist/libs')
                }
            ]
        }),
        
        // 覆盖更新dist
        new CleanWebpackPlugin()
    ],

    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        compress: true,
        port: 8080,
        // 跨域代理
        proxy:{
            '/api': {
                target:'http://localhost:3000'
            }
        }
      }
 }