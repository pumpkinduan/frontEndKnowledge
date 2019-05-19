//nodeJS中提供了一个net模块,用于实现TCP服务器与TCP客户端之间的通信
//0.引入该核心模块
let net = require('net');
//1.创建TCP服务器
let server = net.createServer();

//2.事件connection,当客户端与服务端建立连接时触发回调,
//并自动创建一个net.Socket类的对象指定为该回调函数的参数
//这个socket端口对象与客户端进行连接
server.on('connection', (socket) => {
	//socket参数为该TCP服务器要监听的端口对象
	//通过该socket实现接受客户端的数据并处理后给客户端发送数据
	console.log('已经与客户端连接上了...')
	console.log(socket.address())
	//读取客户端发送过来的数据,并触发回调函数
	socket.on('data', (data) => {
		console.log('已接受到客户端传来的数据---' + data)
		//向客户端发送数据
		socket.write('确认数据--' + data)

		//发送客户端最后的信息后关闭与客户端的相连
		// socket.end('再见,client')
	})
	//监听客户端的连接断开
	socket.on('end', () => {
		console.log('客户端已关闭连接!!!')
	})
})

//3.listening事件, 表示TCP服务器正在监听时所需要执行的处理
server.on('listening', () => {
	console.log('服务器开始监听...')
	let addr = server.address()
	console.log('服务器监听的地址：' + addr.address)
	console.log('服务器监听的port：' + addr.port)
})

//4.listen方法,让TCP服务器监听指定的ip地址+端口号
//也就是说 TCP服务器 会占用地址下的这个该端口号
//其他服务器无法在监听这个地址下的这个端口号了
//ru:另外开器server1服务器,监听ta,则会报错
server.listen(12306, 'localhost')