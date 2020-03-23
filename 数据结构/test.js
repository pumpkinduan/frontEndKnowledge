// 生成二叉树结点
// 每一个结点包含一个数据域、左右孩子结点的引用
class Node {
    constructor(value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
    show() { //显示当前结点的值
        console.log(this.value);
    }
}
class Tree {
    constructor(value) {
        // 初始化一个根结点，刚开始时并没有左右孩子结点，所以传参为null
        this.root = null;
    }
    insert(value) { //插入结点
        let current = this.root;
        let parent = null;
        let node = new Node(value);
        while(current) {
            parent = current;
            if (value < parent.value) { //结点的值比双亲结点的值小视为左孩子结点
                if (!parent.left) {
                    parent.left = node;
                    return;
                }
                current = current.left;
            }
            if (value > parent.value) {
                if (!parent.right) {
                    parent.right = node;
                    return;
                }
                current = current.right;
            }
        }

    }
}
let tree = new Tree(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
tree.insert(6);
function preOrder(root) {
    if (root) {

    }
}