const mysql = require('mysql');

function createConnection() {
    //每次都连接都创建一个新的连接对象,避免在每次查询完数据库后end()关闭连接时,再次重新连接不上数据库的情况
    return mysql.createConnection({//创建用于与数据库服务器连接的对象
        host: '127.0.0.1',//指定数据库服务器的地址
        port: '3306',
        user: 'root',
        password: 'pumpkin330',
        database: 'school'//指定需要连接的数据库名,我在数据库服务器下创建了叫 school 的数据库
    });
}

module.exports.createConnection = createConnection;