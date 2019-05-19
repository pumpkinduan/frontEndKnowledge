const studentDAO = require('../DAO/studentDAO');
function queryAllStudent(callback) {
    studentDAO.queryAllStudent(callback);
}
function queryStudentByClassAndAge() {
    studentDAO.queryStudentByClassAndAge();
}
module.exports = {
    queryAllStudent,
    queryStudentByClassAndAge
};