const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;//深度tree shaking
const PurifyCSSPlugin = require('purifycss-webpack');
//This plugin extracts CSS into separate files. 
//It creates a CSS file per JS file which contains CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const glob = require('glob-all');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports =  {
    mode: 'development',
    devServer: {
        //为本地服务器指定加载目录,浏览器会去找该目录下的index.html
		contentBase: path.resolve(__dirname, 'dist'),
		historyApiFallback: true,//不跳转
		inline: true,//网页的实时刷新
        port: 9090,
        hot: true//开启热更新
	},
    //entry file入口文件
    entry: {
        index: './index.js'
    },
    output: {
        filename: 'bundle.js', 
        // 打包输出的文件的位置,是一个绝对路径
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { 
                        // loader: MiniCssExtractPlugin.loader //不支持热更新
                        loader: 'style-loader'//默认支持热更新
                    },
                    {
                        loader: 'css-loader'
                    },
                    //postcss-loader应该用于css-loader之前
                    //对css先进行处理,如添加后缀
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')//添加后缀
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                use: [
                    {
                        loader: 'img-loader'
                    },
                    {
                        loader: 'url-loader',
                        options: {
                            //[name]:文件/资源​​的基名。
							//[ext]:目标文件/资源​​的文件扩展名。
							//name:自定义了img资源所在的路径
                            name: '[name][hash:5].[ext]',
                            // < limit的图片会被url-loader转换为base64编码格式,这个base64编码就代表图片本身,所以不会被打包输出
                            // > limit的图片会被file-loader解析,图片被单独抽离出来,并且被打包到指定输出目录
                            // limit: 819222222222,
                            limit: 8192,
                            outputPath: 'img'// > limit的图片打包输出到的地方
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        //解析html
                        //Exports HTML as string. 
                        //HTML is minimized when the compiler demands.
                        loader: 'html-loader',
                        options: {
                            //You can specify which tag-attribute combination should be processed by this loader via the query parameter attrs
                            //处理img标签的src,使其路径与我们利用file-loader or url-loader处理图片后的路径一致
                            attrs: ['img:src']
                        }
                    }
                ]
            }
        ]  
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: '[name][hash:4].css'//define the css filename after webpack
        // }),
        new PurifyCSSPlugin({//css tree shaking
            //Give paths to parse for rules. These should be absolute!
            //to handle multiple paths match
            paths: glob.sync([
                path.join(__dirname, 'src/*.html'),
                path.join(__dirname, 'src/*.js')
            ])
        }),
        new WebpackDeepScopeAnalysisPlugin(),//js deep tree shaking

        //The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
        //If you have any CSS assets in webpack's output, 
        //(for example, CSS extracted with the MiniCssExtractPlugin)
        //then these will be included with <link> tags in the HTML head
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',//以指定文件为模板生成
            minify: {
                remveComments: true
                // collapseWhitespace: true//清除空格
            }
        }),
        new CleanWebpackPlugin(),//在开启本地服务器时,该插件会误把我们dist下的文件全都剔除
        new webpack.HotModuleReplacementPlugin()
        //热更新插件,监听文件(css,html)只变化的部分,在开启服务器自动更新页面时不会刷新整个页面,只会更新变化的部分
        //注意: js的修改还是会更新整个页面,若想让js的修改也能实现局部更新,则需要在入口文件(index.js)中进行设置
    ]
}
/**
 * 1.主程序index.js,它是程序的入口文件,入口文件有很多依赖的模块,webpack从入口文件入手,将所有依赖的文件统一打包输出 
 * 2.利用命令npm run prod(我在package.json中的scripts中进行了配置)打包index.js
 * 3.打包的代码自动进行tree shaking,抖掉无用的模块,并且压缩到bundle.js中,不会对css代码进行抖动
 * 4.css tree shaking(将无用的css代码抖掉):需要安装插件'purifycss-webpack','purify-css'
 */