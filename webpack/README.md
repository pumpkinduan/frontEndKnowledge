### webpack 是什么

- `webpack`是一个现代`JavaScript`应用程序的静态模块打包器，当`webpack`处理应用程序时，会递归构建一个依赖关系图，其中包含应用程序所需的各个模块，然后将这些模块打包成一个或多个文件输出。
- 最开始，它只能打包 JS 文件，随着它的发展壮大，它还能打包 CSS、图片等等文件，功能十分的强大。
- 主要由`entry` `output` `loader` `plugins`四个部分组成

### webpack 4+ 版本的安装

在当前项目中安装

```js
npm install webpack webpack-cli -D
// 或是利用yarn安装
yarn add webpack webpack-cli -D
```

#### webpack-cli

在 4.x+的版本，必须安装 webpack-cli，它使得我们可以在命令行里使用 webpack 命令

#### npx

项目内安装 webpack 后，会有一个 webpack 自带的命令`npx`，助于我们在当前项目的`node_modules`中查找相应的包。

### 打包输出的命令

在当前项目的根目录下，使用`npx webpack`，它会默认去找`src/index.js`文件，并打包输出到`dist/main.js`文件中，当然我们可以自己手动配置它的打包机制

### 手动配置 webpack

webpack 4.x+是支持 0 配置的，不过这是比较弱鸡的，所以一般我们要手动配置  
在根目录下新建 `webpack.config.js`(默认的文件配置名)，当然，也可以手动设置配置的文件名，`npx webpack --config '文件名'`，文件名在根目录下  
如果不想输入`npx webpack --config '文件名'`这么长的命令，也可以在`package.json`文件中配置`"scripts": { "build": "npx webpack --config webpack.config.js" }`，这样，可以输入`npm run build`来根据指定的配置文件来执行打包了

### 注意点

当我们在src目录下执行'npx webpack'打包命令时,webpack 会进入 src 目录下查找 entry 指定的入口文件路径,例如:

```js
// 在src下有个index.js文件, 下面的写法就会报错,因为webpack会进入src目录下,下面的写法会让webpack从src/src/index.js下去找相应的文件
entry: "./src/index.js";

//应该写成
entry: "../src/index.js";
//或直接用绝对路径
entry: path.resolve(__dirname, "src/index.js");
```

### devtool配置
选择一种 source map 格式来增强调试过程, 选择合适的source map 格式利于调试错误,优化打包速度
- source-map: 全能, 会单独映射出一个源代码的文件,且可以定位到代码的每一个位置 => 行与列
- eval-source-map: 不会单独映射出一个源代码的文件,信息集成到了源文件中,不过可以定位到代码的每一个位置 => 行与列; 在生产环境中使用比较合适与全面
- cheap-eval-source-map: 类似`eval-source-map`,不过它只会映射行数,代码出错无法定位到具体那一列
- cheap-module-source-map: 不会产生列与行,可以产生单独的映射文件,用于保存起来后续用
- cheap-module-eval-source-map: 只产生映射的行,不会单独映射出一个源代码的文件以及列
### loader和plugin的区别
- loader操作的是文件,是对文件进行转换,如将.less => .css文件
- plugin则是一个扩展器,它会监听webpack打包过程中的某些节点,并乘机执行某些任务操作,改变输出结果

### happypack
可以利用`happypack`模块采用多线程的方式进行文件打包，不过速度会慢些
### webpack自带的优化
若使用的ES6模块语法(`import...from`)，在生产环境打包时：
- 会自动实现tree-shaking，剔除没有用到的代码
- webpack3以上，实现了作用域提升(scope hoisting)，尽可能的减少打包后代码中的函数声明，使得运行时代码插件的函数作用域减少，开销也随之变小