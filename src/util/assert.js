const _ = require('.');

const assert = module.exports = function (value, errMsg = 'undefined', errType = Error) {
    if (value) return;
    const err = new errType(errMsg);
    Error.captureStackTrace(err, assert);
    throw err;
};

assert.equal = function (value, other) {
    if (value === other) return;
    const errMsg = 'not equal';
    const err = new Error(errMsg);
    Error.captureStackTrace(err, assert.equal);
    throw err;
};

assert.boolean = function (value) {
    if (_.is.boolean(value)) return;
    const errMsg = 'not a boolean';
    const err = new TypeError(errMsg);
    Error.captureStackTrace(err, assert.boolean);
    throw err;
};

assert.number = function (value, min = -Infinity, max = Infinity) {
    if (_.is.number(value) && value >= min && value <= max) return;
    const errMsg = 'not a valid number';
    const err = new TypeError(errMsg);
    Error.captureStackTrace(err, assert.number);
    throw err;
};

assert.string = function (value, regExp) {
    if (_.is.string(value) && (!regExp || regExp.test(value))) return;
    const errMsg = regExp ? 'not a valid string' : 'not a string';
    const err = new TypeError(errMsg);
    Error.captureStackTrace(err, assert.string);
    throw err;
};

assert.function = function (value) {
    if (_.is.function(value)) return;
    const errMsg = 'not a function';
    const err = new TypeError(errMsg);
    Error.captureStackTrace(err, assert.function);
    throw err;
};

assert.object = function (value, checkFn) {
    if (_.is.object(value) && (!checkFn || Object.entries().every(([key, value]) => checkFn(entry, key, value)))) return;
    const errMsg = checkFn ? 'not a valid object' : 'not an object';
    const err = new TypeError(errMsg);
    Error.captureStackTrace(err, assert.object);
    throw err;
};

assert.instance = function (value, ...classFn) {
    if (classFn.some(Class => value instanceof Class)) return;
    const errMsg = 'not a valid instance';
    const err = new TypeError(errMsg);
    Error.captureStackTrace(err, assert.instance);
    throw err;
};

assert.array = function (value, checkFn) {
    if (_.is.array(value) && (!checkFn || value.every(checkFn))) return;
    const errMsg = checkFn ? 'not a valid array' : 'not an array';
    const err = new TypeError(errMsg);
    Error.captureStackTrace(err, assert.array);
    throw err;
};