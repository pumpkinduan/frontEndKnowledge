let http = require('http');
let fs = require('fs');
let url = require('url');
let cb = fs.readdirSync('./web');
http.createServer(function(req, res) {
    let pathname =  url.parse(req.url).pathname;
    let params = url.parse(req.url, true).query;
    for ( var i = 0; i < cb.length; i ++ ) {
        var temp = require('./web/' + cb[i]).path;   
        temp.get(pathname)(req, res);
    }
}).listen(8888, () => {
    console.log('server is running at localhost:8888');
})