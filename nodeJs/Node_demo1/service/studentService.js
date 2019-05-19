let studentDao = require('../dao/studentDao.js');
function getStudentPage(offset, limit, cb) {
    studentDao.getStudentPage(offset, limit, cb);
}
module.exports = {
    getStudentPage
}