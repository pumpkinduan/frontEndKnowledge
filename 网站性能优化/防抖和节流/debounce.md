### 防抖debounce
定义：触发高频事件后，在指定的时间内只会执行一次，若是在指定的时间内高频事件再次触发，则重新计算时间

结果：用户的高频操作降为只执行一次事件处理函数，在指定时间内，用户没有进行高频操作，事件处理函数则会在n秒后执行，否则不会执行

思路：在指定时间内，用户每次触发事件时都取消之前的延迟调用方法，重新设置定时器计算延迟回调的执行

使用场景：若是想看到最终的结果，则用防抖
```js
function debounce(fn, delay = 500) {
    let timer = null;//利用闭包保存上一次定时器的返回值
    return function() {
        timer && clearTimeout(timer);//用户每次触发事件时都clear之前的setTimeout
        timer = setTimeout(() => {
            //一般防抖都是对DOM事件进行的，所以应该把this指向触发该事件的那个DOM元素
            //arguments中保存了事件对象
            fn.apply(this, arguments);
        }, delay)
    }
}
```
```html
<input id="inp" type="text">
<script>
let oInput = document.getElementById('inp');
function sayHi() {
    console.log('成功防抖');
}
oInput.addEventListener('input', debounce(sayHi, 400), false); //成功防抖
// 400毫秒内无论触发多少次input事件，最后只执行一次
</script>  
```