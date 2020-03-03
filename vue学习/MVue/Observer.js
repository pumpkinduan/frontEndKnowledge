class Observer {
    //劫持data中的属性
    constructor(data) {
        this.observe(data);
    }
    observe(data) {
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        })
    }
    defineReactive(dataObj, key, value) {
        let dep = new Dep(); //与Dep建立关联
        if (value instanceof Object) {
            this.observe(value); //递归监听嵌套的对象内的属性
        } else {
            Object.defineProperty(dataObj, key, { //将指的对象内的属性转为响应式
                enumerable: true,
                get() {
                    // 进行依赖收集
                    // 表示页面中依赖该属性值 => <span v-text="msg"></span> 依赖msg
                    // 所以在这里将msg添加到依赖收集器中，不过要通过watcher来添加
                    Dep.target && dep.addSub(key, Dep.target);
                    Dep.target = null;//避免重复往Dep容器内添加订阅者
                    return value;
                },
                set(newVal) {
                    let oldVal = value;
                    if (newVal === value) return;
                    value = newVal;
                    //代表数据更新了，通知Dep
                    dep.notify(key, oldVal);
                }
            })
        }
    }
}