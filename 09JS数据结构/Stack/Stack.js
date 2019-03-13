class Stack {
  constructor () {
    this.arr = [];
  }

  // ：添加一个（或几个）新元素到栈顶。
  push (item) {
    this.arr.push(item);
  };

  // 移除栈顶的元素，同时返回被移除的元素
  pop () {
    return this.arr.pop();
  };

  //返回栈顶的元素，不对栈做任何修改
  peek () {
    return this.arr[this.arr.length - 1];
  };

  // 如果栈里没有任何元素就返回true，否则返回false
  isEmpty () {
    return this.arr.length === 0;
  };

  // ：移除栈里的所有元素
  clear () {
    this.arr = [];
  };

  // 返回栈里的元素个数
  size () {
    return this.arr.length;
  };

  print () {
    console.log(this.arr.toString())
  }
}

let stack = new Stack();

stack.push(2);
stack.push(4);
stack.pop();
stack.print();
