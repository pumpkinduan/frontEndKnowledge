### 浏览器端存储数据
以往在浏览器端存储数据都是利用cookie技术，在H5之后，出现了另外两个用于将数据保存在浏览器中的对象，一个是**sessionStorage**，一个是**localStorage**，这两个对象是Storage的实例化对象，并且都是window对象上的属性，它们的目标都是保存数据，不过也有不同之处。  
#### sessionStorage
sessionStorage保存的数据用于浏览器的一次会话，当会话结束后，数据会被清空，*会话的结束通常指的是当前浏览器窗口的关闭*  
作用域的范围是**相同的协议+相同的主机名+相同的端口号+同一个窗口**，也就是或在这个范围下可以读取和修改同一份sessionStorage数据
#### localStorage
localStorage保存的数据会长期存在，下一次访问网站的时候，网页可以直接读取之前保存过的数据，作用域的范围是**相同的协议+相同的主机名+相同的端口号**，也就是或在这个范围下可以读取和修改同一份localStorage数据
#### 二者的存储大小
sessionStorage和localStorage存储的数据大小：在IE下为10MB，谷歌下为2.5MB，火狐和欧朋下是5MB
#### 部署的API
这两个对象上部署的API及其用法完全相同，分别由getItem(key)，setItem(key, value)，clear和removeItem(key).  
sessionStorage和localStorage保存的数据都是以`键值对`的形式存在，key是键名，而value是存入的数据，这个value是以字符串的形式被保存的，也就是文本格式，若是引用类型的值，则会被进行强制转化，如：{} => '[object Object]'，[1,2] => `1,2`
#### storage事件
当存储的数据发生变化时，会触发该事件，如下：  
```js
window.addEventListener('storage', (event) => {
    console.log(event)
})
```
event有四个属性：  
- oldValue: 更新前的值，若是该键名为新增的，则返回null
- newValue: 更新后的值，若是该键名被删除，则返回null
- url：原始触发storage事件的那个网页地址
- key：发生变化的键名  
*该事件不会在导致数据变化的当前页面触发，若是浏览器同时打开一个域名下面的多个页面，某一个页面改变了sessionStorage和localStorage数据时，其他所有页面的storage事件会被触发，而原始页面不会，这种机制可以实现多个窗口之间的通信*

