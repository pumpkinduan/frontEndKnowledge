const updateUtiler = { //实际是渲染函数
    getValue(vm, expr) {
        // 处理 变量或表达式为msg perosn.sex之类的
        return expr.split('.').reduce((data, currentVal) => {
            return data[currentVal];
        }, vm.$options.data)
    },
    setInputVal(vm, expr, inputVal) {
        expr.split('.').reduce((data, currentVal) => {
            if (data[currentVal] instanceof Object) { //处理v-model="persons.sex"之类的
                return data[currentVal];
            } else {
                data[currentVal] = inputVal;
            }
        }, vm.$options.data)
    },
    template(vm, node, nodeValue, exprArr) { //处理模板语法 {{}}
        // exprArr表示该文本节点内依赖的模板
        // 如： <span>{{msg}}-{{persons.sex}}</span> 该文本节点依赖两个模板
        exprArr.forEach(expr => {
            new Watcher((oldVal) => {
                let newVal = node.nodeValue;
                newVal = newVal.replace(oldVal, this.getValue(vm, removeBraces(expr)));
                node.textContent = newVal;
                console.log('template')
            })
            //将文本节点的字符串内容中的模板进行值的替换，其他文本照常保留
            //如：<span>{{msg}}--{{persons.sex}}</span> 文本中原来的‘--’保留
            nodeValue = nodeValue.replace(expr, this.getValue(vm, removeBraces(expr)))
        })
        node.textContent = nodeValue;
    },
    text(vm, node, expr) { //处理 v-text
        new Watcher(() => {//更新视图的回调函数
            node.textContent = this.getValue(vm, expr);
            console.log('text')
        })
        node.textContent = this.getValue(vm, expr);
    },
    html(vm, node, expr) {//处理 v-html
        new Watcher(() => {
            node.innerHTML = this.getValue(vm, expr);
            console.log('html')
        })
        node.innerHTML = this.getValue(vm, expr);
    },
    model(vm, node, expr) {//处理 v-model
        new Watcher(() => {
            node.value = this.getValue(vm, expr);
            console.log('model')
        })
        //实现 视图驱动数据
        node.addEventListener('input', (e) => {
            this.setInputVal(vm, expr, e.target.value);
        }, false);
        node.value = this.getValue(vm, expr);
    },
    on(vm, node, expr, eventName) {//处理 v-on
        node.addEventListener(eventName, vm.$options.methods[expr].bind(vm), false)
    }
}
class Compiler {
    constructor(vm, el) {
        let root = el && el.nodeType === 1 ? el : document.querySelector(el);
        if (!root) throw new Error(el + ' is not a node!!!');
        this.el = root;
        this.vm = vm;
        let fragment = this.createFragment(root);
        //解析'v-text,v-html,v-model,v-on:click'指令和{{}}模板语法，
        //对用到上述语法的文档碎片里的每个子节点的值进行替换
        this.compiler(fragment);
        //将更改后文档碎片里的子节点添加到页面中
        this.el.appendChild(fragment);
    }
    compiler(el) {
        let childNodes = Array.from(el.childNodes);
        childNodes.forEach((node) => {
            if (this.isElementNode(node)) { //处理元素节点
                this.compileElementNode(node);
            } else if (this.isTextNode(node)) { //文本节点
                this.compileTextNode(node);
            }
            //递归处理嵌套子节点： <p>我是一个p标签 <span v-text="age"></span></p>
            if (node.childNodes && node.childNodes.length) {
                this.compiler(node);
            }
        })
    }
    compileElementNode(node) { //实际是解析指令
        let attributes = [...node.attributes]; // [v-text, class...]
        attributes.forEach(attrObj => {
            let {
                name,
                value
            } = attrObj; // v-text="msg" => name: v-text, value: msg;
            if (this.isDirective(name)) {
                const [, tempAttrName] = name.split('-'); //处理 v-text v-html v-on:click
                const [attrName, eventName] = tempAttrName.split(':');
                //利用解析工具对象渲染text，html，model内容以及on事件的绑定
                if (!this.vm.$options.data) return;
                updateUtiler[attrName](this.vm, node, value, eventName);
                //删除元素上自定义的指令属性 v-text...
                node.removeAttribute(name)
            }
        })
    }
    compileTextNode(node) { //实际是解析模板语法
        // 处理 {{msg}} {{persons.sex}}
        let nodeValue = node.nodeValue;
        if (nodeValue.indexOf('{{') !== -1) {
            let exprArr = parseTemplate(nodeValue);
            if (!this.vm.$options.data) return;
            updateUtiler['template'](this.vm, node, nodeValue, exprArr);
        }

    }
    isDirective(attrName) {
        // 区分 v-text 与 class之类
        return attrName && attrName.startsWith('v-');
    }
    isElementNode(node) {
        return node.nodeType === 1;
    }
    isTextNode(node) {
        return node.nodeType === 3;
    }
    createFragment(el) {
        //获取文档碎片，放入内存减少页面的回流与重绘.
        const fragment = document.createDocumentFragment();
        let firstChild;
        //将el元素内的所有子节点放到文档碎片对象中去
        while (firstChild = el.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
    //构建虚拟DOM
    createVirtualDom(node) {
        let tempVNode = new VNode(node, node.nodeType, node.nodeValue);
        let childNodes = Array.from(node.childNodes);
        childNodes.forEach(child => {
            let vnode = this.createVirtualDom(child, child.nodeType, child.nodeValue);
                tempVNode.appendChild(vnode);
            // if (this.isElementNode(child)) {
            //     let vnode = this.createVirtualDom(child, child.nodeType, child.nodeValue);
            //     tempVNode.appendChild(vnode);
            // } else if(this.isTextNode(child)) {
            //     let vnode = this.createVirtualDom(child, child.nodeType, child.nodeValue);
            //     tempVNode.appendChild(vnode);
            // }
        })
        return tempVNode;
    }
}