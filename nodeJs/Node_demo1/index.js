let http = require('http');
let url = require('url');
let fs = require('fs');
let loader = require('./loader.js');
http.createServer(function(request, response) {
    var pathName = url.parse(request.url).pathname;
    var is = isStatic(pathName);
    if ( is ) {
        try {
            var data = fs.readFileSync('./page' + pathName);
            response.writeHead(200);
            response.write(data.toString());
            response.end();
        } catch(e) {
            response.writeHead(404);
            response.write('<html><body><h1>404 Not Found</h1></body></html>');
            response.end();
        }       
    } else {
        //getStudentPage--pathName
        //getStudentPage/a/b -- loader
        for ( var temp of loader ) {//让路径多样化
            try {
                if ( new RegExp('^' + temp[0] + '$').test(pathName) ) {
                    temp[1](request, response);
                }
            } catch(e) {
                response.end('500 bad server')
            } 
       }       
    }
}).listen(8888);
function isStatic(url) {
    var arr = ['.html', '.css', '.js', '.jpg', '.jpeg', '.png'];
    var len = arr.length;
    for (var i = 0; i < len; i ++) {
        if ( url.indexOf(arr[i]) === ( url.length - arr[i].length ) ) {
            return true;
        }
    }
    return false;
}