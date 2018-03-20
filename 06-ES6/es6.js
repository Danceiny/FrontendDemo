"use strict";

// console.log("hello world！");

// (x => x * 3)(2);
// (y) => {
//     let x;
//     y * y;
//     console.log(x);
// };

/*************************example******************************/
/*
let obj = {
    p: [
        'Hello',
        {y: 'World'}
    ]
};

let {p, p: [x, {y}]} = obj;
console.log(p, x, y);*/

/*************************example******************************/
/*const node = {
    loc: {
        start: {
            line: 1,
            column: 5
        }
    }
};

let {loc, loc: {start}, loc: {start: {line}}} = node;
console.log(loc);
console.log(start);
console.log(line);*/

/*************************example******************************/
//默认值生效的条件是，对象的属性值严格等于undefined。
/*var {x, y = 5} = {x: 1, y: 3};
let {bar} = {foo: foo};
console.log(bar );*/

/*************************example******************************/
/*let arr = [1, 2, 3,6867,86];
let {0: first, [arr.length - 1]: last, length:length} = arr;
console.log(first,last,length);*/
/*************************example******************************/
/*[[1, 2], [3, 6]].map(([a, b]) => {
    console.log(a+b);
});*/

/*************************example******************************/
/*let a;
console.log(a);
[(a)] = [3];
console.log(a);*/

/*************************example******************************/
/*let [x, y] = [1, 2];
console.log(x, y);
[x, y] = [y, x];
console.log(x, y);*/

/*************************example******************************/
/*
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
    console.log(key + " is " + value);
}*/

/*************************字符串的扩展******************************/
/*************************example******************************/
/*let a= '09-12'.padStart(10,'YYYY-MM-DD');
console.log(a);*/

/*let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

    `${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`*/

/*************************example******************************/
/*let a = 5;
let b = 10;

function tag(s, v1, v2,v3) {
    console.log(s[0]);
    console.log(s[1]);
    console.log(s[2]);
    console.log(v1);
    console.log(v2);
    console.log(v3);

    return "OK";
}

tag`Hello ${ a + b } world ${ a * b}`;*/

/*************************正则的扩展******************************/
/*************************example******************************/
/*const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31
console.log(year+'-'+month+'-'+day);*/

// let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
//
// '2015-01-02'.replace(re, '$<day>/$<month>/$<year>');

/*************************函数的扩展******************************/
/*************************example******************************/
// function log(x, y) {
//     y = y || 'World';
//     console.log(x, y);
// }
//
// log('Hello') // Hello World
// log('Hello', 'China') // Hello China
// log('Hello', '') // Hello World

/*************************对象的扩展******************************/
/*************************example******************************/

// Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })

/*let obj1={
    name:'xiao',
    age:24,
    sex:true,
    [Symbol]:23,
    method:function () {
        let a=0;
    }
};
console.log(this);
console.log(obj1.__proto__);
for (let p in obj1){
    console.log(p);
}*/

/*************************example******************************/
/*let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);
proto.y = 20;
proto.z = 40;
setTimeout(()=>{
    console.log(obj);
})*/

/*************************promise******************************/
/*************************example******************************/
/*const p1 = new Promise(function (resolve, reject) {
    console.log('promise1 start')
    setTimeout(() => reject(console.log('delay 3s')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
    console.log('promise2 start')
    setTimeout(() => resolve(p1,console.log('delay 1s')), 1000)
})

p2
    .then(result => console.log('re'+result))
    .catch(error => console.log('error'+error))*/


/*************************example******************************/
const someAsyncThing = function() {
    return new Promise(function(resolve, reject) {
        // 下面一行会报错，因为x没有声明
        let x=1;
        resolve(x + 2);
    });
};

someAsyncThing().then(function() {
    return f;
}).catch(function(error) {
    console.log('oh no', error);
    // 下面一行会报错，因为 y 没有声明
    y + 2;
}).then(function() {
    console.log('carry on');
}).catch(function (error) {
    console.log('122',error)
}).then(function() {
    console.log('carry');
}).catch(function (error) {
    console.log('333',error)
});
// oh no [ReferenceError: x is not defined]

