const dbutil = require('./dbutil.js');
function queryAllStudent(success) {
    let connection = dbutil.createConnection();
    connection.connect();
    let sql = 'select * from student';
    connection.query(sql, function(err, result) {
        if ( err ) { throw new Error(err) }
        success(result);
    })
    connection.end();
}
function insertStudent(number, stu_class, name, age, birth, password, success) {
    let connection = dbutil.createConnection();
    connection.connect();
    let params = [number, stu_class, name, age, birth, password]
    let insertSql = 'insert into student (`number`, `class`, `name`, `age`, `birth`, `password`) values(?, ?, ?, ?, ?, ?)';
    connection.query(insertSql, params, function(err, result) {
        if ( err ) { throw new Error(err) }
        success(result);
    })
    connection.end();
}

function queryStudentByNum(stu_number, success) {
    let connection = dbutil.createConnection();
    connection.connect();
    let insertSql = `select * from student where number = ?;`
    connection.query(insertSql, stu_number, function(err, result) {
        if ( err ) { throw new Error(err) }
        success(result);
    })
    connection.end();
}
module.exports = {
    'queryAllStudent': queryAllStudent,
    'insertStudent': insertStudent,
    'queryStudentByNum': queryStudentByNum
}