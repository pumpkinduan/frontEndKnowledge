### webpack是什么
- `webpack`是一个现代`JavaScript`应用程序的静态模块打包器，当`webpack`处理应用程序时，会递归构建一个依赖关系图，其中包含应用程序所需的各个模块，然后将这些模块打包成一个或多个文件输出。  
- 最开始，它只能打包JS文件，随着它的发展壮大，它还能打包CSS、图片等等文件，功能十分的强大。  
- 主要由`entry` `output` `loader` `plugins`四个部分组成
### webpack 4+ 版本的安装
在当前项目中安装  
```js
npm install webpack webpack-cli -D 
// 或是利用yarn安装
yarn add webpack webpack-cli -D
```  
#### webpack-cli
在4.x+的版本，必须安装webpack-cli，它使得我们可以在命令行里使用webpack命令
#### npx
项目内安装webpack后，会有一个webpack自带的命令`npx`，助于我们在当前项目的`node_modules`中查找相应的包。
### 打包输出的命令
在当前项目的根目录下，使用`npx webpack`，它会默认去找`src/index.js`文件，并打包输出到`dist/main.js`文件中，当然我们可以自己手动配置它的打包机制
### 手动配置webpack
webpack 4.x+是支持0配置的，不过这是比较弱鸡的，所以一般我们要手动配置  
在根目录下新建 `webpack.config.js`(默认的文件配置名)，当然，也可以手动设置配置的文件名，`npx webpack --config '文件名'`，文件名在根目录下  
如果不想输入`npx webpack --config '文件名'`这么长的命令，也可以在`package.json`文件中配置`"scripts": { "build": "npx webpack --config webpack.config.js" }`，这样，可以输入`npm run build`来根据指定的配置文件来执行打包了
