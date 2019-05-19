//1.使用require方法加载fs核心模块
let fs = require('fs');
const path = require('path')
//2.读取文件
  //fs.readFile(path, callback)
/*  第一个参数就是读取的文件路径
  第二个参数是一个回调函数
  回调函数有两个参数,分别为error, data
  成功--> data = 数据
  		  error = null

  失败--> data = null
        error = 错误对象*/
fs.readFile(path.join(__dirname, './hello.txt'), (error, data) => {
  if ( error ) {
    console.log(error)
    return ;
  }
	console.log(data)//<Buffer e4 bd a0 e5 a5 bd 2c 6e 6f 64 65 2e 6a 73 21 21 21>
	//文件中其实都是以二进制数据 0 1
	//但这里是因为二进制转为16进制数据了,但还是不利于阅读
	//可利用toString()转为字符串
	console.log(data.toString())//你好,node.js!!!
	console.log(typeof data.toString())//string!!!
 
})