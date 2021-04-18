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
    let decimal = parseFloat(value);
    value = '' + decimal;
    return parse(value);
};

parse.xsd_integer = function (value) {
    let decimal = parseInt(value);
    value = '' + decimal;
    return parse(value);
};

parse.xsd_date = function (value) {
    let date = new Date(value);
    value = date.toISOString();
    return parse(value, null, date);
};

parse.xsd_language = function (value) {
    _.assert.string(value, _.pattern.Language);
    return parse(value);
};

parse.xsd_anyURI = function (value) {
    _.assert.string(value, _.pattern.IRI);
    return parse(value);
};

parse.xsd_byte = function (value) {
    const buffer = Buffer.from(value);
    _.assert.number(buffer.length, 1, 1);
    value = buffer.toString('hex');
    return parse(value, null, buffer);
};