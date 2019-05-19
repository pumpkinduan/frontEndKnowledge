const serviceStudent = require('../service/serviceStudent');
const serviceLogin = require('../service/serviceLogin');
let url = require('url');
//该文件封装了一些函数,用来处理对应请求的url,并导出该接口
let path = new Map();
function getAllStudent(req, res) {
	serviceStudent.queryAllStudent(function(err, suc) {
		if( !err ) {
			console.log(suc)
			// res.end(suc)
			//The "chunk" argument must be one of type string or Buffer
			res.end(JSON.stringify(suc))
		}
	});
	// res.end('hello google')
}
//处理get请求
// function login(req, res) {
// 	let params = url.parse(req.url, true).query;
// 	serviceLogin.login(params.number,function(suc) {
// 		// console.log(suc)
// 		var result = '';
// 		if ( !suc || suc.length == 0 ) {
// 			res.writeHead(404);
// 			result = 'failed'; 
// 		} else {
// 			if ( suc[0].password === params.password ) {
// 				res.writeHead(200, {'Content-Type': 'application/json'});
// 				result = 'success';
// 			} else {
// 				res.writeHead(404);
// 				result = '密码错误';
// 			}
// 		}
// 		res.end(result);
// 	})
// }

//处理post请求
function login(req, res) {
	req.on('data', function(data) {//post请求发来的参数会保存到request的数据域中,故用data事件监听
		data = data.toString();
		var number = data.split('&')[0].split('=')[1];
		var password = data.split('&')[1].split('=')[1];
		var result = '';
		serviceLogin.login(number, function(suc) {
			if ( !suc || suc.length == 0 ) {
				res.writeHead(404);
				result = 'failed'; 
			} else {
				if ( suc[0].password === password ) {
					//登录成功后跳转到首页,我们要是知道了首页的url则不用登录就可以直接访问到首页
					//这不是我们想要的,所以我们采取了一种cookie手段,向浏览器端写入一小段信息

					//ajax技术:
					res.writeHead(200, {'Content-Type': 'application/json', 'set-cookie': 'id=' + number });
					result = 'success';

					 //form表单请求的技术: 登录成功后要重定向到首页,浏览器会自己处理在次访问我们设置的/index.html
					 //若不往响应头上添加到重定向地址,则form表单请求完后会把响应体的内容显示在当前页面上
					 /*  res.writeHead(302, {'location': '/index.html'});
					 *   result = 'success';
					 */
				} else {
					res.writeHead(404);
					result = '密码错误';
				}
			}
			res.end(result);
		})
	})
}
path.set('/getAllStudent', getAllStudent);
path.set('/login', login);
//自己的约定,一个controller导出一个map结构
module.exports.path = path;