//JSON.stringify将传入的第一个参数解析为JSON字符串格式,无论是什么类型的值,除了undefined
var obj = {name: 'pum',nikeName: {age: 17}};
var arr = [1,2,3, {age: 12}];
var num = 12;
// console.log(JSON.stringify(obj))//'{"name":"pum","nikeName":{"age":17}}'
// console.log(typeof JSON.stringify(arr[0]))//string
// console.log(JSON.stringify(arr))
// console.log(typeof JSON.stringify(num))//string
// console.log(typeof JSON.stringify(undefined))//undefined
// console.log(typeof JSON.stringify(null))//string
// console.log(typeof JSON.stringify(Infinity))//string
// console.log(JSON.stringify(Infinity))//'null'
// console.log(JSON.stringify(function() {return {name: '22'}}))//undefined
//模拟实现,利用了递归思想
function jsonStringify(data) {
    var _toString = Object.prototype.toString;
    var type = typeof data;
    var isArray = Array.isArray || function(val) { return _toString.call(val) === '[objcet Array]' };
    var simpleType = ['number', 'boolean', 'string'];
    if ( data === null ) { return 'null'};
    if ( type === 'number' ) { return isFinite(data) ? data.toString() : 'null'; }
    if ( simpleType.indexOf( type ) !== -1 ) {
        return '"' + data.toString() + '"';
    }else if (type === 'function') {
        return undefined;
    }else if ( type === 'object' ) {
        if ( isArray(data) ) {
           var len = data.length;
           var res = '[';
           for (var i = 0; i < len; i++) {
                if (i == 0) { 
                    res += '' + data[i];
                }else {
                    res += ',' + jsonStringify( data[i] );
                }
                //[1,2,3,4]
                //[1, --> [1,2, --> [1,2,3, 
           }
           return res + ']';
        } else if ( data.toString() === '[object Object]' ) {
            for ( var prop in data ) {
                var temp = [];
                if ( data.hasOwnProperty(prop) ) {
                    temp.push( jsonStringify(prop) + ':' + jsonStringify(data[prop]) );
                }
            }
            return '{' + temp.join(',') +'}';
        }
    }
}
console.log(jsonStringify(obj))//'{"name":"pum","nikeName":{"age":17}}'
console.log(typeof jsonStringify(arr[0]))//string
console.log(jsonStringify(arr))//[1,2,3,{"age":12}]
console.log(typeof jsonStringify(num))//string
console.log(typeof jsonStringify(undefined))//undefined
console.log(typeof jsonStringify(null))//string
console.log(typeof jsonStringify(Infinity))//string
console.log(jsonStringify(Infinity))//'null'
console.log(jsonStringify(function() {return {name: '22'}}))//undefined
