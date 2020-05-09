### 定义

队列是具有一定操作约束的线性表，只能在一端插入，而在另一端删除，遵循先进先出的原则

#### 队列的顺序存储(数组实现)

由一个**一维数组**和一个记录队列头元素位置的变量**front**以及一个记录队尾元素位置的变量**rear**组成

##### 单向队列

```js
class Queue {
  constructor() {
    this.queue = [];
  }
  enqueue(x) {
    this.queue.push(x);
  }
  dequeue() {
    return this.shift();
  }
  isEmpty() {
    return this.queue.length === 0;
  }
  getLength() {
    return this.queue.length;
  }
  getHeader() {
    return this.queue[0];
  }
}
```

这种方式的实现在 JS 中代码量很少，主要是因为 JS 提供了 push 和 shift 操作，可以很方便的实现先进先出原则，不过 JS 中数组的内存空间是动态分布的，当进行出列操作时(shift 操作)时，数组大小会自动减 1，这时候会遍历其他元素，将它们的位置都往前移动一位，所以每次出列的时间复杂度为 O(n)

##### 循环队列

利用循环队列可以在出列时，所执行的操作时间复杂度为 O(1)

它可以看成是一个圆环的结构样式，所以事先必须要给数组指定一个大小，若不断入列的元素个数之和大于规定大小，可以报错或是对数组进行扩容操作，将圆环变大

```js
class Queue {
  constructor(length = 6) {
    this.queue = new Array(length);
    this.size = 0;
  }
  init() {
    this.front = 0; // 记录队列头元素位置
    this.rear = -1; // 记录队尾元素位置
  }
  enqueue(x) {
    if (this.isEmpty()) {
      this.init();
    }
    if (this.isMaxsize()) throw new Error("队列已满");
    this.rear = ++this.rear % this.getLength();
    this.queue[this.rear] = x;
    this.size++;
    return x;
  }
  getLength() {
    return this.queue.length;
  }
  isMaxsize() {
    return this.size === this.getLength();
  }
  isEmpty() {
    return this.size === 0;
  }
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("队列为空");
    }
    let item = this.queue[this.front];
    this.queue[this.front] = null;
    this.front = ++this.front % this.getLength();
    this.size--;
    return item;
  }
}
let q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.enqueue(4);
q.enqueue(5);
q.enqueue(6);
q.dequeue();
q.dequeue();
q.dequeue();
q.dequeue();
q.dequeue();
q.dequeue();
q.enqueue(7);
q.enqueue(8);
console.log(q);
```
