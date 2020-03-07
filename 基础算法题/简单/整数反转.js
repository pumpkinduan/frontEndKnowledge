// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
// 输入：123； 输出：321；
// 输入：-123； 输出：-321；
// 输入：120； 输出：21；

/**
 * 
 注意:
假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。
请根据这个假设，如果反转后整数溢出那么就返回 0。

 */
// var reverse = function (x) {
//     var res = 0;
//     _max = Math.pow(2, 31) - 1;
//     _min = -Math.pow(2, 31);
//     if ( x > 0 ) {
//         res = +String(x).split('').reverse().join('');
//     } else {
//         res = -String(x).replace(/^-/, '').split('').reverse().join('');
//     }
//     return res <= _max && res >= _min ? res : 0;
// }

// var reverse = function (x) {
//     var res = 0,
//     _max = Math.pow(2, 31) - 1,
//     _min = -Math.pow(2, 31);
//     var _x = String(x),
//         len = _x.length - 1;
//     for (var i = len; i >= 0; i --) {
//         res += _x[i]
//     }
//     res = parseInt(res.replace(/^0+/, ''));
//     res = x < 0 ? -res : res;
//     return res <= _max && res >= _min ? res : 0;
// }

var reverse = function (x) {
    var _max = Math.pow(2, 31) - 1,
        _min = -Math.pow(2, 31),
        res = 0,
        pop;
    if ( x % 10 == x ) return x; //单个数字
    while ( x !== 0 ) {
        pop = x % 10;
        x = parseInt(x / 10);
        //对反转值预先进行判断是否溢出
        if ( res > _max / 10 || (res == _max / 10 && pop > 7) ) return 0;
        if ( res < _min / 10 || (res == _min / 10 && pop < -8) ) return 0;
        res = res * 10 + pop; //可能在做该运算时得到的结果就已经溢出了，所以事先进行如上判断
    }
    return res;
}
console.log(reverse(-216947))
