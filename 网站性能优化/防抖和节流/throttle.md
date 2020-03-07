### 节流throttle
定义：如果连续触发事件，每隔一段时间，只执行一次事件处理函数
例如：指定延迟时间1s, 1s内连续调用10次或更多,不会执行,当1s过后执行一次回调函数，2s后执行一次...

思路：根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也不同

使用场景：若是想看到连续触发事件的过程效果，则用节流

*与防抖的区别：*
防抖是虽然事件持续触发，但只有等事件停止触发后 n 秒才执行函数，节流是持续触发的时候，每 n 秒执行一次函数
#### 使用时间戳
当事件触发时，获得当前的时间戳，然后与之前的时间戳作差(初始时为0)，若大于延迟时间就执行函数，然后更新时间戳为当前的时间戳；若是小于就不会执行函数，直接return

这种方式在事件的首次触发时会立即执行，事件触发停止后不会执行函数
```js
function throttle(fn, delay = 500) {
   let previous = 0;
    return function () {
        let now = +Date.now();
        if ( now - previous < delay) return;
        fn.apply(this, arguments);
        previous = now;
    }
}
```
#### 设置定时器 
事件触发时，设置一个定时器，再次触发事件时，若是定时器存在，就不执行，直到定时器执行完毕，置空定时器，以便设置下个定时器

这样，在指定的时间内，函数只会执行一次

这种方式在事件的首次触发时会延迟执行，在恰当的时机(定时器为空的这段时间)，事件触发停止后函数会再执行一次
```js
function throttle(fn, delay = 500) {
    let timer = null;
    return function() {
        if (timer) return;
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, arguments);
        }, delay)
    }
}
```
例如：对onresize事件进行节流，延迟时间为3s
10s内不停的缩放窗口，每隔3s执行一次，在9.5s的时候停止触发，那么12s的时候依然会执行一次
原因：在9s的时候，定时器执行完毕，定时器标记timer被设为null，在9.5的时候触发事件，那么就设置了一个定时器，该定时器在3s后会执行函数
#### 二者结合
结合时间戳与定时器实现节流
实现开始触发事件会立即执行，停止触发时还能在执行一次，不过是延迟执行
```js
function throttle(fn, delay = 500) {
    let timer = null;
    let previous = 0;
    return function () {
        let now = Date.now();
        // 下次触发fn的剩余时间
        let remaining = delay - (now - previous); 
        // 是否修改了系统的时间
        let altered = now - previous < 0;
        if (remaining <= 0 || altered) { //第一次立即执行
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.apply(this, arguments);
            previous = now;
        } else if (!timer) {
            timer = setTimeout( () => {
                timer = null;
                fn.apply(this, arguments);
            }, delay);
        }
    }
}
```