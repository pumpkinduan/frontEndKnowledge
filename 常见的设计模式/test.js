class EventEmiter {
    constructor() {
        // event: [fn...]
        this.eventPool = {}
    }
    $on(event, fn) {
        let pools = this.eventPool;
        //一个事件名可以绑定多个不同的事件处理函数
        if (pools[event]) {
            pools[event].push(fn);
        } else {
            pools[event] = [fn];
        }
    }
    $off(event, fn) {
        let pools = this.eventPool;
        let index = null;
        let length = arguments.length;
        switch (length) {
            // 如果没有提供参数，则移除所有的事件监听器；
            case 0:
                this.eventPool = {};
                break;
            case 1:
                // 如果只提供了事件，则移除该事件所有的监听器；
                if (pools[event]) {
                    pools[event] = [];
                }
                break;
            case 2:
                 // 如果同时提供了事件与回调，则只移除这个回调的监听器。
                if (pools[event]) {
                    index = pools[event].indexOf(fn);
                    if (index === -1) throw new Error('There is no what you provide fn')
                    pools[event].splice(index, 1);
                }
        }

    }
    $emit(event, ...args) {
        let pools = this.eventPool;
        if (pools[event]) {
            pools[event].forEach((cb) => {
                cb(...args);
            })
        }
    }
    //监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。
    $once(event, fn) {
        let _cb = (...args) => {
            fn(...args);
            this.$off(event, _cb);
        }
        this.$on(event, _cb);
    }
}
class Person extends EventEmiter {
    constructor() {
        super();
    }
}
let xiaoming = new Person('xx');
xiaoming.$on('speak', (msg) => {
    console.log(`I can speak ${msg}!`);
})
xiaoming.$on('speak', (msg) => {
    console.log(`I can't speak ${msg}!`);
})
setTimeout(() => {
    xiaoming.$emit('speak', 'English');
}, 1000);