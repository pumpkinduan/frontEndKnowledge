### 普通函数与Generator函数的区别
- 普通函数的执行是一路走到底(执行完内部所有代码)，不会中途停止执行; 而Generator函数可以中途停止执行，不过依靠`yield`表达式，它是暂停的标志
### Generator函数的介绍
Generator函数定义时，需要在`function`和函数名之间加上`*`，函数体内部使用`yield`表达式    
Generator函数在**调用时不会执行**，而是返回一个遍历器对象，这个遍历器对象有一个`next方法`，我们可以调用next方法来依次执行，直到遇见`yield`后暂停执行。简单说，Generator函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行  
```js
function* sayHiGenerator(a, b) {
    yield 'hi';
    console.log(a); // 1
    yield 'this is pumpkin';
    console.log(b); // 2
    return 'done';
}
let gen = sayHiGenerator(1, 2);
gen.next(); // {value: 'hi', done: false}
gen.next(); // {value: 'this is pumpkin', done: false}
gen.next(); // {value: "ended", done: true}
```
### yield表达式
Generator函数返回的遍历器对象的`next`方法运行的逻辑如下：  
1. 遇到`yield`表达式，就会暂停执行后面的代码，并将紧跟在`yield`后面的表达式的值，作为返回对象的`value`属性值
2. 下一次调用`next`方法时，再继续执行后面的代码，直到遇见下一个`yield`表达式，重复1步骤
3. 如果没有遇到新的`yield`，就一直运行到函数结束，直到`return`语句为止，并将return语句后面表达式的值，作为返回对象的`value`属性值  
> `yield`后面的表达式，只有当调用`next`方法，内部执行到该语句时才会执行，相当于**惰性求值**
### next方法的参数
`yield`表达式本身的返回值总是`undefined`，不过我们可以`next`方法传一个参数进去，这个参数就被作为**上一个**`yield`表达式的值，所以第一次调用`next`方法传递的参数就没有效果了  
```js
function* foo() {
    var number = yield 2;
    console.log(number); // 3
}
let gen = foo();
gen.next(11);
gen.next(3);
```
可以利用这个功能，在函数运行的不同阶段从外部想函数内部注入值，从而调整函数的行为.
### yield* 表达式
`yield*`后面跟着的是一个遍历器对象，等同于利用`for of`循环遍历该遍历器对象
```js
function* foo(x) {
    yield 1;
    yield* [11,22,33];
    // yield* bar();
    // for(var i of bar()) {
    //     console.log(i)
    // }
    yield 2;
    yield 3;
}
function* bar() {
    yield 11;
    yield 22;
    yield 33;
    return 111
}
let gen = foo(11);
for (var i of gen) {
    console.log(i) // 1 11 22 33 2 3
}
```