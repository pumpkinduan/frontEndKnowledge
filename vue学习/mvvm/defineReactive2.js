//第二种写法,参照github上染陌的写法,更简便,更加直观
//不考虑数组与对象的写法
function obeserve(data, render) {//监听一组数据
    Object.keys(data).forEach( (key) => defineReactive.call(this, key, data, data[key], render) );
}
function defineReactive(key, obj, value, render) {
    const that = this;//mvvm实例
    Object.defineProperty(obj, key, {
        writtable: true,
        configurable: true,
        get: function () {
            return value;
        },
        set: function (newValue) {
            value = newValue;
            render(that.el, that.originTemplate, that._data);
        }
    })
}