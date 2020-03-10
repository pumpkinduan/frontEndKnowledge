class MVue {
    constructor(options) {
        this.$options = options;
        this.$el = options.el;
        this.$data = options.data || {};
        if (!options.el) {
            throw new Error(options.el + 'must not be empty')
        }
        // 1.实现响应式数据类
        new Observer(this.$data)
        // 2.实现指令解析器
        new Compiler(this, this.$el);
        this.proxyData(this.$data)
    }
    proxyData(data) { //代理data中的属性，实现this.age 等同于this.$data.age
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                get() {
                    return data[key];
                },
                set(newVal) {
                    data[key] = newVal;
                }
            })
        })
    }
}