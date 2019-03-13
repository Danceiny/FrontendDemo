/**
 * 散列表
 *
  put(key,value)：向散列表增加一个新的项（也能更新散列表）。
  remove(key)：根据键值从散列表中移除值。
  get(key)：返回根据键值检索到的特定的值。
 *
 * **/

class HashTable {
  constructor () {
    this.table = [];
  }

  // 私有方法，散列函数
  // 散列函数只要只用来生成不同的hash，以下是网上比较推荐的散列函数
  _loseloseHashCode (key) {
    let hash = 5381; //{1}
    for (let i = 0; i < key.length; i++) { //{2}
      hash = hash * 33 + key.charCodeAt(i); //{3}
    }
    return hash % 1013; //{4}
  }

  put (key, value) {
    let position = this._loseloseHashCode(key);
    this.table[position] = value;
  }

  remove (key) {
    this.table[this._loseloseHashCode(key)] = undefined
  }

  get (key) {
    return this.table[this._loseloseHashCode(key)]
  }

}

let hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');

console.log(hash);
