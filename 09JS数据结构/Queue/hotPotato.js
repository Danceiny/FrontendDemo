// 击鼓传花

// import Queue from './Queue';
let Queue = require('./Queue');

function hotPotato (nameList, num) {
  let queue = new Queue();

  nameList.forEach(item => {
    queue.enqueue(item);
  });

  let eliminated = '';

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    eliminated = queue.dequeue();
    console.log(eliminated + '在击鼓传花游戏中被淘汰。');
  }
  return queue.dequeue();
}

let names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
let winner = hotPotato(names, 7);
console.log('胜利者：' + winner);