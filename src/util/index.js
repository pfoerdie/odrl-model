const
    _ = exports,
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

_.parse = require('./parse');
_.pattern = require('./pattern');
_.is = require('./is');
_.validate = require('./validate');
_.assert = require('./assert');
_.audit = require('./audit');
_.create = require('./create');
_.lock = require('./lock');

_.lock.deep.hidden(exports);