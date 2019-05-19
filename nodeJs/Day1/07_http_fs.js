//图片不需要指定编码格式,一般只需字符数据才需要指定编码格式
//对于文本数据,在发送响应数据给客户端时最好加上charset=utf-8防止中文乱码
//setHeader('Content-type', 'charset=utf-8');
let http = require('http');

let fs = require('fs');

let server = http.createServer();

server.on('request', (req, res) => {
	console.log('接受到客服端的请求了')
	if( req.url === '/' ) {
		res.setHeader('Content-type', 'text/html; charset=utf-8');
		fs.readFile('./views/index.html' ,(error, data) => {
			if( error ) {
				console.log('读取文件失败了');
			}else {
				console.log(data);
				// data为二进制数据
				res.end(data.toString());
			}
		})
	}
})

server.listen(3000, () => {
	console.log('server is running!!!');
})