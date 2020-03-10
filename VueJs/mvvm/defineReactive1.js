//第一种写法  体现思想
function defineReactive(obj) {
    const self = this; //mvvm实例
    let proxyObj = deepClone(obj);
    //进行依赖收集
    let dep = new Dep();
    //注意,由于闭包的存在,这里要用let
    for (let tempAttr in obj) {
        if (obj[tempAttr] instanceof Object) {
            defineReactive(obj[tempAttr]);
        } else {
            Object.defineProperty(obj, tempAttr, {
                writtable: true,
                configurable: true,
                get: function () {
                    /*
                        目的: 获取最新的属性值
                        写法: 每次都从原有对象身上进行获取
                        会导致堆栈溢出,造成了死循环,每次都对属性进行了访问,也就是执行了get方法
                        return obj[tempAttr];
                        所以我们需要一个代理对象(深度克隆),代理原有对象上的所有属性
                    */
                    if ( Dep.target ) {
                        dep.addSub(tempAttr, Dep.target);
                    }
                    return proxyObj[tempAttr];
                },
                set: function (newValue) {
                    if ( newValue === proxyObj[tempAttr] ) return;
                    proxyObj[tempAttr] = newValue;
                    //set函数形成的闭包中保存了每个属性名
                    dep.notify(tempAttr);//通知watcher对变动的依赖项进行重新render
                }
            })
        }
    }
}
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
