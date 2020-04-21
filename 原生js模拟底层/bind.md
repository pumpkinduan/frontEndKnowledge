### bind

> bind 方法会创建一个新的函数，并返回出去。当这个新的函数被调用时，bind 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )

简单来说，bind 返回一个原函数的拷贝(实际是一个包装原函数的函数)，并拥有指定的 this 值和初始参数，返回的函数也可以传入参数

```js
var person = {
  name: "Tom",
  age: 19,
};
function test(age, name) {
  this.age = age;
  this.name = name;
  console.log(age); // 21
  console.log(name); // Yilia
  return 123;
}
var bindTest = test.bind(person, 21); // 初始参数
console.log(bindTest("Yilia")); // 123
console.log(person); // {name: 'Yilia', age: 21}

// var bindTest = test.bind(person);
// 传入参数
// bindTest(22, 'Pumpkin'); // 3 Jack
```

#### 第一版本

```js
function myBind(thisArg) {
  var _this = thisArg; // 返回的新函数的this
  var fn = this; // 拿到原函数
  var args = [].slice.call(arguments, 1); // 收集预设参数
  return function () {
    // 返回一个包装原函数的新函数
    // 将预设参数与传的参数整合并执行原函数
    // 另外，将原函数return出去的值也return出去，避免新函数的返回值一直为undefined
    return fn.apply(_this, args.concat([].slice.call(arguments)));
  };
}
```

当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效

```js
function test(age, name) {
  this.age = age;
  this.name = name;
  console.log(age); // 21
  console.log(name); // Yilia
}
var bindTest = test.bind(person, 21); // 初始参数
var obj = new bindTest("Yilia");
test.prototype.num = 111;
console.log(obj.num); // 111
```

从打印出来 this.num 值为 111 可以看出，bind 返回的新函数的 prototype 指向了原函数的 prototype

#### 第二版本(实现继承)

```js
function myBind(thisArg) {
  var _this = thisArg;
  var fn = this;
  var args = [].slice.call(arguments, 1);
  var _ = function () {
    return fn.apply(_this, args.concat([].slice.call(arguments)));
  };
  _.prototype = fn.prototype;
  return _;
}

var bindTest = test.myBind(person, 21); // 初始参数
var obj = new bindTest("Yilia");
test.prototype.num = 111;
console.log(obj.num); // 111
```

#### 第三版本

上面这个继承的实现不好，新函数与原函数都指向了同一块，我们直接修改 bindTest.prototype 的时候，也会直接修改原函数 test 的 prototype，这时候可以借助一个中间函数实现

```js
function myBind(thisArg) {
  var _this = thisArg;
  var fn = this;
  var args = [].slice.call(arguments, 1);
  var f = function () {};
  var _ = function () {
    return fn.apply(_this, args.concat([].slice.call(arguments)));
  };
  f.prototype = fn.prototype;
  _.prototype = new f();
  return _;
}
```
