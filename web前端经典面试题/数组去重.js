//Set
var arr = [1,2,4,5,5,6,6,6];
// var set = new Set();
// for (var i = 0; i < arr.length; i ++) {
//     set.add(arr[i]);
// }
// console.log([...set]);


//对象
// var obj = {};
// var newArr = [];
// for (var i = 0; i < arr.length; i ++) {
//     if ( !obj[arr[i]] ) {
//         obj[arr[i]] = arr[i];
//         newArr.push(arr[i]);
//     }
// }
// console.log(newArr)

//尾递归
// for (var i = arr.length - 1; i >= 0; i --) {
//     if( arr[i] == arr[i - 1] ) {
//         arr.splice(i, 1);
//     }
// }
// console.log(arr)

//一行代码搞定
console.log(Array.from(new Set(arr)))