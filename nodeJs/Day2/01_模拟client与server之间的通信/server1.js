let net = require('net');
let server = net.createServer()

server.listen(12306, 'localhost', (socket) => {
	console.log('服务器开始监听')
})
server.on('error', (e) => {
	console.log(e)
	console.log(e.code)
	if( e.code === 'EADDRINUSE') {//error address in use
		console.log('地址及端口号被占用')
	}
})