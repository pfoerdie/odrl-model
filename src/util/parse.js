const _ = require('.');

const parse = module.exports = function (value, methods = null, ctx = null) {
    _.assert.string(value);
    const parser = { toString: () => value };
    for (let [key, method] of Object.entries(methods || {})) {
        if (_.is.function(method)) {
            parser[key] = function (...args) {
                return method.call(ctx, value, ...args);
            };
        }
    }
    return parser;
};

parse.xsd_string = function (value) {
    let string = value?.toString() || '';
    value = string;
    return parse(value);
};

parse.xsd_boolean = function (value) {
    let bool = value || false;
    bool = value || false;
    bool = value !== '0' && value;
    bool = value !== 'false' && value;
    bool = value !== 'null' && value;
    bool = value !== 'NaN' && value;
    bool = value && true;
    value = '' + bool;
    return parse(value);
};

parse.xsd_decimal = function (value) {
    let decimal = parseInt(value);
    value = '' + decimal;
    return parse(value);
};

parse.xsd_float = function (value) {
    let float = parseFloat(value);
    value = '' + float;
    return parse(value);
};

parse.xsd_date = function (value) {
    let date = new Date(value);
    value = date.toISOString();
    return parse(value, null, date);
};