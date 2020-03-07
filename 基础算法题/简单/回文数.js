// /判断一个整数是否是回文数。
// 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数
/**
 * 输入 121； 输出true
 * 输入 -121；输出false
 */
// var isPalindrome = function (x) {
//     if (x >=0 && x < 10) return true;
//     if (x < 0 || x % 10 == 0 ) return false;
//     var pop, result = 0, _x = x;
//     while (_x !== 0) {
//         pop = _x % 10;
//         _x = parseInt(_x / 10);
//         result = result * 10 + pop;
//         if (result == x) return true;
//     }
//     return false
// }

var isPalindrome = function (x) {
    // 来自官方，笔者来测试下时间
    if (x >=0 && x < 10) return true;
    if (x < 0 || x % 10 == 0 ) return false;
    var result = 0;
    while (result < x) { //只反转 int 数字的一半,避免数字溢出
        result = result * 10 + x % 10;
        x = parseInt(x / 10);
    }
    //parseInt(result / 10)：
    //原始数字为奇数长度：得到的result数字长度比x数字长度多1，result的最后一位数即为 原数字的中位数
    //原始数字为偶数长度：得到的result数字长度与x数字长度相同的话（x == result），为true，否则false
    //如: 12354321  ==> while循环末尾 x = 123;而 result = 12345
    return result == x || parseInt(result / 10) == x;
}
console.log(isPalindrome(12354321))