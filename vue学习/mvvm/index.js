// import {Watcher} from './dependency';
//将视图与数据建立映射关系
//以mvvm为中心进行建立
function MVVM(option) {
    //拿到根元素与其子元素所需依赖的数据
    this.el = document.getElementById(option.el);
    this._data = option.data;
    //保存根元素的模板,避免重复访问innerHTML
    this.originTemplate = this.el.innerHTML;
    //定义vue实例下的一个watcher对象
    let watcher = new Watcher(this, localRender);
    //将data中的数据变为响应式的,且数据变动重新渲染
    //第一种写法:
    defineReactive.call(this, this._data, localRender);
    //第二种写法
    // obeserve.call(this, this._data, localRender);
    this.mapping = new Map();//将模板与结点建立一对多的映射关系 --> {{name}} -> [node,node]
    this.vnode = createVirtualDom.call(this, this.el);
    wholeRender.call(this);
}
//在指定的模板字符串中解析出{{}}的这种模板并放入数组中
function parseTemplate(originTemplate) {
    return originTemplate.match(/{{[A-z_]+[0-9]*}}/g);
}
//每次更新data的数据时都会进行网页的重新渲染
/*
function render(el, originTemplate, _data) {
    var templates = parseTemplate(originTemplate);
    var result  = originTemplate;
    for ( var i = 0; i < templates.length; i ++ ) {
        var tempValue = removeBraces(templates[i]);
        //data中的属性在模板{{}}中存在,则将data中的数据与模板进行替换
        //如:   _data:{name: pumpkin} <--> <span>{{name}}</span>  ==> <span>pumpkin</span>
        if ( _data[tempValue] ) {
            result = result.replace(templates[i], _data[tempValue]);
        }
    }
    el.innerHTML = result;
}
*/

//每次更新data的数据时会渲染只变化的那部分
//用于改变data时的渲染,也就是响应式数据的set函数调用
function localRender(changedAttr) {
    //changedAttr为data中改变的那个属性名,只对改变的那个属性名对应的模板进行渲染
    console.log('localRender')
    const mapping = this.mapping;
    const _data = this._data;
    if ( mapping.has(changedAttr) ) {
        let val = _data[changedAttr];
        let textNodeArr = mapping.get(changedAttr); 
        for ( let j = 0; j < textNodeArr.length; j ++ ) {//模板对应的文本结点的数组集合
            textNodeArr[j].nodeValue = val;
        } 
    }
}

//初始化时网页的整体渲染
function wholeRender() {
    console.log('init wholeRender')
    const mapping = this.mapping;
    const _data = this._data;
    var keys = mapping.keys(); //{ 'name',... }
    for ( let tempAttr of keys) {
        let tempVal = _data[tempAttr];
        if ( tempVal ) {
            let textNodeArr = mapping.get(tempAttr);
            // console.log(textNodeArr)
            for ( let j = 0; j < textNodeArr.length; j ++ ) {//模板对应的文本结点的数组集合
                textNodeArr[j].nodeValue = tempVal;
            }
        }
    }
}
//第一种写法  体现思想
function defineReactive(obj) {
    const self = this; //mvvm实例
    let proxyObj = deepClone(obj);
    //进行依赖收集
    let dep = new Dep();
    //注意,由于闭包的存在,这里要用let
    for (let tempAttr in obj) {
        if (obj[tempAttr] instanceof Object) {
            defineReactive(obj[tempAttr]);
        } else {
            Object.defineProperty(obj, tempAttr, {
                writtable: true,
                configurable: true,
                get: function () {
                    if ( Dep.target ) {
                        dep.addSub(tempAttr, Dep.target);
                    }
                    return proxyObj[tempAttr];
                },
                set: function (newValue) {
                    if ( newValue === proxyObj[tempAttr] ) return;
                    proxyObj[tempAttr] = newValue;
                    //set函数形成的闭包中保存了每个属性名
                    dep.notify(tempAttr);//通知watcher对变动的依赖项进行重新render
                }
            })
        }
    }
}

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
//扒{{name}} --> 属性名'name'
function removeBraces(template) {
    return template.substring(2, template.length - 2);
}
//虚拟DOM,用来描述真正的DOM结点
function VNode(node, type, nodeValue) {
    this.node = node;
    this.type = type;
    this.children = [];
    this.value = nodeValue;
    this.appendChild = function(vnode) {
        if ( !(vnode instanceof VNode) ) {
            throw 'node is not a vnode';
        } else {
            this.children.push(vnode);
        }
    }
}

//构建虚拟DOM
function createVirtualDom(node) {
    let tempVNode = new VNode(node, node.nodeType, node.nodeValue);
    for ( var i = 0; i < node.childNodes.length; i ++ ) {
        var child = node.childNodes[i];
        if ( child.nodeType === 1 ) {//dom and text node
            var vnode = createVirtualDom.call(this, child, child.nodeType, child.nodeValue);
            tempVNode.appendChild(vnode);
        } else if ( child.nodeType === 3 ) {
            var vnode = createVirtualDom.call(this, child, child.nodeType, child.nodeValue);
            tempVNode.appendChild(vnode);
            //解析{{name}}这类的模板字符串(文本结点)
            var templateArr = parseTemplate(child.nodeValue);
            //将模板字符串{{name}}与其所在的文本结点形成一对多的映射
            //因为模板字符串{{name}}可在在多个文本结点中使用
            for ( let j = 0, l = templateArr && templateArr.length; templateArr && j < l; j ++ ) {
                if ( this.mapping.has(templateArr[j]) ) {
                    let tempArr = this.mapping.get(templateArr[j]);
                    tempArr.push(child);
                    this.mapping.set( templateArr[j], tempArr);
                } else {
                    this.mapping.set(removeBraces(templateArr[j]), [child]);
                    //{name => [textNode]}
                }
            }
        } else {
            continue;
        }
    }
    return tempVNode;
}

//依赖收集
class Dep {
    constructor() {
        this.subs = new Map();//保存所有watcher实例
    }
    addSub(key, watcher) {
        let subs = this.subs;
        if ( !subs.has(key) ) {
            subs.set(key, [watcher]);
        } else {
            subs.get(key).push(watcher);
        }
    }
    notify(changedAttr) {
        // console.log(this.subs.get('name') === this.subs.get('age'));
        if ( this.subs.has(changedAttr) ) {
            //当所依赖的data中的属性发生变化时,触发对应的那一个watcher实例去更新页面,而不是触发所有watcher实例
            //在这里由于一个vue实例下对应着一个watcher实例,所以所有data中的属性对应的watcher其实都是一样的
            this.subs.get(changedAttr).update(changedAttr);
        }
    }
}

//观察者,依赖项数据变动重新render
class Watcher {
    constructor(vm, render) {
        this.vm = vm;
        this.render = render;
    }
    update(changedAttr) {
        console.log('update')
        this.render.call(this.vm, changedAttr);
    }
}