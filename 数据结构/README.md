### 数据结构的定义
> 数据结构是数据元素相互之间存在的一种和多种特定关系的集合  
这些元素集合的关系可以从两个维度来理解 => **逻辑结构和存储结构**
#### 逻辑结构
逻辑结构指的是数据元素之间的关系，分为线性结构和非线性结构  
  
线性结构：一串有序串连的冰糖葫芦，除去头尾，每个葫芦都是首尾相连的，而葫芦之间是一对一的关系，这种有序数据的集合就叫做线性结构    
  
常见的线性结构有(线性表)：栈、队列、链表 
  
非线性结构：每个数据元素的关系不再是一对一，而是一对多或多对多，而且各个数据元素不在一个线性序列中  
  
常见的非线性结构有：二维数组、树、图
#### 线性表
定义：由同类型的**数据元素**构成**有序序列**的线性结构，元素彼此间相邻，如数组，栈，队列，链表
- 表中元素个数称为线性表的**长度**
- 线性表没有元素时，称为**空表**
- 表起始位置称为**表头**，表结束位置称为**表尾**
  
1. 线性表可以使用`顺序存储`实现 => 数组  
    - 优点是查找和删除元素速度快(时间复杂度为O(1))
    - 缺点是插入元素慢，因为是一个一个元素进行移动(时间复杂度为O(n))

2. 线性表也可以使用`链式存储`实现 => 链表
    - 优点是插入元素快(直接改指针指向即可)(时间复杂度为O(1))
    - 缺点是查找和删除元素慢，需要遍历才能查询到元素(时间复杂度为O(n)) 


