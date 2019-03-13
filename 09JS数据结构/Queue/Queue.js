// 队列
class Queue {
  constructor () {
    this.arr = [];
  }

  // enqueue(element(s))：向队列尾部添加一个（或多个）新的项
  enqueue (element) {
    this.arr.push(element);
  }

  // dequeue()：移除队列的第一（即排在队列最前面的）项，并返回被移除的元素
  dequeue () {
    return this.arr.shift();
  }

  // front()：返回队列中第一个元素——最先被添加，也将是最先被移除的元素
  front () {
    return this.arr[0];
  }

  isEmpty () {
    return this.arr.length === 0;
  }

  size () {
    return this.arr.length;
  }

  print () {
    console.log(this.arr.toString());
  }
}

// export default Queue;
module.exports = Queue;

/*let queue = new Queue();
queue.enqueue('jack', 1);
queue.enqueue('tom', 2);
queue.dequeue();
console.log(queue.front());
queue.enqueue('lus', 3);
queue.print();*/



