/**
 * 树
 * 二叉树，二叉搜索树，完全二叉树
 * 以常用二叉搜索树为例, key左边的比key小，key右边的比key大
 * **/

// 辅助类
class Node {
  constructor (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor () {
    this.root = null;
  }

  // 带有_ 的表示私有方法， 只有类里面的成员变量能够访问

  // 插入一个节点
  insert (key) {
    let node = new Node(key);
    if (this.root === null) {
      this.root = node;
    } else {
      this._insertNode(this.root, node);
    }
  }

  _insertNode (node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode)
      }
    }
  }


  /** 中序遍历 **/
  inOrderTraverse (callback) {
    this._inOrderTraverseNode(this.root, callback);
  }

  // 中序遍历辅助函数，私有函数
  _inOrderTraverseNode (node, callback) {
    if (node !== null) {
      this._inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this._inOrderTraverseNode(node.right, callback);
    }
  }

  /** 先序遍历 **/
  preOrderTraverse (callback) {
    this._preOrderTraverseNode(this.root, callback);
  }

  _preOrderTraverseNode (node, callback) {
    if (node !== null) {
      callback(node.key);
      this._preOrderTraverseNode(node.left, callback);
      this._preOrderTraverseNode(node.right, callback);
    }
  }

  /** 后续遍历 **/
  postOrderTraverse (callback) {
    this._postOrderTraverseNode(this.root, callback);
  }

  _postOrderTraverseNode (node, callback) {
    if (node !== null) {
      this._postOrderTraverseNode(node.left, callback);
      this._postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  // remove(key)：从树中移除某个键。
  remove (key) {
    this.root = this._removeNode(this.root, key);
  }

  _removeNode (node, key) {
    if (node == null) {
      return null;
    }
    if (key < node.key) {
      node.left = this._removeNode(node.left, key);
      return node
    } else if (key > node.key) {
      node.right = this._removeNode(node.right, key);
      return node;
    } else {
      // 找到当前节点，进行移除操作

      // 没有子节点，直接移除完事
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      // 只有一个子节点
      else if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      // 左右两边都有子节点，最麻烦的一种情况，用来替换该节点的肯定是右边最小的节点
      // 然后右边就变成了将最小的节点移除，此时再对右边node 递归调用移除节点操作
      else {
        let aux = this._findMinNode(node.right);
        node.key = aux.key;
        node.right = this._removeNode(node.right, aux.key);
        return node;
      }
    }
  }

  _findMinNode (node) {
    if (node !== null) {
      while (node !== null && node.left !== null) {
        node = node.left;
      }
      return node
    }
    return null;
  }

  // search(key)：在树中查找一个键，如果节点存在，则返回true；如果不存在，则返回false。
  search (key) {
    let res = this._searchNode(this.root, key);
    return res;
  }

  _searchNode (node, key) {
    if (node === null) {
      return false
    }
    if (key < node.key) {
      return this._searchNode(node.left, key);
    } else if (key > node.key) {
      return this._searchNode(node.right, key)
    } else {
      return true;
    }
  }

  // min：返回树中最小的值/键。
  min () {
    return this._minNode(this.root);
  }

  _minNode (node) {
    if (node !== null) {
      while (node !== null && node.left !== null) {
        node = node.left;
      }
      return node.key
    }
    return null;
  }

  // max：返回树中最大的值/键。
  max () {
    return this._maxNode(this.root);
  }

  _maxNode (node) {
    if (node !== null) {
      while (node !== null && node.right !== null) {
        node = node.right;
      }
      return node.key;
    } else {
      return null;
    }
  }
}