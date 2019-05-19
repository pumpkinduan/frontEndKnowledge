(function(window, undefined) {
    /*
    	1.jq本质是一个闭包
    	2.jq为啥要使用闭包来封装?
    		避免多个框架的冲突
    	3.jq为社么给自己传递一个window参数
    	    为了方便后期压缩代码
    		为了提升查找效率
    	4.这里的参数undefined是避免引用到外部作用域下的变量undefined,因为在ie7下可以将undefined当作变量名来声明
    */
    var objType = {};
    var hasOwn = objType.hasOwnProperty;
    var toString = objType.toString;
    var myJq = function(selector) {
        return new myJq.fn.init(selector);
    }
    myJq.fn = myJq.prototype = {
        consturctor: myJq,
        init: function(selector) {
            // 1.传入'' null undefined NaN false 0返回空的jq对象
            if (!selector) {
                return this;
            } else if (myJq.isString(selector)) {
                //0.先去除字符串两端的空格
                selector = myJq.trim(selector);
                //2.字符串：
                //2.1判断是否是html代码片段 <a>,<b></b>,可见代码片段的最小长度为3;
                if (myJq.isHTML(selector)) {
                    // 1.根据代码片段创建所有元素
                    var temp = document.createElement('div');
                    // 这里用一个模板元素,将其innerHTML的内容设置为我们传入的代码片段,系统会根据代码片段自动创建元素
                    temp.innerHTML = selector;
                    // 2.将创建好的一级元素添加到jq对象中去
                    /*for (var i = 0; i < temp.children.length; i++) {
                    	// children属性只会返回儿子,而不是所有后代
                    	this[i] = temp.children[i];
                    }*/
                    // 优化之后的代码-->将 temp.children里的元素利用数组push方法及改变this指向进而添加到jq对象里去
                    [].push.apply(this, temp.children);
                    // 3.给jq对象添加length属性
                    this.length = temp.children.length;
                    // 4.返回加工好的jq对象
                    return this;
                } else {
                    //2.2选择器
                    var res = document.querySelectorAll(selector);
                    // res的结果是一个系统自带的伪数组
                    [].push.apply(this, res);
                    return this;
                }
            } else if (myJq.isArray(selector) || myJq.isArrayLike(selector)) {
                //真数组
                /*if(isArray(selector)) {
                	[].push.apply(this, selector);
                	return this;
                }else if(isArrayLike(selector)) {
                	var arr = [].slice.call(selector);
                	[].push.apply(this, arr);
                	return this;
                }*/
                //在企业开发中,不论是系统自带的伪数组还是自定义的伪数组,为了避免出错,建议都用slice方法先将伪数组转为真数组
                var arr = [].slice.call(selector);
                [].push.apply(this, arr);
                return this;
            } else if (myJq.isFunction(selector)) {
                myJq.ready(selector);
            } else {
                //其他类型的数据,传入什么值就把它们存储到jq对象中返回
                this[0] = selector;
                this.length = 1;
                return this;
            }
        },
        jQuery: '1.0.0', //版本号
        selector: '', //默认选择器
        length: 0,
        // push: [].push相当于push.apply(this),实例对象调用的push，
        // 则push函数里的this便指向了jq实例对象，这样即可实现往实例对象里加数据
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        toArray: function() {
            //将伪数组转为真数组
            return [].slice.call(this);
        },
        get: function(index) {
            var len = this.length;
            //获取原生的DOM
            // 1.若不传参数,则会取到所有的DOM元素并放到一个数组里返回
            if (arguments.length === 0) {
                // return [].slice.call(this);
                return this.toArray();
            } else if (index >= 0 && index < len) {
                // 2.若传的索引为正数,则取到对应索引值的DOM元素并返回
                return this[index];
            } else if (index < 0 && Math.abs(index) < len) {
                //3.若传的索引为负数,则倒着取到对应索引值的DOM元素并返回
                index = index + len;
                return this[index];
            } else {
                //索引值大于对象的长度,为undefined;
                return undefined
            }
        },
        eq: function(index) {
            //类似于get方法,只是返回的是加工好的jq对象
            if (arguments.length === 0) {
                return myJq();
            } else {
                return myJq(this.get(index));
            }

        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(this.length - 1);
        },
        each: function(fn) {
            return myJq.each(this, fn);
        },
        find: function(selector) {},
        filter: function(fn) {
            return myJq.filter(this, fn)
        }
    }
    myJq.toType = function(obj) {
        if (obj === null) {
            return null + '';
        }
        return typeof obj === 'object' ? toString.call(obj) : typeof obj;
    }
    myJq.isWindow = function(obj) {
        return obj !== null && obj === window;
    }
    myJq.isFunction = function(obj) {
        // 避免把DOM Node当成function
        return myJq.toType(obj) === 'function' && myJq.toType(obj.nodeType) !== 'number';
    }
    myJq.isString = function(str) {
        // 判断是否是字符串
        return typeof str === 'string' ? true : false;
    }
    myJq.isArray = function(obj) {
        return toString.call(obj) === '[object Array]';
    }
    myJq.isObject = function(obj) {
        return obj && toString.call(obj) === '[object Object]';
    }
    myJq.isArrayLike = function(obj) {
        var length = obj && obj.hasOwnProperty('length') && obj.length;
        // 因为function和window也有length属性,若是这两个中的一个直接返回false,不进行下面判断,省时
        if (myJq.isFunction(obj) || myJq.isWindow(obj)) {
            return false;
        }
        //myJq.toType(length) === 'number' && length > 0 && length - 1 in obj可用于判断伪数组有类似数组的0,1,2...length - 1的索引属性
        return toString.call(obj) === '[object Object]' || myJq.toType(length) === 'number' && length > 0 && length - 1 in obj;
    }
    //添加一个extend方法,便于分类管理函数
    myJq.extend = myJq.fn.extend = function() {
        //思想:
        //1.遍历合并的对象,把相应的属性(attr1)添加到被合并的对象(target目标对象)中去
        //1.1将属性attr1值赋值给target中的同名属性,
        //1.1.a若attr1为数组或对象,且target中的同名属性值不是数组或对象,
        //则该同名属性值赋为一个空的数组或空对象,然后遍历属性attr1对应的数组或对象,将其中简单类型的值给到target的同名属性对应的空数组或空对象
        //1.1.b若attr1为数组或对象,且target中的同名属性值是数组或对象,辣么直接把遍历attr1的各个值给到该同名属性对应的数组或对象

        //target变量:表示被合并的目标对象,extend方法也会返回该对象
        var target = arguments[0];
        var length = arguments.length;
        var deep = false; //默认为浅拷贝
        var i = 1; //用于计数
        var copy, clone, origin, options;
        //0.若用户传递的第一个参数值为bool类型的值,则
        if (typeof target === 'boolean') {
            deep = target; //根据bool值判断是否是深浅拷贝
            target = arguments[1] || {}; //将目标对象指向第二个参数
            i++;
        }
        //1若用户传递的第一个参数值为简单数据类型且不为function和Boolean,for example: string, number...;则令target为一个空对象
        if (typeof target !== 'object' && !myJq.isFunction(target)) {
            target = {};
        }
        //1.1且用户只传递了一个参数,则令target为this,将被合并的目标对象指为jq对象
        if (i === length) {
            target = this;
            i--;
        }


        // var obj = {a:1}
        // var obj1 = {aa:11,c:obj}
        // obj = {a:1,aa:11,c:obj}
        // myJq.extend(obj, obj1)
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (var attr in options) {
                    copy = options[attr];
                    origin = target[attr];
                    //防止对象内部的属性无限执行自身,无论是浅拷贝,还是深拷贝
                    if (target === copy) {
                        continue;
                    }
                    //深拷贝
                    if (deep && copy && (myJq.isArray(copy) || myJq.isObject(copy))) {
                        // console.log(1)
                        if (myJq.isArray(copy)) {
                            //若目标对象内的属性值为一个数组,则不用给该属性值新建一个数组了,直接往该数组内添加新的成员,避免该数组内原有成员的缺失
                            clone = origin && myJq.isArray(origin) ? origin : [];
                            //这里不能换成以下写法,不然在遇到下列情况会代码无限执行
                            // var obj = {a:1}
                            // var obj1 = {aa:11,c:obj}
                            // myJq.extend(obj, obj1) 
                            // target[attr] = origin && myJq.isArray(origin) ? origin : [];
                        } else {
                            clone = origin && myJq.isObject(origin) ? origin : {};
                        }
                        //将克隆好的数组或对象作为目标对象的相应属性的值
                        // console.log(clone)
                        target[attr] = myJq.extend(deep, clone, copy);
                        //浅拷贝
                    } else {
                        target[attr] = copy;
                    }
                }
            }
        }
        return target;
    }
    var isArrayLike = myJq.isArrayLike;
    // 工具方法,也叫静态方法,定义在jq函数对象自身的
    myJq.extend({
        isHTML: function(str) {
            // 判断是否是HTML
            var len = str.length;
            if (str.charAt(0) === '<' && str.charAt(len - 1) === '>' && len >= 3) {
                return true;
            }
        },
        trim: function(str) {
            // 若是支持trim方法则用
            if (str.trim) {
                return str.trim();
            } else {
                return str.replace(/^\s+|\s+$/g, '');
            }
        },
        ready: function(callback) {
            //onload事件会等到DOM加载完后并且其他资源(img...)都下载完执行相应的回调函数
            //DOMContentLoaded事件会等到DOM加载完后就执行相应的回调函数,注意此时document.readyState == 'interactive'

            // 判断DOM是否加载完毕


            /*loading / 加载
            document 仍在加载。
            interactive / 互动
            文档已经完成加载， 文档已被解析， 但是诸如图像， 样式表和框架之类的子资源仍在加载。
            complete / 完成
            T文档和所有子资源已完成加载。 状态表示 load 事件即将被触发。
            当这个属性的值变化时， document 对象上的readystatechange 事件将被触发*/
            if (document.readyState == 'complete') {
                callback();
            } else if (document.addEventListener) {
                //高级版本浏览器
                document.addEventListener('DOMContentLoaded', function() {
                    callback();
                })
            } else {
                //ie8 及以下
                // onreadystatechange事件是用来监听document.readyState的变化的
                document.attachEvent('onreadystatechange', function() {
                    if (document.readyState == 'complete') {
                        callback();
                    }
                })
            }
        },
        each: function(obj, fn) {
            if (myJq.isObject(obj)) {
                //排除类数组上的length属性
                if (myJq.isArrayLike(obj)) {
                    var len = obj.length;
                    for (var i = 0; i < len; i++) {
                        if (fn.call(obj[i], i, obj[i]) === false) {
                            //这里将fn函数内的this指向了obj[i]
                            //若回调函数结果为false直接终止循环遍历
                            break;
                        }
                    }
                } else {
                    for (var i in obj) {
                        //排除其原型上的属性
                        if (obj.hasOwnProperty(i)) {
                            //改变this的指向,使其指向我们要遍历的对象的value,obj[i],因为我们常常需要获取的是那个遍历的值
                            if (fn.call(obj[i], i, obj[i]) === false) {
                                //若回调函数结果为false直接终止循环遍历
                                break;
                            }
                        }

                    }
                }
                //string, number...
            } else {
                for (var j = 0; j < obj.length; j++) {
                    if (fn.call(obj[j], j, obj[j]) === false) {
                        //若回调函数结果为false直接终止循环遍历
                        break;
                    }
                }
            }
            //返回原来要遍历的那个对象
            return obj
        },
        filter: function(obj) {
            //fn
            var expression = arguments[1];
            var arr = [];
            if (myJq.isFunction(expression)) {
                if (myJq.isObject(obj)) {
                    for (var i in obj) {
                        if (expression.call(obj[i], i, obj[i])) {
                            arr.push(obj[i]);
                        }
                    }
                    return myJq(arr);
                }
            }
        }
    })
    //操作DOM的方法
    myJq.fn.extend({
        remove: function(sele) {
            if (arguments.length === 0) {
                // 若没有传参,则默认删除所有找到的元素
                this.each(function(index, value) {
                    // this指的便是value
                    // 通过父节点删除指定的元素,这样才能将自身删除
                    var parent = this.parentNode;
                    parent.removeChild(this);
                })
            } else {
                // 1.遍历找到的元素,并且获取到该元素的标签名
                this.each(function(index, value) {
                    var type = value.tagName;
                    //2.根据选择器找到指定的元素,在遍历指定元素,并且获取到该元素的标签名
                    $(sele).each(function(index, value) {
                        var tag = value.tagName;
                        //3.将指定的元素与找到的元素进行比较,若是相同则删除
                        if (type === tag) {
                            var parent = value.parentNode;
                            parent.removeChild(value);
                        }

                    })
                });
            }
            return this;
        },
        empty: function() {
            //遍历所有找到的元素
            this.each(function() {
                // 将所有找到的元素的所有后代都设置为空,包括文本
                this.innerHTML = '';
            })
            //方便链式编程
            return this;
        },
        html: function(content) {
            if (arguments.length === 0) {
                return this.get(0).innerHTML;
            } else {
                this.each(function() {
                    this.innerHTML = content;
                })
            }
            return this;
        },
        text: function(content) {
            console.log(this)
            //获取所选DOM元素的文本
            if (arguments.length === 0) {
                var str = '';
                this.each(function(ele, index) {
                    // console.log(1)
                    str += this.innerText;
                })
                return str;
            } else {
                this.each(function() {
                    this.innerText = content;
                })
            }
            return this;
        },
        appendTo: function(sele) {
            if (arguments.length === 0) {
                return $();
            } else {
                var $this = this;
                // 将传入的数据类型统一包装为jq对象
                var source = $(sele);
                var len = source.length;
                var arr = [];
                //1.遍历插入的元素
                $this.each(function() {
                    //2.将插入的元素插入到用选择器选择的指定元素的最后去
                    for (var i = 0; i < len; i++) {
                        var sourceEle = source[i];
                        if (i === 0) {
                            //若是被插入的指定元素只有一个,那么直接插入
                            sourceEle.appendChild(this);
                            arr.push(this);
                        } else {
                            //否则要进行深度克隆,然后插入
                            var clone = this.cloneNode(true);
                            sourceEle.appendChild(clone);
                            arr.push(clone);
                        }
                    }
                })
                //将插入的元素返回,包括克隆的
                return $(arr);
            }
        },
        prependTo: function(sele) {
            if (arguments.length === 0) {
                return $();
            } else {
                var $this = this;
                // 将传入的数据类型统一包装为jq对象
                var source = $(sele);
                var len = source.length;
                var arr = [];
                //1.遍历插入的元素
                $this.each(function() {
                    //2.将插入的元素插入到用选择器选择的指定元素的最后去
                    for (var i = 0; i < len; i++) {
                        var sourceEle = source[i];
                        if (i === 0) {
                            //若是被插入的指定元素只有一个,那么直接插入
                            sourceEle.insertBefore(this, sourceEle.firstChild);
                            arr.push(this);
                        } else {
                            //否则要进行深度克隆,然后插入
                            var clone = this.cloneNode(true);
                            sourceEle.insertBefore(clone, sourceEle.firstChild);
                            arr.push(clone);
                        }
                    }
                })
                //将插入的元素返回,包括克隆的
                return $(arr);
            }
        },
        append: function(sele) {
            //与appendTo三点不同
            // 1.传入字符串时不会当成选择器进行选择页面上的DOM元素,而是当成内容添加
            // 2.把需要插入到指定元素中的内容作为参数，而被插入元素作为调用者,刚好与appendTo相反
            // 3.返回值就是调用者
            if (myJq.isString(sele) && !myJq.isHTML(sele)) {
                this.get(0).innerHTML += sele;
            } else {
                $(sele).appendTo(this);
            }
            return this;
        },
        prepend: function(sele) {
            if (myJq.isString(sele) && !myJq.isHTML(sele)) {
                this.get(0).innerHTML = sele + this.get(0).innerHTML;
            } else {
                $(sele).prependTo(this);
            }
            return this;
        },
        insertBefore: function(sele) {
            if (arguments.length === 0) {
                return myJq();
            } else {
                var $this = this;
                // 将传入的数据类型统一包装为jq对象
                var source = myJq(sele);
                var len = source.length;
                var arr = [];
                //1.遍历插入的元素
                $this.each(function() {
                    //2.将插入的元素插入到用选择器选择的指定元素的前面，二者是同级关系
                    for (var i = 0; i < len; i++) {
                        var sourceEle = source[i];
                        var parent = sourceEle.parentNode;
                        if (i === 0) {
                            //若是被插入的指定元素只有一个,那么直接插入
                            parent.insertBefore(this, sourceEle);
                            arr.push(this);
                        } else {
                            //否则要进行深度克隆,然后插入
                            var clone = this.cloneNode(true);
                            parent.insertBefore(clone, sourceEle);
                            arr.push(clone);
                        }
                    }
                })
                //将插入的元素返回,包括克隆的
                return myJq(arr);
            }
        },
        on: function(type, callBack) {
            this.each(function(i, elem) {
                //elem为元素，type为事件类型，callBack为处理事件的函数
                /* if (elem.addEventListener) {
                     return elem.addEventListener(type, callBack, false);
                 } else if (elem.attatchEvent) {
                     return elem.attatchEvent("on" + type, function() {
                         callBack.call(elem); //真正处理代码的函数放在callBack里
                         //由于该方法中的this指向的是window，则把该方法中的this指向转变为元素
                     });
                 } else {
                     return elem["on" + type] = callBack;
                 }*/
                //这里模拟针对的是自定义的事件,不能对系统自带的click...事件起效,这里是为了对应trigger的实现
                //1.给每个匹配到的元素添加一个属性,该属性中用于存储对应的事件类型所对应的函数
                !elem.cacheEvent ? elem.cacheEvent = {} : null;
                //给同一DOM的同一事件类型绑定不同事件函数
                !elem.cacheEvent[type] ? elem.cacheEvent[type] = [callBack] : elem.cacheEvent[type].push(callBack);


            })
        },
        trigger: function(type) {
            /*type = type || '';
            var event, eventIE;
            //1.创建事件对象
            if(Event) {
            	event = new Event(type);
            }else {//兼容IE8以上
            	eventIE = document.createEvent('Event')
            	eventIE.initEvent(type, true, true);
            }
        	
            //2.触发每个匹配到的元素所绑定的该事件
            this.each(function(i, elem) {
            	elem.dispatchEvent(event || eventIE);
            })*/
            //trigger的第二个参数为数组或类数组,这是额外传给事件处理函数的参数数据
            var para = arguments.length > 1 ? [].slice.call(arguments[1]) : [];
            this.each(function(i, elem) {
                if (elem.cacheEvent && elem.cacheEvent[type]) {
                    //将事件类型所对应的所有事件函数都挨个执行
                    var len = elem.cacheEvent[type].length;
                    for (var i = 0;  i < len; i++) {
                        elem.cacheEvent[type][i].apply(elem, para);
                    }
                }
            })

        },
        //解绑每个元素身上所绑定的事件
        removeEvent: function(type, handler) {
            this.each(function(i, ele) {
                if (ele.removeEventListener) {
                    return ele.removeEventListener(type, handler, false);
                } else if (ele.detachEvent) {
                    return ele.detachEvent('on' + type, handler)
                } else {
                    return ele['on' + type] = null;
                }
            })
        },
        //该方法主要用于动画的连续执行
        // queue():取出名称为fx的队列 ||  queue(type)用于取出队列
        queue: function(queueName, callBack) {
            // type:规定队列的名称
            // callBack:要添加进队列的函数
            var args = arguments;
            queueName = queueName || 'fx'; //默认名称为'fx'
            //若是只传递了一个参数,则返回队列,这里不做复杂的兼容处理
            if ( ( arguments.length == 1 || arguments.length == 0 ) && typeof arguments[0] === 'string') {
                return this[0][queueName];
            }
            //将队列绑定到DOM元素身上
            //添加队列 || 或往已有队列中添加数据
            this.each(function(index, obj) {
                if (myJq.isFunction(args[0]) && args.length == 1) {
                    obj['fx'] ? obj['fx'].push(args[0]) : obj['fx'] = [args[0]];
                } else {
                    obj[queueName] ? obj[queueName].push(callBack) : obj[queueName] = [callBack];
                }
            })
            return this;
        },
        dequeue: function(queueName) { //该方法用于执行匹配元素中队列的函数
            queueName = queueName || 'fx';
            var _self = this;
            var next = function() { //这个方法是用于执行队列的下一个方法
                _self.dequeue(queueName)
            }
            this.each(function(index, obj) {
                var queueArr = obj[queueName]; //获取队列
                var curFn = queueArr.shift(); //获取当前处在头部的数据(方法),并移除,也就是响应了先进先处的队列结构
                if (!curFn) { return; }
                curFn(next);
            })
            return this;
        },
        clearQueue: function(queueName) {//根据类型,清空元素上绑定的所有队列
        	if(typeof queueName != 'string') {return;}
        	queueName = queueName || 'fx';
        	this.each(function(i, elem) {
        		elem[queueName].length = 0;
        	})

        },
        animate: function(json, type, callback) {
        //若635行不加.delay，则如下
        //1.这个动画函数不支持连续链式调用,也就是没有分段动画,除非自己在外部调用delay
        //1.1如: obj.animate().delay(0).animate(); 这样也会有4ms的时间误差
        //1.2这样使用obj.animate().animate(),则会以最后一个动画为主,由于内部的clearInterval(obj.timer)
            /*obj:运动目标元素
			json --> {
			left:target运动的最终目标值
			...
 			}
 			type -->运动类型(fastToSlow, linear，slowToFast)
			callback:运动结束后执行的回调函数*/
            var _self = this;
            var len = this.length;
            var baseFunc = function(next) {
                var counts = 0;
                _self.each(function(i, elem) {
                    //让所有匹配到的DOM元素做完动画后才开启执行回调函数
                    animation(elem, json, type, function() {
                        if (++counts === len) { //遍历完所有匹配到的DOM元素
                            callback && callback();
                            next();//通过next来执行后续方法的出队操作,省去了对同类型队列中的函数的挨个执行的步骤
                        }
                    })
                })
            }
            this.queue('fx', baseFunc); //入队
            if (this.queue('fx').length == 1) {
                this.dequeue('fx').delay(0) //第一次出队,执行,后面加个.delay(0)使得动画可分部进行,不过有4ms的时间差
                //这样以后的链式调用,后面的方法都会添加到自定义队列里去
            }
            //这里是针对属性值为数值的属性做的动画,如:width: 100
            function animation(obj, json, type, callback) {
                var speed, currentSty, stop;                
                clearInterval(obj.timer);
                obj.timer = setInterval(function() {
                	console.log( obj.timer)
                    stop = true;
                    if (type == 'fastToSlow' || (!type)) {
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
                    if (type == 'linear') {
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
                }, 1000 / 60)
            }
            function getStyle(elem, prop) {
                if (window.getComputedStyle) {
                    return window.getComputedStyle(elem, null)[prop];
                } else {
                    return elem.currentStyle[prop];
                }
            }
            return this;
        },
        delay: function(duration) {//延迟执行动画
        	this.each(function(i, elem) {
        		var arr = elem.fx && elem.fx;
        		arr.push(function(next) {
        			setTimeout(function() {
        				next();
        			}, duration)
        		})
        	})
        	return this;
        }
    })
	myJq.extend({
        	proxy:  function() {//改变this指向

        	}
        })
    window.myJq = window.$ = myJq;
    myJq.fn.init.prototype = myJq.fn;
}(window))