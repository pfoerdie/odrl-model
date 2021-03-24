const
    _ = exports,
    uuid = require('uuid');

_.generateUID = function () {
    return 'urn:uuid:' + uuid.v4();
};

_.pattern = {};
_.pattern.IRI = /^[a-z]\w*:\S+$/i

_.is = function (value) {
    return (value ?? null) !== null;
};

_.is.boolean = function (value) {
    return typeof value === 'boolean';
};

_.is.number = function (value) {
    return typeof value === 'number' && !isNaN(value);
};

_.is.string = function (value) {
    return typeof value === 'string';
};

_.is.string.nonempty = function (value) {
    return _.is.string(value) && value.length > 0;
};

_.is.IRI = function (value) {
    return _.is.string(value) && _.pattern.IRI.test(value);
};

_.is.symbol = function (value) {
    return typeof value === 'symbol';
};

_.is.function = function (value) {
    return typeof value === 'function';
};

_.is.object = function (value) {
    return value && typeof value === 'object';
};

_.is.array = function (value) {
    return Array.isArray(value);
};

_.is.array.nonempty = function (value) {
    return _.is.array(value) && value.length > 0;
};

_.validate = function (value, schema) {
    if (_.is.array(schema))
        return schema.some(entry => _.validate(value, entry));

    return schema
        && (!schema.type || (
            typeof value === type
        ))
        && (!schema.class || (
            value instanceof schema.class
        ))
        && (!schema.member || (
            _.is.array(value) && value.every(
                (entry) => _.validate(entry, schema.member)
            )
        ))
        && (!schema.prop || (
            _.is.object(value) && Object.entries(schema.prop).every(
                ([key, entry]) => _.validate(value[key], entry)
            )
        ))
        && (!schema.pattern || (
            _.is.string(value) && schema.pattern.test(value)
        ));
};

_.assert = function (value, errMsg = 'undefined', errType = Error) {
    if (value) return;
    const err = new errType(errMsg);
    Error.captureStackTrace(err, _.assert);
    throw err;
};

_.assert.string = function (value, regExp) {
    if (_.is.string(value) && (!regExp || regExp.test(value))) return;
    const errMsg = regExp ? 'not a valid string' : 'not a string';
    const err = new TypeError(errMsg);
    Error.captureStackTrace(err, _.assert.string);
    throw err;
};

_.assert.function = function (value) {
    if (_.is.function(value)) return;
    const errMsg = 'not a function';
    const err = new TypeError(errMsg);
    Error.captureStackTrace(err, _.assert.function);
    throw err;
};

_.assert.object = function (value, checkFn) {
    if (_.is.object(value) && (!checkFn || Object.entries().every(([key, value]) => checkFn(entry, key, value)))) return;
    const errMsg = checkFn ? 'not a valid object' : 'not an object';
    const err = new TypeError(errMsg);
    Error.captureStackTrace(err, _.assert.object);
    throw err;
};

_.assert.instance = function (value, classFn) {
    if (value instanceof classFn) return;
    const errMsg = 'not a valid instance';
    const err = new TypeError(errMsg);
    Error.captureStackTrace(err, _.assert.instance);
    throw err;
};

_.assert.array = function (value, checkFn) {
    if (_.is.array(value) && (!checkFn || value.every(checkFn))) return;
    const errMsg = checkFn ? 'not a valid array' : 'not an array';
    const err = new TypeError(errMsg);
    Error.captureStackTrace(err, _.assert.array);
    throw err;
};

_.lock = function (obj, ...keys) {
    const lock = { writable: false, configurable: false };
    for (let key of keys) {
        const writable = !obj.hasOwnProperty(key) || Reflect.getOwnPropertyDescriptor(obj, key).configurable;
        if (writable) Object.defineProperty(obj, key, lock);
    }
    return _;
};

_.lock.all = function (obj) {
    return _.lock(obj, ...Object.keys(obj));
};

_.lock.deep = function (obj, depth = Infinity) {
    const lock = { writable: false, configurable: false };
    for (let [key, child] of Object.entries(obj)) {
        const writable = !obj.hasOwnProperty(key) || Reflect.getOwnPropertyDescriptor(obj, key).configurable;
        if (writable) {
            Object.defineProperty(obj, key, lock);
            if (child instanceof Object && depth > 0)
                _.lock.deep(child, depth - 1);
        }
    }
    return _;
};

_.lock.deep(_);