
//数组乱序
var arr = [1, 2, 3, 4, 5, 6];
//1.这种算法,适合面对面笔试,基本思想
/*
var newArr = [];
var len = arr.length;
while (arr.length > 0) {
    var index = Math.floor(Math.random() * len);
    newArr.push(arr[index]);
    arr.splice(index, 1);
}
console.log(newArr);
*/

//2.利用sort
arr.sort(function() {
    return Math.random() - 0.5;
})
console.log(arr)
