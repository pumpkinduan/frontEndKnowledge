let fs = require('fs');
let globalConf = require('./config.js');
let filterSet = [];//储存所有拦截器接口
let filters = fs.readdirSync(globalConf.filter_path);
for (var i = 0; i < filters.length; i ++) {
    let temp = require(globalConf.filter_path + '/' + filters[i]);
    if ( temp ) { filterSet.push(temp); }
}
module.exports = filterSet;