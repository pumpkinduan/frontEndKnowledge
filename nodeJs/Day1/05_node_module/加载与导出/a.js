//require的作用
//1.加载文件模块并执行里面的代码
//2.拿到被加载的文件模块导出的接口对象,我们可以拿变量来接受这个接口对象

//每个文件模块中都提供了一个导出的接口对象:modules.exports === exports(默认为一个空对象),

let bExport = require('./b.js')
console.log(bExport)//{}由于a.js没有给自己的exports对象添加成员,故为空
// console.log(arguments)
console.log(module)
console.log(module.paths)
// let cExport = require('./c.js');
// console.log(cExport)
// console.log(foo)