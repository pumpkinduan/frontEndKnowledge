//数组中只有一个成员出现了奇次,其余出现偶次数,找出它来
var arr = [2,2,3,1,1,3,5,4,4];


//ES6 set成员不可重复
/*
var set = new Set();
for (var i = 0; i < arr.length; i ++) {
    if ( set.has(arr[i]) ) {
        set.delete(arr[i]);
    } else {
        set.add(arr[i]);
    }
}
console.log(...set)
*/

//ES5 对象属性不可同名
/*
var obj = {};
for ( var i = 0; i < arr.length; i ++ ) {
    if ( obj[arr[i]] ) {
        delete obj[arr[i]]
    } else {
        obj[arr[i]] = 1;
    }
}
console.log(Object.keys(obj));
*/

//二进制的异或运算  8421码 相同取0 不同取1
/*
8421

0000  -> 表示十进制0
0010  -> 2
1000  -> 8
0100  -> 4
1111  -> 8+4+2+1=15
*/

/*
    5 ^ 3 = 6
    由来:
    8421

    0101  -> 5
    0011  -> 3
    根据相同取0 不同取1得到异或的二进制结果
    0110  -> 对应8421码得到 4 + 2 = 6  注意是根据1来取对应的8421码并且相加
*/
var res = 0;
for ( var i = 0; i < arr.length; i ++ ) {
    res = res ^ arr[i];
}
console.log(res)