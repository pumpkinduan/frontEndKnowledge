//一个url对应一个接口方法
let path = new Map();
function getData1() {

}
path.set('/getData1', getData1);
module.exports.path = path;