var path = new Map();
var url = require('url');
var fs = require('fs');
function getPic(req, res) {
    var params = url.parse(req.url, true).query;
    console.log(params.path);
    fs.readFile(params.path, function(err, data) {
        if (err) {throw new Error(err)}
        res.send(data);
    }); 
}
path.set('/getPic', getPic);
module.exports.path = path;