var path = new Map();
var studentDao = require('../DAO/studentDao.js');
var url = require('url');
function getAllStudent(req, res) {
    studentDao.queryAllStudent(function(result) {
        res.writeHead(200, {'Content-Type': 'text/plain','char-set': 'utf-8'});
        res.end(JSON.stringify(result));
    });
}  
function addStudent(req, res) {
    var params = url.parse(req.url, true).query;
    studentDao.insertStudent(params.number, params.class, params.name, params.age, params.birth, params.password, function(result) {
        res.writeHead(200, {'Content-Type': 'text/plain','char-set': 'utf-8'});
        res.write('add successfully');
        res.end(JSON.stringify(result));
    });
}   

path.set('api/getData', getAllStudent);
path.set('api/addStudent', addStudent);
exports.path = path;