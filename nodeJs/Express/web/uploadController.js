var path = new Map();
var fileDao = require('../DAO/fileDao.js');
function upload(req, res, next) {
    fileDao.uploadFile(req.file, function(result) {
        res.end(req.file.path);
    })
}
path.set('/upload', upload)
module.exports.path = path;