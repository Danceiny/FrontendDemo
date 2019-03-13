let Promise = require('./Promise');

let promise = new Promise(function (resolve, reject) {
    if (true) {
        resolve('this is resolve result 100');
    } else {
        reject('this reject')
    }
});

promise.then(function (data) {
    console.log('data:', data)
}, function (err) {
    console.log('err:', err)
})