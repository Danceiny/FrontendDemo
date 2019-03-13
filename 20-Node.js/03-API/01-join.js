const {join} = require('path');

console.log(join('c', 's', 'dir', '..', 'name'));


var wait10s = function () {
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, 10);
    });
    return promise;
};


function includes(str1, str2) {
    let len = str1.length;
    for (let i = 0; i <= str2.length - len; i++) {
        let count = 0;
        for (let j = 0; j < str1.length; j++) {
            if (str1[j] === str2[i + j]) {
                count++
            }
        }
        if (count === len) {
            return i
        }
    }
    return -1;
}