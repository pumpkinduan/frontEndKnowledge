//1.第一种,由于Function会动态解析字符串为js代码,并返回一个新的函数对象,内部代码即为解析后的js代码
var jsonStr = '{"name": "12"}';
var func = new Function('return' + jsonStr);
// console.log(func())//{ name: '12' }

// function jsonParse (jsonStr) {
//     return (new Function('return' + jsonStr))();
// }
// console.log(jsonParse(jsonStr))

//2.利用eval来解析
function jsonParse (jsonStr) {
    return eval( '('+ jsonStr +')');
} 
console.log(jsonParse(jsonStr))