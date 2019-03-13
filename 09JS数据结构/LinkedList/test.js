// 链表实现测试
let LinkedList = require('./LinkedList');

let linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
console.log(linkedList.indexOf(2));
linkedList.insert(2,4);
linkedList.removeAt(2)

console.log(linkedList.toString());