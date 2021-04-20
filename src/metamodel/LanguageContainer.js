const
    _ = require('../util'),
    metamodel = require('.');

/**
 * @template {_.Language} Key
 * @template {metamodel.Literal} Value
 * @extends metamodel.IndexContainer<Key,Value>
 */
class LanguageContainer extends metamodel.IndexContainer {

    static validKey(key) { return _.is.string.Language(key); }
    static validValue(value) { return value instanceof metamodel.Literal && value.datatype === _.RDF.langString; }
    static validEntry(key, value) { return this.validKey(key) && this.validValue(value) && key === value.language; }

}

module.exports = LanguageContainer;