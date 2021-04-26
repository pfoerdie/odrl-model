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
    const string = value?.toString() || '';
    value = string;
    return parse(value);
};

parse.xsd_boolean = function (value) {
    const bool = !(!value
        || value === '0'
        || value === 'false'
        || value === 'null'
        || value === 'undefined'
        || value === 'NaN'
    );
    value = bool.toString();
    return parse(value);
};

parse.xsd_decimal = function (value) {
    const decimal = parseFloat(value);
    value = '' + decimal;
    return parse(value);
};

parse.xsd_integer = function (value) {
    const decimal = parseInt(value);
    value = '' + decimal;
    return parse(value);
};

parse.xsd_date = function (value) {
    const date = new Date(value);
    value = date.toISOString();
    return parse(value, null, date);
};

parse.xsd_language = function (value) {
    _.assert.string(value, _.pattern.LanguageTag);
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