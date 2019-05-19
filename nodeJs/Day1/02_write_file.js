let fs = require('fs');
//写文件
//第一个参数为: 文件路径
//第二个参数为: 文件内容
//第三个参数为: 回调函数-->直接受一个参数error
 /*成功--> 文件写入成功
  		  error = null

  失败--> 文件写入失败
  		  error = 错误对象*/
fs.writeFile('./hi.md', 'hi, I am NodeJs', (error) => {
	console.log(error)
	sconsole.log(thissnippet)
})