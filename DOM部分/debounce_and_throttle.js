/**
 *防抖和节流的共同点：都是防止用户频繁操作造成绑定的回调函数多次执,提升网页性能
 
 防抖debounce: 
    延迟执行绑定的回调函数,只有在连续触发事件处理函数所用的时间间隔大于指定的延迟时间,事件处理函数才会延迟执行
    若是连续触发事件的间隔时间在指定的时间间隔内,则永远不会执行。
    例如：指定延迟时间1s, 1s内连续调用10次或更多,不会执行,当1s内只调用了一次,则会延迟1s执行

 节流throttle:
    当连续触发事件时，保证在指定的时间间隔内只执行一次事件处理函数
    例如：指定延迟时间1s, 1s内连续调用10次或更多,不会执行,当1s过后执行一次回调函数
 *
 */

//防抖:
function debounce(delay, handler) {
    var timer = null;
    return function() {
        var arg = arguments;//事件对象
        var self = this;//实际为DOM
        if (timer) { clearTimeout(timer) }
        timer = setTimeout(function() {
            handler.apply(self, arg);
        }, delay)
    }
}

//节流
// function throttle(delay, handler) {//时间戳,开始触发事件会立即执行,不过可能最后一次触发事件不会执行
//     var lastTime = 0;
//     return function() {
//         var nowTime = Date.now();
//         if ( nowTime - lastTime >= delay ) {
//             handler.apply(this, arguments);
//             lastTime = nowTime;
//         }
//     }
// }
// function throttle(delay, handler) {//定时器,开始触发事件不会立即执行,延迟,不过最后一次触发事件会延迟在执行
//     var timer = null;
//     return function() {
//         var arg = arguments;
//         var self = this;
//         if ( !timer ) {
//             timer = setTimeout(function() {
//                 handler.apply(self, arg);
//                 timer = null;
//             }, delay);
//         }
//     }
// }

//结合时间戳与定时器实现节流:开始触发事件会立即执行,最后一次触发事件也会执行,不过是延迟执行
function throttle(handler, delay) {
    var timer = null;
    var lastTime = 0;
    return function() {
        var arg = arguments;
        var self = this;
        var nowTime = Date.now();
        clearTimeout(timer)
        if ( nowTime - lastTime >= delay ) {//第一次立即执行
            handler.apply(self, arg);
            lastTime = nowTime;
        } else {
            timer = setTimeout(function() {
                handler.apply(self, arg);
            }, delay);
        }
    }
}