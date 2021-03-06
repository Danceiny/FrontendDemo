/**
 * Graph 图。 最复杂的表示方法，也是最强大的表示方法
 *
 *
 *
 * */


class Graph {
  constructor () {
    this.vertices = [];
    this.adjList = new Dictionary();
  }

  // addVertex 一个用来向图中添加一个新的顶点的方法
  addVertex (v) {
    this.vertices.push(v);
    this.adjList.set(v, []);
  }

  // addEdge 一个方法用来添加顶点之间的边的方法
  addEdge (v, w) {
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v);
  }

  toString () {
    let s = '';
    this.vertices.forEach(k => {
      s += k + ' -> ';
      let neighbors = this.adjList.get(k);
      neighbors.forEach(v => {
        s += v + '  '
      });
      s += '\n';
    });
    return s
  }

  // 私有函数，初始化每个点的color
  _initColer () {
    let color = [];
    this.vertices.forEach(value => {
      color[value] = 'white';
    });
    return color;
  }

  /**  广度优先搜索算法 BFS
   (1) 创建一个队列Q。
   (2) 将v标注为被发现的（灰色），并将v入队列Q。
   (3) 如果Q非空，则运行以下步骤：
   *  (a) 将u从Q中出队列；
   *  (b) 将标注u为被发现的（灰色）；
   *  (c) 将u所有未被访问过的邻点（白色）入队列；
   *  (d) 将u标注为已被探索的（黑色）。
   *
   *  并使用该方法 寻找最短路径
   * */


  bfs (v, callback) {
    let color = this._initColer();
    let queue = new Queue();
    let d = [];    // 记录路径长度
    let pred = []; // 记录路径前面的点

    queue.enqueue(v);   // 传入第一个点，加入到队列中，

    // 初始化 d pred
    this.vertices.forEach(v => {
      d[v] = 0;
      pred[v] = null;
    });

    while (!queue.isEmpty()) {
      let u = queue.dequeue();    // 弹出队列，返回该值
      let neighbors = this.adjList.get(u);    // 在adjList中找到u对应的相邻所有点
      color[u] = 'grey';    // 标记为灰色 已发现
      neighbors.forEach(w => {
        if (color[w] === 'white') {
          color[w] = 'grey';    // 加入到队列并标记已发现
          d[w] = d[u] + 1;      // 改变d[w]的值，w在u后面，长度在u的基础上+1
          pred[w] = u;          // 前面的点就是u
          queue.enqueue(w);
        }
      });
      color[u] = 'black';   // 标记为黑色，已探索
      if (callback) {
        callback(u);
      }
    }
    return {
      distances: d,
      predecessor: pred
    }
  }

  /**
   * 深度优先算法 DFS
   *
   (1) 标注v为被发现的（灰色）。
   (2) 对于v的所有未访问的邻点w：
   *  (a) 访问顶点w。
   (3) 标注v为已被探索的（黑色）。
   *
   * 深度优先搜索的步骤是递归的，这意味着深度优先搜索算法使用栈来存储函数调用（由递归调用所创建的栈）。
   * */


  dfs (callback) {
    let color = this._initColer();
    let d = [],       // 发现时间
      f = [],         //  探索时间
      p = [];         // 前溯点
    let time = 0;

    // 对上述三项初始化
    this.vertices.forEach(v => {
      d[v] = 0;
      f[v] = 0;
      p[v] = null;
    });

    this.vertices.forEach(v => {
      if (color[v] === 'white') {
        this._dfsVisit(v, color, d, f, p, time, callback);
      }
    });
    return {
      d, f, p
    }
  }

  // 私有函数 dfs递归函数
  _dfsVisit (u, color, d, f, p, time, callback) {
    color[u] = 'grey';
    callback && callback(u);

    d[u] = ++time;

    let neighbors = this.adjList.get(u);
    neighbors.forEach(w => {
      if (color[w] === 'white') {
        p[w] = u;
        this._dfsVisit(w, color, d, f, p, time, callback)
      }
    });
    color[u] = 'black';
    f[u] = ++time;
  }


}