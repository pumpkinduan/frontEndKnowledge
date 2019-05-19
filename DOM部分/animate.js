// var div = document.getElementsByTagName('div')[0];
// div.onclick = function() {
//     animate(this, {
//         width: 500,
//         height: 500,
//         left: 600,
//         opacity: 1
//     }, 'fastToSlow', function() {
//         console.log(22)
//     });
//     // linear(this, 400, 10)
// }

function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}
// 匀速
function linear(obj, targetLeft, speed) {
    //速度与路程公式--->步频与left的关系
    //s = vt--> left = speed * t-->left = offsetLeft + speed;
    // 方向判断
    speed = targetLeft - obj.offsetLeft > 0 ? speed : -speed;
    //清除定时器，避免定时器的累加
    clearInterval(obj.timer);
    // 确保运动元素有自己唯一的定时器
    obj.timer = setInterval(function() {
        if (Math.abs(targetLeft - obj.offsetLeft) <= Math.abs(speed)) {
            //别忘记加单位'px'
            //避免运动的超出或不足
            clearInterval(obj.timer)
            obj.style.left = targetLeft + 'px';
        } else {
            obj.style.left = obj.offsetLeft + speed + 'px';
        }
    }, 1000 / 60)
}
// 缓冲
function fastToSlow(obj, targetLeft, k) {
    // k为整数
    // 原理：让速度越来越慢、
    // var k = 1500;
    // k应该为一个绝对值,比例系数
    k = (k == 0) ? 1 : Math.abs(k);
    // if(k == 0) {
    // 	k = 1;
    // }else {
    // 	k = Math.abs(k)
    // }
    var speed;
    // 对speed向上取整，避免k的过大使得speed为小数,而left的改变是以1px为单位的
    // 小数部分直接取0，这样元素就不会动了
    //保证speed < 0时--->max(speed) = -1
    //保证speed > 0时--->min(speed) = 1
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        speed = Math.ceil((targetLeft - obj.offsetLeft) / k) //left的变化变speed
        if (Math.abs(targetLeft - obj.offsetLeft) <= Math.abs(speed)) {
            //别忘记加单位'px'
            //避免运动的超出或不足
            clearInterval(obj.timer)
            obj.style.left = targetLeft + 'px';
            // console.log(obj.offsetLeft)
        } else {
            obj.style.left = obj.offsetLeft + speed + 'px';
            console.log(speed)
        }
    }, 1000 / 60)
}

function slowToFast(obj, targetLeft, k) {
    var speed = k;
    k = Math.ceil(k / 10);
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        if (Math.abs(targetLeft - obj.offsetLeft) <= Math.abs(speed)) {
            //别忘记加单位'px'
            //避免运动的超出或不足
            clearInterval(obj.timer)
            obj.style.left = targetLeft + 'px';
            console.log(obj.offsetLeft)
        } else {
            obj.style.left = obj.offsetLeft + speed + 'px';
            speed = obj.offsetLeft * k;
            console.log(obj.style.left)
        }
    }, 1000 / 60)
}
//综合
/*
	obj:运动目标元素
	json --> {
		left:target运动的最终目标值
		...
 	}
 	type -->运动类型(fastToSlow, linear，slowToFast)
	callback:运动结束后执行的回调函数
 */
function animate(obj, json, type, callback) {
    var speed, currentSty, stop;
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        stop = true;
        if (type == 'fastToSlow') {
            var k = 15;
            for (var attr in json) {
                if (attr == 'opacity') {
                    currentSty = parseFloat(getStyle(obj, attr)) * 100;
                    json[attr] = json[attr] * 100;
                } else {
                    currentSty = parseInt(getStyle(obj, attr));
                }
                speed = (json[attr] - currentSty) / k;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (Math.abs(json[attr] - currentSty) <= Math.abs(speed)) {
                    if (attr == 'opacity') {
                        json[attr] = json[attr] / 100;
                        obj.style[attr] = json[attr];
                    } else {
                        obj.style[attr] = json[attr] + 'px';
                    }
                } else {
                    if (attr == 'opacity') {
                        json[attr] = json[attr] / 100;
                        obj.style.opacity = (speed + currentSty) / 100;
                    } else {
                        obj.style[attr] = speed + currentSty + 'px';
                    }
                }
                //最后目标点的值是字符串，注意转为数值
                if (parseInt(obj.style[attr]) != json[attr]) {
                    stop = false;
                }
            }

            // 等到元素的所有属性都到最终点时在关闭定时器
            if (stop) {
                clearInterval(obj.timer)
                typeof callback == 'function' ? callback() : null;
            }
        }
        if (type == 'linear' || (!type)) {
            console.log(type)
            for (var attr in json) {
                if (attr == 'opacity') {
                    currentSty = parseFloat(getStyle(obj, attr)) * 100;
                    json[attr] = json[attr] * 100;
                } else {
                    currentSty = parseInt(getStyle(obj, attr));
                }
                speed = 10;
                speed = json[attr] - currentSty > 0 ? speed : -speed;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (Math.abs(json[attr] - currentSty) <= Math.abs(speed)) {
                    if (attr == 'opacity') {
                        json[attr] = json[attr] / 100;
                        obj.style[attr] = json[attr];
                    } else {
                        obj.style[attr] = json[attr] + 'px';
                    }
                } else {
                    if (attr == 'opacity') {
                        json[attr] = json[attr] / 100;
                        obj.style.opacity = (speed + currentSty) / 100;
                    } else {
                        obj.style[attr] = speed + currentSty + 'px';
                    }
                }
                if (parseInt(obj.style[attr]) != json[attr]) {
                    stop = false;
                }
            }
            // 等到元素的所有属性都到最终点时在关闭定时器
            if (stop) {
                clearInterval(obj.timer);
                typeof callback == 'function' ? callback() : '';
            }
        }
        if (type == 'slowToFast') {
            var k = 0.5;
            for (var attr in json) {
                if (attr == 'opacity') {
                    currentSty = parseFloat(getStyle(obj, attr)) * 100;
                    json[attr] = json[attr] * 100;
                } else {
                    currentSty = parseInt(getStyle(obj, attr));
                }
                speed = currentSty * k + 1;
                speed = json[attr] - currentSty > 0 ? speed : -speed;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (Math.abs(json[attr] - currentSty) <= Math.abs(speed)) {
                    if (attr == 'opacity') {
                        json[attr] = json[attr] / 100;
                        obj.style[attr] = json[attr];
                    } else {
                        obj.style[attr] = json[attr] + 'px';
                    }
                } else {
                    if (attr == 'opacity') {
                        json[attr] = json[attr] / 100;
                        obj.style.opacity = (speed + currentSty) / 100;
                    } else {
                        obj.style[attr] = speed + currentSty + 'px';
                    }
                }
                // console.log(json[attr])
                if (parseInt(obj.style[attr]) != json[attr]) {
                    // console.log(54545)
                    stop = false;
                }
            }
            // console.log(stop)

            // 等到元素的所有属性都到最终点时在关闭定时器
            if (stop) {
                clearInterval(obj.timer);
                typeof callback == 'function' ? callback() : '';
            }
        }
    }, 1000 / 60)
}
// 拖拽运动
function dragger(obj) {
    // 元素距离body的位置
    var disX, disX
    addEvent(obj, 'mousedown', function(e) {
        var x = parseInt(getStyle(obj, 'left'));
        var y = parseInt(getStyle(obj, 'top'));
        var e = e || window.event;
        disX = e.clientX - x;
        disY = e.clientY - y;
        console.log(disX)
        addEvent(document, 'mousemove', move)
        addEvent(document, 'mouseup', up)
    })

    function up() {
        removeEvent(document, 'mousemove', move);
    }

    function move(e) {
        var e = e || window.event;
        obj.style.left = e.clientX - disX + 'px';
        obj.style.top = e.clientY - disY + 'px';
    }
}
// dragger(div);
// 取消解绑事件的兼容性
function removeEvent(ele, type, handler) {
    if (ele.removeEventListener) {
        return ele.removeEventListener(type, handler, false);
    } else if (ele.detachEvent) {
        return ele.detachEvent('on' + type, handler)
    } else {
        return ele['on' + type] = null;
    }
}

function addEvent(elem, type, handle) {
    //elem为元素，type为事件类型，handle为处理事件的函数
    if (elem.addEventListener) {
        return elem.addEventListener(type, handle, false);
    } else if (elem.attatchEvent) {
        return elem.attatchEvent("on" + type, function() {
            handle.call(elem); //真正处理代码的函数放在handle里
            //由于该方法中的this指向的是window，则把该方法中的this指向转变为元素
        });
    } else {
        return elem["on" + type] = handle;
    }
}