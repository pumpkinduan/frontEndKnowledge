// 依赖收集器 
class Dep {
    constructor() {
        this.subs = new Map(); //收集订阅者的容器
    }
    addSub(key, watcher) { //往容器里面添加订阅者
        if (this.subs.has(key)) {
            this.subs.get(key).push(watcher);
        } else {
            this.subs.set(key, [watcher]);
        }
    }
    notify(key, oldVal) { //通知订阅者，数据更新了
        if (this.subs.has(key)) {
            this.subs.get(key).forEach(watcher => {
                watcher.update(oldVal); //订阅者自己去更新视图获取最新数据
            })
        }
    }
}

class Watcher { //订阅者
    constructor(render) {
        this.render = render;
        Dep.target = this; //通过target属性 将Dep与Watcher建立关联
    }
    update(oldVal) {
        this.previousVal = oldVal;
        this.render(oldVal); //更新视图，将页面上原来的旧值替换，渲染最新数据
    }
}