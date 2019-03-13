// Promise 构造函数
function Promise(executor) {
    let self = this;
    self.status = 'pending';
    self.data = undefined;

    // 使用数组处理promise.then回调函数集，
    self.resolvedCallback = [];
    self.rejectedCallback = [];

    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.data = value;
            //处理程序
            self.resolvedCallback.forEach((fn) => fn(value))
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.data = reason;
            self.rejectedCallback.forEach((fn) => fn(reason))
        }
    }

    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)  // 如果发生错误，使用reject传出
    }
}

//Promise原型then方法
// then方法接收两个参数，onResolved，onRejected，分别为Promise成功或失败后的回调
Promise.prototype.then = function (onFufiled, onRejected) {
    let self = this;
    let promise2;

    // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
    onFufiled = typeof onFufiled === 'function' ? onFufiled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => reason;

    // 对状态进行处理
    if (self.status === 'resolved') {
        return promise2 = new Promise((resolve, reject) => {
            try {
                let temp = onFufiled(self.data);
                if (temp instanceof Promise) {   // 如果then方法传入的还是promise，则继续使用then方法链式处理
                    temp.then(resolve, reject)
                } else {
                    resolve(temp);      // 否则，使用resolve将值传出，因为前面对temp进行过处理
                }
            } catch (e) {
                reject(e)       // 如果出错，则使用reject()将错处传出
            }
        })
    }

    if (self.status === 'rejected') {
        return promise2 = new Promise((resolve, reject) => {
            try {
                let temp = onRejected(self.data);
                if (temp instanceof Promise) {   // 如果then方法传入的还是promise，则继续使用then方法链式处理
                    temp.then(resolve, reject)
                }                           // 这里不用再调用resolve，因为已经是失败的调用，只需要使用reject传出失败结果
            } catch (e) {
                reject(e)       // 如果出错，则使用reject()将错处传出
            }
        })
    }

    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
    // 只能等到Promise的状态确定后，才能确实如何处理。
    // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
    // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
    if (self.status === 'pending') {
        return promise2 = new Promise((resolve, reject) => {
            self.resolvedCallback.push((value) => {
                try {
                    let temp = onFufiled(self.data);
                    if (temp instanceof Promise) {   // 如果then方法传入的还是promise，则继续使用then方法链式处理
                        temp.then(resolve, reject)
                    } else {
                        resolve(temp);      // 否则，使用resolve将值传出，因为前面对temp进行过处理
                    }
                } catch (e) {
                    reject(e)       // 如果出错，则使用reject()将错处传出
                }
            });
            self.rejectedCallback.push((reason) => {
                try {
                    let temp = onRejected(self.data);
                    if (temp instanceof Promise) {   // 如果then方法传入的还是promise，则继续使用then方法链式处理
                        temp.then(resolve, reject)
                    }                           // 这里不用再调用resolve，因为已经是失败的调用，只需要使用reject传出失败结果
                } catch (e) {
                    reject(e)       // 如果出错，则使用reject()将错处传出
                }
            })
        })

    }
};

// 定义一个catch方法
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
};

module.exports = Promise;