let fs = require('fs');
let data = fs.readFileSync(__dirname + '/server.conf').toString().split('\r\n');
let globalConf = {};
let length = data.length;
for (let i = 0; i < length; i ++) {
	let tempConf = data[i].split('=');
	if( tempConf.length < 2 ) {
		continue;
	} else {
		globalConf[tempConf[0]] = tempConf[1]; 
	}
}
if ( globalConf.base_position === 'relative' ) {//相对路径
	globalConf.basePath = __dirname + globalConf.path;
} else {
	globalConf.basePath = globalConf.path;
}
module.exports = globalConf;