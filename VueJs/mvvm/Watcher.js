class Watcher {
    constructor(vm, render) {
        this.vm = vm;
        this.render = render;
        Dep.target = this;//当前vue实例下对应的watcher
    }
    update(changedAttr) {
        console.log('update')
        this.render.call(this.vm, changedAttr);
    }
}