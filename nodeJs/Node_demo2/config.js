//用来解析配置文件server.conf
let fs = require('fs');
let path = require('path');
let data = fs.readFileSync(path.join(__dirname, 'server.conf')).toString().split('\r\n');
let globalConf = {};
let reg = /(_path){1}$/g;
for ( let i = 0; i < data.length; i ++ ) {
	let tempConf = data[i].split('=');
	if( tempConf.length < 2 ) {
		continue;
	} else {
		globalConf[tempConf[0]] = tempConf[1];
	}
}
if ( globalConf.path_position === 'relative' ) {
	for ( var attr in globalConf ) {
		if ( reg.test(attr) ) {
			globalConf[attr] = '.' + globalConf[attr]
		}
	}
	// globalConf.page_path = __dirname + globalConf.page_path;//资源文件放置在当前路径下(congig.js)
	// globalConf.web_path = __dirname + globalConf.web_path;
	// globalConf.service_path = __dirname + globalConf.service_path;
} else {
	for ( var attr in globalConf ) {
		if ( reg.test(attr) ) {
			globalConf[attr] = __dirname + globalConf[attr]
		}
	}//可以随意放置静态资源,不过需要到.conf文件去配置下path,并且写全资源路径
}
 
if ( globalConf.static_file_type ) {
	globalConf.static_file_type = globalConf.static_file_type.split('|');
} else {
	throw new Error('缺失:static_file_type' )
}
module.exports = globalConf;