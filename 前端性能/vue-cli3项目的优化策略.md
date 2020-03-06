### 项目优化策略主要步骤
1. 生成打包报告，可以使用`vue ui`开启GUI图形化界面进行查看，很方便
2. 第三方库启用CDN，通过配置webpack的externals节点
3. Element-UI组件按需加载，其他UI库类似
4. 路由懒加载
5. 首页内容定制，可根据自己的需求，分别为生产环境和开发环境作不同的首页页面
#### 第三方库启用CDN
通过import导入的第三方依赖包最终会被合并到同一个文件中去，导致一个包文件的体积过大，可以通过webpack的externals节点，来配置并加载外部CDN资源
1. 第一步在`vue.config.js`中进行配置
```js
module.exports = {
    chainWebpack: config => {
        // 生产模式
        config.when(isProduction, config => {
            /*
            凡是声明在externals中的第三方依赖包，都不会被webpack打包输出，而是在window全局对象上去读取相关的包，这时候就需要第二步了
            */
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                nprogress: 'NProgress'
            })
            config.plugin('html').tap(args => {
                args[0].isProd = true;
                return args;
            })
        })

        //开发模式
        config.when(!isProduction, config => {
            config.plugin('html').tap(args => {
                args[0].isProd = false;
                return args;
            })
        })
    }
}
```
2. 第二步
在`<head></head>`标签中用link需要加载的CND资源，并用模板语法进行相应的逻辑处理
```html
  <% if(htmlWebpackPlugin.options.isProd) {%>
  <!-- nprogress的样式表 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css">
  <!-- 采用cdn方式引入的js文件 -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js"></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://cdn.bootcss.com/vue/2.6.11/vue.min.js"></script>
  <script src="https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js"></script>
  <% } %>
```

#### 路由懒加载
当打包构建项目时，JS包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了，这叫**路由懒加载**

*具体需要3步*
1. 安装 `babel/plugin-syntax-dynamic-import`包
2. 在`babel.config.js`配置文件中声明该插件，如下：
```js
module.exports = {
  presets: [
    ["@vue/app", {
      "modules": false
    }]
  ],
  plugins: [
    //路由的懒加载所依赖的babel插件
    "@babel/plugin-syntax-dynamic-import"
  ]
}
```
3. 将路由改为按需加载的形式，如下：
```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```
Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。
上面的组件都会被组合到相同的js文件中去，也就是都会在group-foo.js文件中