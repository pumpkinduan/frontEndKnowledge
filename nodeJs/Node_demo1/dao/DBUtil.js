let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'pumpkin330',
    database: 'school'
});
module.exports = connection;