const _ = require('.');

const lock = module.exports = function (obj, ...keys) {
    const config = { writable: false, configurable: false };
    for (let key of keys) {
        const writable = !obj.hasOwnProperty(key) || Reflect.getOwnPropertyDescriptor(obj, key).configurable;
        if (writable) Object.defineProperty(obj, key, config);
    }
    return _;
};

lock.all = function (obj) {
    return lock(obj, ...Object.keys(obj));
};

lock.deep = function (obj, depth = Infinity) {
    const config = { writable: false, configurable: false };
    for (let [key, child] of Object.entries(obj)) {
        const writable = !obj.hasOwnProperty(key) || Reflect.getOwnPropertyDescriptor(obj, key).configurable;
        if (writable) {
            Object.defineProperty(obj, key, config);
            if (child instanceof Object && depth > 0)
                lock.deep(child, depth - 1);
        }
    }
    return _;
};