const connection = require('./dbutil');
function queryAllStudent(callback) {
    connection.connect();
    let querySql = "select * from student;"; //sql查询语句
    connection.query(querySql, function(error, result) {
        if ( error ) {
            callback(error, result);
            return console.log(error);
        }
        callback(error, result)//将数据库中查询的数据返回出去
        // console.log(result)
    })

    //记得每次查完数据库要关闭与数据库的连接
    connection.end();
}

function queryStudentByClassAndAge(classNumber, age) {
    connection.connect();
    let querySql = "select * from student where class= ? and age =?;"; // ?代表此处要传入参数,防止sql注入
    const params = [classNumber, age];//将参数值收集起来
    // connection.query(sql, values, callback)
    // sql： sql参数值字符串语句,必须传递
    // values: 一个数组或是具体的参数值,用于存放sql参数值字符串所使用的参数的参数值
    //querySql = "select * from student where class= " + classNumber + "and + age = " + age +";"
    // callback: 用于指定执行数据的增删改查操作结束时执行的回调函数
    connection.query(querySql, params, function(error, result) {
        if ( error ) {
            return console.log(error);
        }
        console.log(result)
    })
    connection.end();
}
// queryAllStudent();
// queryStudentByClassAndAge(1601, 21);
module.exports = {//导出给service用的
    queryAllStudent,
    queryStudentByClassAndAge
}