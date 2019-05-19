let http = require('http');
let fs = require('fs');
http.createServer(function(req, res) {
    if ( req.url == '/page/index.html' ) {
        fs.readFile('./page/index.html', (err, data) => {
            if (err) { return console.log(err)}
            res.writeHead(200, {'content-type': 'text/html','charset': 'utf-8'})
            res.end(data.toString());
        })
    }
    if ( req.url == '/test-cookie.html' ) {
        fs.readFile('./test-cookie.html', (err, data) => {
            if (err) { return console.log(err)}
            res.writeHead(200, {'content-type': 'text/html','charset': 'utf-8'})
            res.end(data.toString());
        })
    }
    if ( req.url == '/page/index1.html' ) {
        fs.readFile('./page/index1.html', (err, data) => {
            console.log(data)
            if (err) { return console.log(err)}
            res.writeHead(200, {'content-type': 'text/html','charset': 'utf-8'})
            res.end(data.toString());
        })
    }
    
}).listen(12306)