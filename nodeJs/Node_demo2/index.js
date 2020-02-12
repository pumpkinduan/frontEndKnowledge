let http = require('http');
let url = require('url');//该模块用来解析url得到我们想要的url格式
let globalConf = require('./config.js');
let fs = require('fs');
let path = require('path');
let {pathMap} = require('./loader.js');
let log = require('./log');
let filters = require('./filter_loader.js');
let loader = require('./loader.js');
http.createServer((req, res) => {
	let pathName = url.parse(req.url).pathname;//请求路径
	if( pathName === '/' ) {pathName = '/index.html'}
	const extName = path.extname(pathName);//后缀名
	console.log(extName)
	let isStatic = isStaticRequest(pathName);
	log(pathName);//print logs...
	//请求资源之前进行拦截处理
	// for ( var i = 0 ; i < filters.length; i ++ ) {
	// 	var flag = filters[i](req, res);
	// 	if ( !flag ) {
	// 		return false;
	// 	}
	// }
	if ( isStatic ) {
		//请求的为静态资源
		//处理请求后返回响应给浏览器客户端
		fs.readFile(globalConf.page_path + pathName, (error, data) => {
			if( error ) {
				console.log('请求错误' + error);
				return res.end('404 Not Found');
			}
			setContentType(extName, (contentType) => {
				res.writeHead(200, 'OK', { "content-type": contentType });
				res.end(data.toString());
			})
		})
	} else {
		//请求的是动态资源
		//利用loader加载对应url的接口方法
		// if ( pathMap.get(pathName) ) {
		// 	try {
		// 		pathMap.get(pathName)(req, res);
		// 		console.log('客户端请求了动态资源...');
		// 	} catch(e) {
		// 		res.end('500 server异常');
		// 	}
		// }
		 for ( var temp of loader ) {//让路径多样化
            try {
                if ( new RegExp('^' + temp[0] + '$').test(pathName) ) {
                    temp[1](req, res);
                }
            } catch(e) {
                res.end('500 bad server')
            } 
       } 
	}
}).listen(globalConf.port, () => {
	console.log('server is running...')
})
//判断是否是请求静态资源
function isStaticRequest(pathName) {
	let opt = globalConf.static_file_type;
	let len = opt.length;
	for ( let i = 0; i < len; i ++ ) {
		if ( pathName.indexOf(opt[i]) === pathName.length - opt[i].length) {//请求路径必须是以.html,.js等结尾静态资源路径
			return true;//是静态资源
		}
 	}
}
//根据请求路径的后缀名，给相应的响应头设置对应的content-type
function setContentType(extName, callBack) {
	let MIMEJson = fs.readFile('./MIME.json', (err, data) => {
		if ( err ) throw err;
		const mimeObj = JSON.parse(data.toString());
		callBack(mimeObj[extName])
	});
}