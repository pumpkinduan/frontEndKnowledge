let net = require('net');
//连接localhost地址的12306端口号所绑定的那个TCP服务器
//连接完毕后触发回调函数的执行
//socket用来与服务器通信,是与服务器相连的端口对象	`
let socket = net.connect(12306, 'localhost', () => {
	console.log('已经连接服务器...')
	//用于向TCP服务器传递数据
	socket.write('hello TCP server')

	//发送服务器端最后的信息后关闭与服务器的相连
	// socket.end('goodbye,server')
})

console.log(socket.address())
//用于监听服务器发送过来的数据
socket.on('data', (data) => {
	console.log('已经接受到服务器发送过来的消息:' + data)
})

//监听服务器端的连接断开
socket.on('end', () => {
	console.log('服务器已关闭连接')
})