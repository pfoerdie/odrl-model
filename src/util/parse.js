const _ = require('.');

const parse = module.exports = function (value, methods = {}, ctx = null) {
    _.assert.string(value);
    const parser = { toString: () => value };
    for (let [key, method] of Object.entries(methods)) {
        if (_.is.function(method)) {
            parser[key] = function (...args) {
                return method.call(ctx, value, ...args);
            };
        }
    }
    return parser;
};

parse.xsd_string = function (value) {
    value = value?.toString();
    value = value || '';
    return parse(value);
};

parse.xsd_boolean = function (value) {
    value = value || false;
    value = value !== '0' && value;
    value = value !== 'false' && value;
    value = value !== 'null' && value;
    value = value !== 'NaN' && value;
    value = value && true;
    value = '' + value;
    return parse(value);
};

parse.xsd_decimal = function (value) {
    value = parseInt(value);
    value = '' + value;
    return parse(value);
};

parse.xsd_float = function (value) {
    value = parseFloat(value);
    value = '' + value;
    return parse(value);
};