### 简单介绍

`redux`是一个全局的状态管理工具库，类似`Vuex`，思想都是一样的，存储多个组件所共有的状态数据，不过在写法上和思想上与 Vuex 还是很不一样的。

> redux 是一个独立出来的 JavaScript 状态容器，不受限与 react，它还可以与其他框架进行搭配使用，甚至是纯 JS

> 如果你不知道是否需要 Redux，那就是不需要它。

### 核心思想

`redux`

### Store

Store 对象中存储了所有的数据，不同并没有暴露出来，它对外提供了四个接口:

1. dispatch(action): 用于发送 Action 给 reducer
2. subscribe(fn)：订阅回调函数，若是 state 更新则会触发回调函数的执行
3. getState：获取当前的 state，所有的数据都是存储在该对象中的
4. replaceReducer

通过`createStore`创建全局唯一的 store 对象：

```js
import { createStore } from "redux";
const store = createStore(reducer);
const state = Store.getState(); // 可查看该对象
```

### Action

一个`Action`就是一个纯 JS 对象，附加了最新的`state`数据，可以理解为一个**更新指令，它有最新通知**，它有个`type`属性，必须配备，描述该 Action 的名称，最好表明出该指令是做什么的：

```js
const addTodo = {
  type: "ADD_TODO", // 明确表示出该action用于添加一条待办事项
  content: "Learn React and Redux", // 待办事项的内容，也就是最新的state数据
};
```

**改变 State 的唯一方法就是使用 Action**

### Action Creator

如果 View 需要发送同类型不同内容的 Action, 若是都手写则非常麻烦，这时可以定义一个函数来生成 Action，这就是 Action Creator。

```js
// 手写
const addTodo1 = {
  type: "ADD_TODO", // 明确表示出该action用于添加一条待办事项
  content: "Learn React and Redux", // 待办事项的内容，也就是最新的state数据
};
const addTodo2 = {
  type: "ADD_TODO", // 明确表示出该action用于添加一条待办事项
  content: "Learn Vue and Vuex", // 待办事项的内容，也就是最新的state数据
};
// Action Creator: addTodo
const addTodo = (content) => {
  return {
    type: "ADD_TODO",
    content,
  };
};
// 这样只需每次调用该函数，并传递不同的内容即可生成不同的action
```

### Reducer

Reducer 是一个函数，用于计算 State，它接收两个参数，分别是 State 和 Action, 通过计算返回一个**全新的 state**出去，这个过程中，不应该改变原来的 state，而是生成一个拥有原对象上的数据的新对象，在该对象上进行操作。这样任何时候，与某个 View 对应的 State 是一个不变的对象

```js
const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { content: action.content }];
    default:
      return state;
  }
};
```

#### Reducer 应当遵循的原则

- 它必须是纯函数，相同的输入得到相同的输出
  - 函数内不得改写参数
  - 不能调用系统 I/O 的 API
  - 不能调用 Date.now()等不纯的方法，每次结果不一样
- 返回值不能为 undefined

#### Reducer 的拆分与组合

当应用变得更加庞大时，用一个 reducer 函数来处理整个 State 肯定是非常困难的，这时可以把 reducer 拆分成小的 reducer，每个 reducer 处理对应的 state，最后将这些小的 reducer 组合成一个大的 Reducer 即可，就好比组件化。

```js
// 处理todos的逻辑，生成新的todo
const todos = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { content: action.content }];
    default:
      return state;
  }
};

// 处理todos的展示状态，是显示完成的还是未完成的...
const visibilityFilter = (state='SHOW_ALL', action) => {
  switch (action.type) {
    case "VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};
```
可以借助`combineReducers`将这两个reducer组合成一个大的reducer，这个大的reducer是传给`createStore`函数用来初始化的
```js
import {combineReducers} from 'redux'
import {todos} from './todos'
import {visibilityFilter} from './visibilityFilter'
export const todoApp = combineReducers({
    todos,
    visibilityFilter
})
```
##### combineReducers函数
该函数接收一个对象，是所有子reducer的集合，它返回一个整体reducer函数，名为`combination`, 返回的`combination`函数执行时，会依次执行所有的子reducer函数，把每次得到的state结果进行整合，最后返回一个**整体的state对象**。  
  

##### reducer函数与dispatch的关系  

    
其实在每次`dispatch`函数执行分发action时，会自动执行reducer函数，dispatch内部已经写好了，所以我们在外界不用去执行reducer了，只需要完成reducer的整合，把`大reducer`传给`createStore`即可  
  
##### combineReducers(reducers)函数传参的注意点
reducers对象的key会成为整体state对象的key，所以该函数会依据State的key去执行相应的子reducer函数，最好的办法是让整体state对象的key与子reducer函数名相同，避免报错

### 工作流程