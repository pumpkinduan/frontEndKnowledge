### 在 webpack 中有三种方法可以解决跨域问题

#### 1.通过代理的方式

将请求代理到 express 服务器上

```js
devServer: {
    proxy: {
        '/api': {
            target: 'http://localhost:3000', //服务器地址
            pathRewrite: { //改写路径
                '/api': '/'
            }
            // 例如
            // 前端发出的请求: http://localhost:8080/api/user
            // 后端提高的接口: http://localhost:3000/user
        }
    }
  },
```

#### 2.没有服务器

如果没有服务器, 前端只是想 mock 一些数据,利用内置的 before 钩子即可,在服务内部的所有其他中间件之前， 提供执行自定义中间件的功能

```js
devServer: {
     before(app) {
         // 等同于在webpack开启的localhost:8080服务器下提供了/user接口, 所以不存在跨域
        app.get('/user', (req, res) => {
            res.json({age: 18})
        })
    }
}
```

#### 3.有服务器,不通过代理

若是自己搭建了服务器,但是想在自己搭建的服务器下启动 webpack,也就是前后端在一起启动在一块,也可以解决跨域, 这需要用到`webpack-dev-middleware`中间件,并且在服务器端编写如下代码

```js
// 根目录下新建server.js
const express = require("express");
const app = express();
const middle = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config");
const webpack = require("webpack");
const complier = webpack(webpackConfig);
app.use(middle(complier));
app.get("/user", (req, res) => {
  res.json({ name: "南瓜" });
});
app.listen(3000, () => {
  console.log("server is running");
});
```
运行`node server.js`时,会开启3000端口服务,同时还会进行webpack的打包,输入`localhost:3000/user`可以访问到`"{ name: "南瓜" }"`数据,这相当于前后端集成在一块了
