/**
 * 
 * @param {function} executor 
 * setTimeout用来充当微任务的权限
 */

function myPromise(executor) {
    var _this = this;
    this.status = 'pending';
    // 保存传给resolve或reject函数的参数值，以作为参数传给then对应的回调函数
    this.value = undefined;
    // 缓存then函数的对应回调函数
    this.resolveCallbackList = [];
    this.rejectCallbackList = [];

    function resolve(value) {
        if (_this.status === 'pending') {
            _this.status = 'resolved';
            _this.value = value;
            _this.resolveCallbackList.length !== 0 ? _this.resolveCallbackList.forEach(function (cb) {
                cb();
            }) : '';

        }
    }

    function reject(value) {
        if (_this.status === 'pending') {
            _this.status = 'rejected';
            _this.value = value;
            _this.rejectCallbackList.length !== 0 ? _this.rejectCallbackList.forEach(function (cb) {
                cb();
            }) : '';

        }
    }
    try {
        executor && executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
// then函数关联的回调函数返回的是一个promise实例对象
function handleReturnPromise(returnValue, nextResolve, nextReject) {
    if (returnValue instanceof myPromise) {
        // 根据promise实例对象的状态来判断执行下一个then函数所关联的哪个回调函数
        returnValue.then(function (val) {
            //成功回调
            nextResolve(val);
        }, function (val) {
            //失败回调
            nextReject(val);
        })
    } else {
        // 返回值作为下一个then函数关联的成功回调的参数值;
        nextResolve(returnValue);
    }
}
myPromise.prototype.then = function (onResolve, onReject) {
    var _this = this;
    // 处理调用空的.then()函数
    // 如：promise.then().then(() => {})...
    if (!onResolve) {
        onResolve = function (value) {
            return value;
        }
    }
    if (!onReject) {
        onReject = function (err) {
            throw new Error(err);
        }
    }
    var nextPromise = new myPromise(function (nextResolve, nextReject) {

        if (_this.status === 'resolved') {
            setTimeout(function () {
                try {
                    var nextResolveValue = onResolve(_this.value);
                    handleReturnPromise(nextResolveValue, nextResolve, nextReject);
                } catch (e) {
                    nextReject(e)
                }
            }, 0)

        }
        if (_this.status === 'rejected') {
            setTimeout(function () {
                try {
                    var nextRejectValue = onReject(_this.value);
                    handleReturnPromise(nextRejectValue, nextResolve, nextReject);
                } catch (e) {
                    nextReject(e);
                }
            }, 0)
        }
        if (_this.status === 'pending') {
            _this.resolveCallbackList.push(function () {
                setTimeout(function () {
                    try {
                        var nextResolveParam = onResolve(_this.value);
                        handleReturnPromise(nextResolveParam, nextResolve, nextReject);
                    } catch (e) {
                        nextReject(e);
                    }
                }, 0)

            });
            _this.rejectCallbackList.push(function () {
                setTimeout(function () {
                    try {
                        var nextRejectParam = onResolve(_this.value);
                        handleReturnPromise(nextRejectParam, nextResolve, nextReject);
                    } catch (e) {
                        nextReject(e);
                    }
                }, 0)

            });
        }
    })
    return nextPromise;
}
myPromise.resolve = function (data) {
    return new myPromise(function (resolve) {
        resolve(data);
    })
}
myPromise.reject = function (data) {
    return new this(function (resolve, reject) {
        reject(data);
    })
}
myPromise.race = function (array) {
    return new this(function (resolve, reject) {
        array.forEach(function (item) {
            if (item instanceof myPromise) {
                item.then(function (val) {
                    resolve(val);
                }, function (val) {
                    reject(val);
                })
            } else {
                var resolvedPromise = myPromise.resolve(item);
                resolvedPromise.then(function (val) {
                    resolve(val);
                }, function (val) {
                    reject(val);
                })
            }
        })
    })
}