/**
 * 字典
 * 字典和集合很相似，集合以[值，值]的形式存储元素，字典则是以[键，值]的形式来存储元素。字典也称作映射。
 *
 * 在Es6中就是Map
 *
  set(key,value)：向字典中添加新元素。
  remove(key)：通过使用键值来从字典中移除键值对应的数据值。
  has(key)：如果某个键值存在于这个字典中，则返回true，反之则返回false。
  get(key)：通过键值查找特定的数值并返回。
  clear()：将这个字典中的所有元素全部删除。
  size()：返回字典所包含元素的数量。与数组的length属性类似。
  keys()：将字典所包含的所有键名以数组形式返回。
  values()：将字典所包含的所有数值以数组形式返回。

 * **/


class Dictionary {
  constructor () {
    this.object = {};
  }

  set (key, value) {
    this.object[key] = value;
  }

  remove (key) {
    if (this.object.has(key)) {
      let temp = this.object[key];
      delete this.object[key];
      return temp
    } else {
      return null
    }
  }

  has (key) {
    return key in this.object;
  }

  get (key) {
    return this.object[key];
  }

  clear () {
    this.object = {}
  }

  size () {
    return Object.keys(this.object).length;
  }

  keys () {
    return Object.keys(this.object)
  }

  values () {
    return Object.values(this.object)
  }

}

// module.exports = Dictionary;


