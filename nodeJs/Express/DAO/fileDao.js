var dbtuil = require('./dbutil.js');

function uploadFile(file, success) {
    let connection = dbtuil.createConnection();
    connection.connect();
    let insertSql = 'insert into file_list (`originalname`, `path`, `size`, `filename`) values(?, ?, ?, ?);';
    var params = [file.originalname, file.path, file.size, file.filename];
    connection.query(insertSql, params, function(error, result) {
        if ( error ) { throw new Error(error) };
        success('successful');
    })
}

module.exports = {
    'uploadFile': uploadFile
}