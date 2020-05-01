### 栈

栈是一种线性结构，遵循先进后出的原则，即为：先入栈的元素要最后才可出栈

#### 栈的顺序存储

它由一个一维数组和一个记录栈顶元素位置的变量组成

```js
class Stack {
  constructor() {
    this.top = -1; // 代表空栈
    this.stack = []; // 数组表示栈的顺序存储结构
    this.maxSize = 31; // 栈的容量
  }
  push(...item) {
    if (this.top < this.maxSize) {
      this.stack.push(...item);
      this.top += arguments.length;
      return item;
    } else {
      throw new Error("栈溢出");
    }
  }
  pop() {
    if (this.top !== -1) {
      this.top--;
      return this.stack.pop();
    }
  }
  getMin() { // 检索栈中的最小元素
    
  }
  empty() {
    this.stack = [];
    this.top = -1;
    return true;
  }
  peek() {
    // 获取栈顶元素
    return this.stack[this.top];
  }
  isEmpty() {
    return this.top === -1;
  }
}
```

#### 题目 1

给定一个只包括 '('，')'，'{'，'}'，'[' ，']' 的字符串，判断字符串是否有效。  
有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

```js
输入: "()";
输出: true;

输入: "()[]{}";
输出: true;

输入: "([)]";
输出: false;

输入: "{[]}";
输出: true;
```

```js
/*
遇到左括号一律入栈，当遇到相匹配的右括号时，从栈顶pop出栈，最后栈的长度为0，则为合法字符串。
将所有互相匹配的括号类型用分别一组相反数进行表示，左括号为正数，右括号为负数，相加等于0则可以出栈。

1. 如果字符串的长度为奇数，则直接return false，节省执行时间
2. 如果栈不为空，下一个入栈的元素对应的数字小于0，且与栈顶元素对应的数字之和不等于0，则提前return false，节省执行时间
*/
var isValid = function (str) {
  if (str.length % 2) return false; // 直接结束
  let len = str.length;
  let stack = [];
  let map = {
    "(": 1,
    ")": -1,
    "[": 2,
    "]": -2,
    "{": 3,
    "}": -3,
  };
  let temp;
  for (let i = 0; i < len; i++) {
    temp = map[str[i]];
    if (temp + map[stack[stack.length - 1]] === 0) {
      stack.pop();
    } else {
      if (temp < 0) return false; // 提前结束
      stack.push(str[i]);
    }
  }
  return stack.length === 0;
};
```

#### 栈的链式存储

栈的链式存储结构实际上是一个**单链表**，称为**链栈**。  
插入和删除操作都只能在链栈的栈顶进行，因为在进行删除操作时，只有通过栈顶指针可以循环遍历整个链栈的元素，而如果选择在栈底进行删除操作，则无法找到下一个元素

```js
class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}
class ListStack {
  constructor() {
    this.size = 0;
    // this.top 指向栈顶节点
    // this.head 指向入栈的第一个节点，也就是栈底节点
    // 通过this.top获取栈顶元素节点，并实现push操作
    // 通过this.head可以遍历整个栈结构的元素节点，并实现pop操作
    this.top = this.head = null;
  }
  push(value) {
    if (!this.top) {
      this.top = this.head = new Node(value, null);
    } else {
      this.top.next = new Node(value, null);
      this.top = this.top.next;
    }
    this.size++;
  }
  pop() {
    if (this.size === 0) return null;
    let current = this.head;
    if (this.size === 1) {
      this.top = this.head = null;
      this.size = 0;
      return current;
    }
    let temp = null; // 保存倒数第二个节点，将其next指向null，实现删除最后一个节点
    while (current) {
      if (!current.next) {
        this.top = temp;
        temp.next = null;
        this.size--;
        return this.top;
      }
      temp = current;
      current = current.next;
    }
  }
}
let s = new ListStack();
s.push(1);
s.push(2);
s.push(3);
s.push(4);
s.pop();
console.log(s);
```
