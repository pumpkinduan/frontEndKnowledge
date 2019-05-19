let dbutil = require('./dbutil');

function loginDAO(number, callback) {
    let connection = dbutil.createConnection();
    let sql = 'select * from student where number = ?';
    connection.connect();
    connection.query(sql, number, function(error, result) {
        if (error) {
            return console.log(result);
        }
        callback(result);
    })
    connection.end();
}

module.exports.login = loginDAO