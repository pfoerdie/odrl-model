const
    _ = require('../util'),
    model = require('.'),
    ValueType = _.create.classType(
        value => value instanceof model.Literal
    );

class LanguageContainer extends model.IndexContainer {

    static get ValueType() { return ValueType; }

    add(value) {
        if (this.locked) return;
        _.assert.instance(value, model.Literal);
        _.assert.equal(value.datatype, _.RDF.langString);
        if (this.has(value.language)) return false;
        return super.set(value.language, value);
    }

    set(key, value) {
        if (this.locked) return;
        _.assert.instance(value, model.Literal);
        _.assert.equal(value.datatype, _.RDF.langString);
        _.assert.equal(key, value.language);
        return super.set(value.language, value);
    }

}

module.exports = LanguageContainer;