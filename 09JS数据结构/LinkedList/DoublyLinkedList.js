/**
 * 双向链表
 * 有next指向下一个，同时还有prev指向上一个
 * **/

class Node {
  constructor (element) {
    this.element = element;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor () {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  append (element) {
    let node = new Node(element);
    if (!this.head) {   // 如果之前为空 ，新增
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
  }

  insert (position, element) {
    if (position >= 0 && position <= this.length) {
      let node = new Node(element);
      let current = this.head;
      let previous;
      let index = 0;
      if (position === 0) {   // 如果添加在第一项
        if (!this.head) {   // 新增的
          this.head = node;
          this.tail = node;
        } else {
          node.next = current;
          current.prev = node;
          this.head = node;
        }
      } else if (position === this.length - 1) {    // 如果添加在最后一项
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        // 向下查找到指定位置
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        // 将node节点插入，建立链接
        node.prev = previous;
        previous.next = node;
        node.next = current;
        current.prev = node;
      }
      this.length++;
      return true;
    } else {
      return false
    }
  }

  removeAt (position) {
    // 边界检测
    if (position >= 0 && position <= this.length) {
      let current = this.head;
      let index = 0;
      let previous;
      // 移除第一项
      if (position === 0) {
        this.head = current.next;
        if (this.length === 1) {
          this.tail = null;
        } else {
          this.head.prev = null;
        }
      } else if (position === this.length - 1) {    // 移除最后一项
        this.tail = this.tail.prev;
        this.tail.next = null;
      } else {    // 移除除首尾项之外的某一项
        while (index++ <= position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
        current.prev = previous;
      }
      this.length--;
      return current.element;
    } else {
      return null;
    }
  }

  indexOf (element) {
    let current = this.head;
    let index = 0;
    while (current.next) {
      if (element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  remove (element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  }


  isEmpty () {
    return this.length === 0;
  }

  size () {
    return this.length;
  }

  getHead () {
    return this.head;
  }

  toString () {
    let current = this.head;
    let string = '';
    while (current) {
      string += current.element;
      current = current.next;
    }
    return string;
  }
}