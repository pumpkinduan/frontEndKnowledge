let studentService = require('../service/studentService.js');
let path = new Map();
let url = require('url');
function getStudentPage(req, res) {
    let params = url.parse(req.url, true).query;
    if (params && params.offset && params.limit) {
        studentService.getStudentPage(parseInt(params.offset), parseInt(params.limit), function(result) {
            res.writeHead(200, {'Content-Type': 'application/json', 'charset': 'utf-8'})
            res.write(JSON.stringify(result))
            res.end();
        });
    } else {
        throw new Error('params are mistaked');
    }
}
path.set('/getStudentPage', getStudentPage)
module.exports = path;