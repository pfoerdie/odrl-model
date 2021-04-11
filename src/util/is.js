const _ = require('.');

const is = module.exports = function (value) {
    return (value ?? null) !== null;
};

is.boolean = function (value) {
    return typeof value === 'boolean';
};

is.number = function (value) {
    return typeof value === 'number' && !isNaN(value);
};

is.number.integer = function (value) {
    return typeof value === 'number' && Number.isInteger(value);
};

is.string = function (value) {
    return typeof value === 'string';
};

is.string.nonempty = function (value) {
    return is.string(value) && value.length > 0;
};

is.string.IRI = function (value) {
    return is.string(value) && _.pattern.IRI.test(value);
};

is.string.Language = function (value) {
    return is.string(value) && _.pattern.Language.test(value);
};

is.symbol = function (value) {
    return typeof value === 'symbol';
};

is.function = function (value) {
    return typeof value === 'function';
};

is.object = function (value) {
    return value && typeof value === 'object';
};

is.array = function (value) {
    return Array.isArray(value);
};

is.array.nonempty = function (value) {
    return is.array(value) && value.length > 0;
};

is.IRI = function (value) {
    return _.pattern.IRI.test(value);
};

is.Language = function (value) {
    return _.pattern.Language.test(value);
};