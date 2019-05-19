//用来记录程序运行时的日志,便于开发者阅读,找bug
let fs = require('fs');
let globalConf = require('./config.js');
let logPath = globalConf.log_path + '/'; //需要自己手动添上,因为配置文件里默认没有添加上,而浏览器客户端请求时的文件名会自带这个所以没有添加
let logName = globalConf.log_name;
function log(data) {
	fs.appendFile(logPath + logName, '(' + data + new Date() + ')' + '\n', (error) => {
		if(error) {
			console.log('追加文件失败')
			console.log(error)
			return;
		}
		console.log('追加文件成功')
	})
}
module.exports = log