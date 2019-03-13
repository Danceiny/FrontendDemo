/**
 * 集合
 * 没有重复元素的对象集合
 * 在ES5之前，使用对象在操作，在add添加新元素时，使用has方法先判断时候有重复元素，
 * 在ES6之后，有Set类型，专门用来处理集合
 * **/

class Set {
  constructor () {
    this.collection = {};
  }

  has (value) {
    return this.collection.hasOwnProperty(value);
  }

  add (value) {
    if (!this.has(value)) {
      this.collection[value] = value;
      return true;
    } else {
      return false;
    }
  }

  delete (value) {
    if (this.has(value)) {
      delete this.collection[value];
      return true;
    } else {
      return false;
    }
  }

  values () {
    return Object.keys(this.collection);
  }

  clear () {
    this.collection = {}
  }

  size () {
    return Object.keys(this.collection).length
  }


  // 并集
  union (otherSet) {
    let unionSet = new Set();
    for (let value of this.values()) {
      unionSet.add(value);
    }
    let otherCollection = otherSet.values();
    for (let value of otherCollection) {
      unionSet.add(value);
    }
    return unionSet;
  }

  // 交集
  intersection (otherSet) {
    let intersectionSet = new Set();
    for (let value of this.values()) {
      if (otherSet.has(value)) {
        intersectionSet.add(value);
      }
    }
    return intersectionSet;
  }

  // 差集
  difference (otherSet) {
    let differenceSet = new Set();
    for (let value of this.values()) {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    }
    return differenceSet
  }


  // 子集判断
  subset (otherSet) {
    if (otherSet.size() < this.size()) {
      return false
    } else {
      for (let value of this.values()) {
        if (!otherSet.has(value)) {
          return false;
        }
      }
      return true;
    }
  }
}