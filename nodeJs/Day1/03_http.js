//node中专门提供了一个核心模块http
//HTTP模块就是帮自己创建编写服务器的

//1. 加载http核心模块
let http = require('http');

//2.使用 http.createServer() 创建一个web服务器
//  返回一个Server实例
let server = http.createServer();
//3.服务器目的? 接受请求 处理请求 发送响应
// 提供服务,数据的服务

//注册request 请求事件,该事件的处理函数接受两个参数(Request, Response)
//Request: 请求对象-->获取客户端的一些请求信息,如路径
//Response: 响应对象-->给客户端发送响应信息
//当客户端发送请求,就会自动触发服务器的request事件,触发对应的回调函数的执行
server.on('request', (request, response) => {
	console.log('收到客户端的请求了')
	console.log('请求路径为' + request.url)
	//Response: 响应对象有一个方法write()-->用来给客户端发送响应信息,并显示在页面上
	//write可以使用多次,但是最后一定要使用end结束响应,否则客户端会一直等待


	// 请求不同路径时响应不同的结果
	if ( request.url === '/index' ) {
		response.write('who i am' + '   ' +'index')
	}else if ( request.url === '/login' ) {
		response.write('where i come from'+ '   ' + 'login')
	}else if ( request.url === '/register' ) {
		response.write('where i wanna go' +' '+ 'register')
	} 
	// response.write('我是谁')
	//注意: 当我们发送的响应信息为中文时,浏览器会发生乱码
	//服务器端默认发送的数据其实是 utf-8 编码的内容,但是浏览器不知道服务器响应内容是编码后的,所以它会按照os默认编码去解析
	//中文os默认是gbk编码

	//使得浏览器按照utf-8编码来正确解析响应内容
	//text/plain:浏览器会按照普通文本来解析渲染响应内容
	//text/html:浏览器会按照超文本来解析渲染响应内容
	response.setHeader('Content-Type', 'text/plain; charset=utf-8');
	response.end();//告诉客户端,我的话说完了,可以呈现给用户了,也就是在页面上显示
	//当前服务器无论是什么请求路径都只能响应一种结果

})


//4.绑定端口号,启动服务器
server.listen({
	host: '127.0.0.1',
	port: 8888
}, () => {
	console.log('服务器启动成功,请在浏览器中访问http://localhost:8888')
})