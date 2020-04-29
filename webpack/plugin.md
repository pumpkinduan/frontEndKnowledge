### 定义
> 在webpack运行的生命周期中会广播出许多事件，plugin可以监听这些事件，在合适的时机通过webpack提供的API改变输出结果
比方说,在使用`BannerPlugin`插件时,当webpack打包js文件输出打包后的chunk文件,这时,该插件会在某个时刻在这个chunk文件头部添加一些你自定义的注释内容
#### 常见的小插件

- CleanWebpackPlugin: 帮助打包时需要清空的目录,一般会清空 dist 目录,避免多次打包生成多个 dist 目录
- HtmlWebpackPlugin: 它会在打包结束后，自动生成一个 html 文件,并把打包生成的 js 自动引入到 HTML 中,可以给这个 html 制定一个模板
- CopyWebpackPlugin: 原封不动的复制指定的内容
- BannerPlugin: 内置的插件,需要`require(webpack)`,为每个 chunk 文件(如:打包的js,css文件)头部添加 banner,相关信息,如版权声明等

#### 基本配置

```js
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // html模板
      filename: "index.html", //打包后的文件名
      chunks: ['app'], // 用来指定所需引入的打包后的js文件
      hash: true,
      minify: {
          removeAttributeQuotes: true, // 去除双引号
          collapseWhitespace: true,// 折行
          removeComments: true, // 去除注释
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({from: 'doc', to: 'doc'}),
    new webpack.BannerWebpackPlugin({
        banner: '嫩南瓜'
    }),
  ],
};
```
