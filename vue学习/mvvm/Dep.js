class Dep {
    constructor() {
        this.subs = new Map();//保存所有watcher实例
    }
    static target = null;
    addSub(key, watcher) {
        let subs = this.subs;
        if ( !subs.has(key) ) {
            subs.set(key, [watcher]);
        } else {
            subs.get(key).push(watcher);
        }
    }
    notify(changedAttr) {
        console.log(this.subs.get('name') === this.subs.get('age'));
        if ( this.subs.has(changedAttr) ) {
            //当所依赖的data中的属性发生变化时,触发对应的那一个watcher实例去更新页面,而不是触发所有watcher实例
            //在这里由于一个vue实例下对应着一个watcher实例,所以所有data中的属性对应的watcher其实都是一样的
            this.subs.get(changedAttr).update(changedAttr);
        }
    }
}

