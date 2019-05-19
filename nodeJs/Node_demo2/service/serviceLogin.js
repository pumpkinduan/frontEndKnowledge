let loginDao = require('../DAO/loginDAO');

function login(number, callback) {

    loginDao.login(number,callback);
}

module.exports.login = login;
