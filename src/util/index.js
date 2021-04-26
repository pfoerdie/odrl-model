const
    _ = exports,
    util = require('@pfoerdie/utility'),
    uuid = require('uuid');

_.generateUID = function () {
    return 'urn:uuid:' + uuid.v4();
};

_.RDF = require('./RDF.json');
// LINK https://www.data2type.de/xml-xslt-xslfo/xml-schema/datentypen-referenz
// LINK https://www.w3.org/TR/2004/REC-xmlschema-2-20041028/#built-in-datatypes
_.XSD = require('./XSD.json');
_.ODRL = require('./ODRL.json');

/** @typedef {string} IRI */
/** @typedef {string} Language */

_.is = util.is;
_.create = util.create;
_.assert = util.assert;
_.audit = util.audit;
_.pattern = util.pattern;
_.lock = util.prop.lock;
_.parse = require('./parse');
_.validate = require('./validate');

_.lock.deep.hidden(exports);