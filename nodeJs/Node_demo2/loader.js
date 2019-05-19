/**
 * 该文件的目的
 * 0.加载路径
 * 1.读取web文件夹目录下的所有文件名
 * 2.将所有文件名挨个引用require加载,并且获取到各个文件导出的接口,将该接口存到map结构中
 * 3.实现一个url对应一个接口方法
 */
let fs = require('fs');
let globalConf = require('./config.js');
let pathMap = new Map();//用来保存url对应的接口方法
let files = fs.readdirSync(globalConf.web_path);//用于读取指定目录路径下的所有文件,返回一个数组,成员为字符串形式的文件名,同步的
for ( let i = 0; i < files.length; i ++ ) {
	let temp = require(globalConf.web_path + '/' + files[i]).path;
	// map结构被for of遍历时返回的是数组
	for ( let [key,value] of temp ) {
		if ( !pathMap.get(key) ) {//避免被其他文件的具有相同导出接口名覆盖
			pathMap.set(key, value)
		} else {
			throw new Error('url异常:' + key)//避免其他文件具有相同导出接口名
		}
	}
}
module.exports = pathMap;