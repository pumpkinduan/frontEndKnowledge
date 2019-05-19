//拦截器: 避免接口被随意访问;
let url = require('url');
let globalConf = require('../config.js');
function loginFilter(request, response) {//登录页面的拦截器
    let pathName = url.parse(request.url).pathname;
    if ( pathName === '/login' || pathName === '/login.html' || isStaticRequest(pathName) ) {
        return true;//允许访问
    }
    if ( request.headers.cookie ) {//避免cookie没有的报错
        let cookies = request.headers.cookie.split(';');
        for ( var i = 0; i < cookies.length; i ++ ) {
            if ( cookies[i].trim().split('=')[0] == 'id' ) {
                return true;//登录后允许访问资源,因为每次的登录成功都会写入一个名为id的cookie
            }
        }
    }
    response.writeHead(302, {'location': './login.html'});//没有登录就每次 都跳转到登录页面
    response.end();
    return false;
}
function isStaticRequest(pathName) {
	let opt = globalConf.static_file_type;
	let len = opt.length;
	for ( let i = 0; i < len; i ++ ) {
        if ( opt[i] == '.html' || '.ico') { continue; }//不允许随意访问html页面文件
		if ( pathName.indexOf(opt[i]) === pathName.length - opt[i].length) {//请求路径必须是以.html,.js等结尾静态资源路径
			return true;//是静态资源
		}
 	}
}
module.exports = loginFilter;