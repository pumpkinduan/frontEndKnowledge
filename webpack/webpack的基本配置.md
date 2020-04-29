### webpack.config.js

webpack.config.js 是 webpack 默认的打包配置文件，如下：

```js
const path = require("path");
module.exports = {
  mode: "development", // 打包模式
  entry: "../src/index.js", // 打包的入口文件
  output: {
    filename: "bundle.js", // 打包后的文件名, 默认为main.js
    path: path.resolve(__dirname, "build"), //打包输出的路径，必须为绝对路径，否则会报错
  },
};
```

其中`entry: '../src/index.js'`是一个简写，用于配置页面的一个入口 JS 文件

```js
// 若有多个入口JS文件,可以用对象的方式编写
entry: {
    main: "../src/index.js",
    app: "../src/app.js"
}
// 这时候的输出路径应该如下配置
output: {
    //用[name]占位符来确保每个文件具有唯一的名称
    //[name]代表main和app
    filename: '[name].js'
}
```

### mode

mode 是打包的模式，有 development(生产环境)和 production(发布环境)，默认是发布环境。

- production：代码会被压缩，项目发布上线采用该模式
- development：代码不会被压缩。项目还在开发阶段使用该模式
