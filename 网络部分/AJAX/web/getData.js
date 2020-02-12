let path = new Map();
let url = require('url');
function getData(req, res) {
    let params = url.parse(req.url, true).query;
    let data = params;
    console.log(data)
    res.writeHead(200, 'OK', {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Expose-Headers': 'content-type, x-requested-with'});
    if ( params.cb ) {
        res.end(params.cb + '(' + JSON.stringify(data) + ')');//返回jsonp格式,浏览器会直接将返回结果当作js代码执行,因为是script发来的请求
    } else {
        res.end(JSON.stringify(params));//common json 
    }
}
path.set('/getData', getData);
exports.path = path;