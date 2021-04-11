const
    _ = require('../util'),
    model = require('.');

class LanguageContainer extends model.IndexContainer {

    static validKey(key) { return _.is.string.Language(key); }
    static validValue(value) { return value instanceof model.Literal && value.datatype === _.RDF.langString; }
    static validEntry(key, value) { return this.validKey(key) && this.validValue(value) && key === value.language; }

}

module.exports = LanguageContainer;