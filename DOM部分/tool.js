(function () {
    function setText(obj, text) {
        if (obj.textContent) {
            return obj.textContent = text;
        } else {
            obj.innerText = text;
        }
    }
    function getPageOffset() {
        if (window.pageXOffset) {
            return {
                x: window.pageXOffset,
                y: window.pageYOffset
            }
        } else return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
    function getViewportOffset() {
        if (window.innerWidth) {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        } else if (document.compatCode === "CSS1Compat") {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElemnt.clientHeight
            }
        }
        else {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        }
    }
    function getStyle(elem, prop) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(elem, null)[prop];
        }
        return elem.currentStyle[prop];
    }
    function getElemContentSize(elem) {
        if (window.getComputedStyle) {
            return {
                width: window.getComputedStyle(elem, null).width,
                height: window.getComputedStyle(elem, null).height
            }
        } else if (elem.currentStyle) {
            return {
                width: elem.currentStyle.width,
                height: elem.currentStyle.height
            }
        }
    }
    //获取元素相对于文档的坐标
    function getElementPosition(ele) {
        var result_X = 0,
            result_Y = 0;
        while (ele.offsetParent !== null) {//一直循环到根元素
            var parent = ele.offsetParent;
            var w = (parent.offsetWidth - parent.clientWidth) / 2;//有定位父级的左边框宽度
            var h = (parent.offsetHeight - parent.clientHeight) / 2;//有定位父级的下边框宽度
            result_X += (ele.offsetLeft + w); //每循环一次获取一个到有定位我的父级坐标，每次累加
            result_Y += (ele.offsetTop + h);
            ele = parent;
        }
        return {
            x: result_X,
            y: result_Y
        }
    }
    //封装一个事件函数来兼容各个浏览器addEvent();
    function addEvent(elem, type, handle) {
        //elem为元素，type为事件类型，handle为处理事件的函数
        if (elem.addEventListener) {
            return elem.addEventListener(type, handle, false);
        } else if (elem.attatchEvent) {
            return elem.attatchEvent("on" + type, function () {
                handle.call(elem);//真正处理代码的函数放在handle里
                //由于该方法中的this指向的是window，则把该方法中的this指向转变为元素
            });
        } else {
            return elem["on" + type] = handle;
        }
    }
    //注:若绑定匿名函数，则无法解除
    function removeEvent(ele, type, handler) {
        if (ele.removeEventListener) {
            return ele.removeEventListener(type, handle, false);
        } else if (ele.detachEvent) {
            return ele.detachEvent('on' + type, handler)
        } else {
            return ele['on' + type] = null;
        }
    }
    //取消冒泡和阻止默认事件
    //取消冒泡:
    //W3C标准 event.stopPropagation();但不支持IE9以下
    //IE独有event.cancelBubble = true;(现在在Google上也可实现)
    //封装取消冒泡的函数 stopBubble(event)
    function stopBubble(event) {
        if (event.stopPropagation) {
            return event.stopPropagation();
        } else {
            return event.cancelBubble = true;
        }
    }
    //阻止默认事件--- 表单提交，a标签的跳转，右键菜单等
    //1.return false; 以对象属性的方式注册的事件才生效
    //2.event.preventDefault();w3c标注，IE9以下不支持
    //3.event.returnValue = false;兼容IE
    //封装阻止默认事件的函数:cancelHandler(event);
    function cancelHandler(event) {
        if (event.preventDefault) {
            return event.preventDefault();
        } else {
            return event.returnValue = false;
        }
        return false;
    }
    function debounce(handler, delay) {
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
    window.tool = {
        setText: setText,
        getPageOffset: getPageOffset,
        stopBubble: stopBubble,
        cancelHandler: cancelHandler,
        addEvent: addEvent,
        removeEvent: removeEvent,
        getViewportOffset: getViewportOffset,
        getStyle: getStyle,
        getElemContentSize: getElemContentSize,
        getElementPosition: getElementPosition,
        debounce: debounce,
        throttle: throttle
    }
})();