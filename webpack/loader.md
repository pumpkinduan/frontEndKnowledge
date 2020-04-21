### loader 的定义

> 用于对模块中的源代码进行转换，loader 可以使你在`import`和`require`模块时预处理文件，它还可以将文件从不同的语言转换为 JavaScript，或将内联图像转换为 data URL(base64 格式)

简单说就是，当需要处理非 JS 文件时，需要指定一个或多个合适的 loader 对文件进行转换，最终转换成一个个的 JS 文件

#### loader 的执行原理

1. 配置好的 loader 的执行顺序是从右往左，从下至上，最后一个 loader 最先执行，第一个 loader 最后执行，不过也可以通过设置`force: pre`来让当前 loader 靠前执行，设置`force: post`来让当前 loader 靠后执行
2. 第一个执行的 loader 会接受源文件内容作为参数，其他 loader 接受前一个 loader 处理后的返回值作为参数，最后执行的 loader 会返回此模块文件的 JS 源码

### 常见的 loader 配置

常见的 loader 有 css-loader, style-loader, file-loader, url-loader, vue-loader, postcss-loader, less/sass/stylus-loader......

#### 打包图片的 loader

##### file-loader

当我们在 JS 文件中需要引入图片时，需要写入图片的字符串路径，这时候，webpack 并不会处理该路径，所以打包后你会得不到正确的图片路径，导致图片无法显示出来，因为打包后图片所在的路径会发生改变，默认是`dist`目录下

```js
var img = new Image();
ims.src = "./img/logo.png"; // 不会处理该路径，会原样输出
document.body.appendChild(img);
```

若想让图片的路径得到正确引用，需要利用`import/require()`来加载路径，并配置 file-loader 进行解析。  
file-loader 会将`import/require()`所指定加载的文件路径进行解析，并生成一个新的文件到 dist 目录下，并返回该文件目前所在的路径

```js
// 图片处理
module: {
  rules: [
    {
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: "file-loader",
        options: {
          // 图片打包出来的后缀名与原来的一样
          name: "[name]_[hash].[ext]",
        },
      },
    },
  ];
}
```

```js
// 下面的图片就可以正常显示了
import logo from "./img/logo.png"; // file-loader会处理该图片，并返回正确的路径给logo变量
var img = new Image();
ims.src = logo;
document.body.appendChild(img);
```

##### url-loader

将文件打包为 base64 编码格式，适用于图片特别小的时候(4kb 以下)，也可以配置一个`limit`来进行限制，文件大小超过该限制时会选择 file-loader 进行处理

```js
// 图片处理
module: {
  rules: [
    {
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          // 图片大小小于8194字节(8kb)时进行base64编码输出
          // 大于则用file-loader处理
          limit: "8192",
        },
      },
    },
  ];
}
```

#### 打包 css 样式文件

```js
{
    test: /\.css$/,
    // loader的执行从右往左，先使用css-loader，在使用style-laoder
    use: ['sytle-loader', 'css-loader']
}
```

首先使用 css-loader 解析`@import`或`url()`语法导入的 css 文件，将导入的 css 样式整合到一起(没有这个 loader 则无法解析这类语句)，最后生成一个 JS 模块文件，该文件交给 style-loader，它处理后会将最终的 css 代码整合到 style 标签中，然后在放到 head 标签中

#### 使用 less

```js
use: [
  "style-loader", // creates style nodes from JS strings
  "css-loader", // translates CSS into CommonJS
  "sass-loader", // compiles Less to CSS
];
```
#### postcss-loader
它负责进一步处理 CSS 文件，比如添加浏览器前缀，压缩 CSS 等
```js
use: [
  "style-loader", // creates style nodes from JS strings
  "css-loader", // translates CSS into CommonJS
  "postcss-loader", // compiles Less to CSS
];
```
需要在根目录下创建一个`postcss.config.js`文件进行配置
```js
module.exports = {
    // 借助autoprefixer插件自动添加浏览器前缀
    // cssnano优化css代码，如压缩，去掉注释等等
    plugins: [
        require('autoprefixer'),
         require('cssnano') 
    ]
}
```