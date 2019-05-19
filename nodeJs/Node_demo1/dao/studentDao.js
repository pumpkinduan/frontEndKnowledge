let connection = require('./DBUtil.js');
connection.connect();
function getStudentbyPage(offset, limit, cb) {
    let mysqlState = 'select * from student limit ?, ?';
    let params = [offset, limit];
    connection.query(mysqlState, params, function(error, result) {
        if ( error ) {
            return;
        }
        cb(result);
    })
    connection.end();
}
module.exports = {
    'getStudentPage': getStudentbyPage
}