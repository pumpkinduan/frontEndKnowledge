let http = require('http');
let server = http.createServer();

server.on('request', (req, res) => {
	console.log('收到客户端的请求了')
	console.log('请求我的客户端的端口号是' + req.socket.remotePort)
	console.log('请求我的客户端的ip地址是' + req.socket.remoteAddress)
	console.log('本地ip地址是' + req.socket.localAddress)
	console.log('本地端口号是' + req.socket.localPort)
	//req.socket.remotePort 用数字表示的远程端口

	//可以直接在end方法上写入需要响应的信息,简化操作
	// res.end('不用write方法发送响应信息给客户端');

	//注意:响应信息只能是字符串或二进制数据,其他均报错
	let url = req.url;
	let products = [
		{
			name: 'apple'
		}, 
		{
			name: 'orange'
		},
		{
			name: 'banana'
		}
	]
	if( url === '/' ) {
		res.end('home page');
	}else if ( url === '/products') {
		res.end(JSON.stringify(products))
	}else {
		res.end('404 NOT Found')
	}
			
			
})

server.listen(9999, () => {
	console.log('启动服务器,请访问http://localhost:9999')
})