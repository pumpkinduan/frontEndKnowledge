### 链表

一个元素对象本身存储着自身的数据值和下一个元素的指针地址，这样的一系列元素对象构成了链表结构，它也是线性的结构

### 单链表的实现

```js
class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}
class LinkedList {
  constructor(value = null, next = null) {
    // 用头结点表示整个列表
    this.head = new Node(value, next); // 头结点
    this.rear = null; // 指针指向尾节点
    this.size = 0; // 链表长度
  }
  isEmpty() {
    return this.size === 0;
  }
  addAtHead(val) {
    // 在链表的第一个元素之前添加一个值为 val 的节点。
    // 插入后，新节点将成为链表的第一个节点。

    /*
        1. 新创建一个值为val的结点，并用cur表示
        2. 将cur结点的next指针指向头结点head
        3. 将cur结点作为当前链表的头结点
    */
    let cur = new Node(val, null);
    if (!this.isEmpty()) {
      cur.next = this.head;
      this.head = cur;
    } else {
      this.head = cur;
      this.rear = cur;
    }
    this.size++;
    return true;
  }
  get(index) {
    // 获取链表中第 index 个节点的值，如果索引无效，则返回-1
    if (index < 0 || index > this.size - 1) return -1;
    let target = this.head;
    while (index > 0) {
      index--;
      target = target.next;
    }
    return target.value;
  }
  addAtTail(val) {
    // 将值为 val 的节点追加到链表的最后一个元素
    let cur = new Node(val, null);
    if (!this.isEmpty()) {
      this.rear.next = cur;
      this.rear = this.rear.next;
    } else {
      this.head = cur;
      this.rear = cur;
    }
    this.size++;
    return true;
  }
  addAtIndex(index = 0, val) {
    // 在链表中的第 index 个节点之前添加值为 val 的节点
    // 如果 index 等于链表的长度，则该节点将附加到链表的末尾
    // 如果 index 大于链表长度，则不会插入节点
    // 如果 index 小于0，则在头部插入节点
    if (index > this.size) return;
    if (index <= 0) {
      return this.addAtHead(val);
    }
    if (index === this.size) {
      return this.addAtTail(val);
    }
    let prev = new Node(null, null),
      next = this.head;
    let cur = new Node(val, null);
    while (index) {
      prev = next;
      next = next.next;
      index--;
    }
    prev.next = cur;
    cur.next = next;
    this.size++;
  }
  deleteHead() {
    let cur = this.head;
    this.head = this.head.next;
    return cur;
  }
  deleteAtIndex(index) {
    //删除链表中的第 index 个节点

    // 删除结点必须知道三个连续结点的位置
    // 1. current 当前被删除的结点
    // 2. pre 当前被删除的结点的上一个结点
    // 3. next 当前被删除的结点的上下一个结点
    if (index > this.size - 1 || index < 0) return;
    if (index === 0) {
      return this.deleteHead();
    }
    let prev = null;
    let cur = this.head,
      next = cur.next;
    while (index) {
      prev = cur;
      cur = next;
      next = cur.next;
      index--;
    }
    if (!next) {
      // 表示删除了尾结点，修正rear的指向
      this.rear = prev;
    }
    prev.next = next;
    this.size--;
    return cur;
  }
  formCycle(pos) {
    // 形成环形链表
    // pos正整数 表示链表尾连接到链表中的位置(索引从 0 开始)
    if (pos >= this.size - 1) throw new Error("错误索引");
    this.rear.next = this.get(pos);
  }
  hasCycle() {
    // 判断链表是否有环
    if (!this.head) return false;
    // 利用hash map来存储每次遍历到的元素结点，如果有环，那么就会在hash map中找到对应的节点
    var map = new Map();
    var cur = this.head;
    while (cur) {
      if (!cur.next) return false;
      map.set(cur, true);
      if (map.has(cur.next)) return true;
      cur = cur.next;
    }
    return true;
  }
  /*
  hasCycle() {
    // 利用双指针, 一快一慢，若是构成环，则两指针必会相遇,即相等
    if (!this.head) return false;
    var slow = this.head;
    var fast = this.head;
    while (true) {
      if (!fast || !fast.next) return false;
      slow = slow.next;
      fast = fast.next.next;
      if (slow === fast) return true;
    }
  }
  */
}
let list = new LinkedList();
list.addAtTail(1);
list.addAtTail(3);
list.addAtIndex(0, 0);
console.log(list);
```
