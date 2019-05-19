let Person = function (name, age) {
    this.name = name;
    this.age = age;
    // return function () {};
    // return {};
    // return [];
    // return true;
}
//在对函数使用new操作符时,若是函数本身返回的值为引用类型的值,如:array,object,function,则会返回对应的引用类型的值
//若是简单数据类型的值,则会返回实例化对象this
// console.log( new Person('pum', 18) instanceof Person);

//new操作符原理：
/**
 * 1.在构造函数内创建一个对象,该对象的原型为Object.prototype
 * 2.让该对象的__proto__ 指向构造函数的prototype
 * 3.改变构造函数内的this指向,使其指向该对象,为了获取属性,方法
 * 4.1若是构造函数的返回值为简单类型的值,则返回该对象
 * 4.2若为复杂类型的值,则返回函数应当返回的值
 */
//模拟new
function New(callback) {
    var temp = {};
    if(callback.prototype == null) { console.warn(callback + '.prototype == null');}
    temp.__proto__ = callback.prototype;
    var args = [].slice.call(arguments ,1);
    var res = callback.apply(temp, args);
    if ( (typeof res === 'object' || typeof res === 'function') && res ) {//null也是对象类型
        return res;
    }
    return temp;
}
var Animal = function(name, age) {
    this.name = name;
    this.age = age;
    return {}
}
Animal.prototype.eat = function() {
    console.log('I can eat with my teeth')
}
// console.log( New(Animal, 'dog', 2).eat() );
console.log( New(Animal, 'dog', 2) );