let net = require('net');
let fs = require('fs');
let server = net.createServer();
let globalConf = require('./config.js');
server.listen(globalConf.port, '127.0.0.1', () => {
	console.log('服务器已开启...')
})
server.on('connection', (socket) => {
	console.log('有新的客户端连接')
	socket.on('data', (data) => {
		// console.log(data.toString());
//以下是来自浏览器客户端发送过来的数据,这是完整的http请求头信息
//因为TCP连接是运输层的协议,是第二层,而http是应用层,是第一层
//所以在TCP这层上便可以对应用层的信息进行拦截,因为还没有到应用层进行数据的处理,所以我们看到的下列报文是最初始的
// 		GET / HTTP/1.1
//		Host: 127.0.0.1:5000
//		Connection: keep-alive
//		Cache-Control: max-age=0
//		Upgrade-Insecure-Requests: 1
//		User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
//		Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
//		Accept-Encoding: gzip, deflate, br
//		Accept-Language: zh-CN,zh;q=0.9
	
		// socket.write('hello chrome!!')//客户端报错,不接受服务器给出这样的response数据
		
		//需要写入这种报文格式,浏览器才会识别并解析
		// socket.write('HTTP 200OK\r\nContent-type:text/html\r\n\r\n<html><body>hello chrome</body></html>')
		
		let req = data.toString().split('\r\n')
		console.log(req);
		let url = req[0].split(' ')[1];
		if( url === '/' ) { url = '/index.html'};
		// fs.readFile(url, (error, data) => {
		// 	if ( error ) {
		// 		return socket.write('HTTP 404NotFound\r\n\r\n<html><body><h1>404 Not Found!!!</h1></body><html>');
		// 	}
		// 	// console.log(data.toString())
		// 	socket.write('HTTP 200OK\r\nContent-type:text/html\r\n\r\n' + data.toString())
		// })
		try {
			socket.write('HTTP 200OK\r\n\r\n');
			console.log(typeof fs.readFileSync(globalConf.basePath + url).toString())
			socket.write(fs.readFileSync(globalConf.basePath + url).toString())
			socket.write('222')
		} catch(e) {
			socket.write('HTTP 404NotFound\r\n\r\n<html><body><h1>404 Not Found!!!</h1></body><html>');
		}
		socket.end();
	})
})
server.on('listening', () => {
	console.log(server.address());
})