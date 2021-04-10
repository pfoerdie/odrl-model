const
    _ = exports,
    uuid = require('uuid');

_.RDF = {
    langString: 'rdf:langString'
};

_.XSD = {
    // LINK https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz
    // LINK https://www.w3.org/TR/2004/REC-xmlschema-2-20041028/#built-in-datatypes
    anyURI: 'xsd:anyURI',
    base64Binary: 'xsd:base64Binary',
    boolean: 'xsd:boolean',
    byte: 'xsd:byte',
    date: 'xsd:date',
    dateTime: 'xsd:dateTime',
    decimal: 'xsd:decimal',
    double: 'xsd:double',
    duration: 'xsd:duration',
    float: 'xsd:float',
    gDay: 'xsd:gDay',
    gMonth: 'xsd:gMonth',
    gMonthDay: 'xsd:gMonthDay',
    gYear: 'xsd:gYear',
    gYearMonth: 'xsd:gYearMonth',
    hexBinary: 'xsd:hexBinary',
    int: 'xsd:int',
    integer: 'xsd:integer',
    language: 'xsd:language',
    long: 'xsd:long',
    Name: 'xsd:Name',
    NCName: 'xsd:NCName',
    negativeInteger: 'xsd:negativeInteger',
    nonNegativeInteger: 'xsd:nonNegativeInteger',
    nonPositiveInteger: 'xsd:nonPositiveInteger',
    normalizedString: 'xsd:normalizedString',
    positiveInteger: 'xsd:positiveInteger',
    QName: 'xsd:QName',
    short: 'xsd:short',
    string: 'xsd:string',
    time: 'xsd:time',
    token: 'xsd:token',
    unsignedByte: 'xsd:unsignedByte',
    unsignedInt: 'xsd:unsignedInt',
    unsignedLong: 'xsd:unsignedLong',
    unsignedShort: 'xsd:unsignedShort'
};

_.parse = function (value, methods = {}, ctx = null) {
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

_.parse.xsd_string = function (value) {
    value = value?.toString();
    value = value || '';
    return _.parse(value);
};

const xsd_boolean_falsy_strings = ['0', 'false', 'NaN', 'null',];

_.parse.xsd_boolean = function (value) {
    value = value || false;
    value = value !== '0' && value;
    value = value !== 'false' && value;
    value = value !== 'null' && value;
    value = value !== 'NaN' && value;
    value = value && true;
    value = '' + value;
    return _.parse(value);
};

_.parse.xsd_decimal = function (value) {
    value = parseInt(value);
    value = '' + value;
    return _.parse(value);
};

_.parse.xsd_float = function (value) {
    value = parseFloat(value);
    value = '' + value;
    return _.parse(value);
};

_.generateUID = function () {
    return 'urn:uuid:' + uuid.v4();
};

_.pattern = {
    IRI: /^[a-z]\w*:\S+$/i,
    Language: /^[a-z]\w*(?:-[a-z]\w*)?$/i
};

_.is = function (value) {
    return (value ?? null) !== null;
};

_.is.boolean = function (value) {
    return typeof value === 'boolean';
};

_.is.number = function (value) {
    return typeof value === 'number' && !isNaN(value);
};

_.is.number.integer = function (value) {
    return typeof value === 'number' && Number.isInteger(value);
};

_.is.string = function (value) {
    return typeof value === 'string';
};

_.is.string.nonempty = function (value) {
    return _.is.string(value) && value.length > 0;
};

_.is.string.IRI = function (value) {
    return _.is.string(value) && _.pattern.IRI.test(value);
};

_.is.string.Language = function (value) {
    return _.is.string(value) && _.pattern.Language.test(value);
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

_.is.IRI = function (value) {
    return _.pattern.IRI.test(value);
};

_.is.Language = function (value) {
    return _.pattern.Language.test(value);
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

_.assert.equal = function (value, other) {
    if (value === other) return;
    const errMsg = 'not equal';
    const err = new Error(errMsg);
    Error.captureStackTrace(err, _.assert.equal);
    throw err;
};

_.assert.number = function (value, min = -Infinity, max = Infinity) {
    if (_.is.number(value) && value >= min && value <= max) return;
    const errMsg = 'not a valid number';
    const err = new TypeError(errMsg);
    Error.captureStackTrace(err, _.assert.number);
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

_.assert.instance = function (value, ...classFn) {
    if (classFn.some(Class => value instanceof Class)) return;
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

_.lock.deep(exports);