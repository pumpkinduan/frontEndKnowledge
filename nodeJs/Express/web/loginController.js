var path = new Map();
var url = require('url');
var studentDao = require('../DAO/studentDao.js');
function login(req, res) {
    var params = url.parse(req.url, true).query;
    studentDao.queryStudentByNum(params.number, function(result) {
        if (result && result.length >= 1 && result[0].password == params.password ) {
            res.cookie('id', result[0].id);
            res.redirect('/index.html');
        } else {
            res.redirect('/login.html');
        }
    })
}
path.set('/login', login);
exports.path = path;