/*
	通过网络发送文件
	  1.发送的并不是文件,本质上来说是文件内的内容
	  2.当浏览器收到服务器的响应内容后,会根据响应头部的Content-type值进行相应的解析
	  3.浏览器默认可以识别解析来自为二进制或字符串的响应内容,若我们不设置Content-type的值,发送的内容为.html文件,浏览器也是可以正常渲染
*/

//require的作用
//1.加载文件模块并执行里面的代码
//2.拿到被加载的文件模块导出的接口对象,我们可以拿变量来接受这个接口对象

//提问: 为什么require,modules.exports和exports能拿来直接用呢?