### webpack.config.js
webpack.config.js是webpack默认的打包配置文件，如下：  
```js
const path = require('path');
module.exports = {
    mode: 'development',// 打包模式
    entry: './src/index.js',// 打包的入口文件
    output: {
        filename: 'bundle.js', // 打包后的文件名
        path: path.resolve(__dirname, 'build') //打包输出的路径，必须为绝对路径，否则会报错
    }
}
```
其中`entry: './src/index.js'`是一个简写，
```js
entry: {
    main: "./src/index.js"
}
```
### mode
mode是打包的模式，有development(生产环境)和production(发布环境)，默认是发布环境。  
- production：代码会被压缩，项目发布上线采用该模式 
- development：代码不会被压缩。项目还在开发阶段使用该模式