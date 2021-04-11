const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class PartyCollectionSet extends metamodel.IdContainer {
    static validValue(value) { return value instanceof model.PartyCollection; }
}

class Party extends metamodel.Resource {

    constructor(param) {
        _.assert.object(param);
        super(param['@id']);
        this.partOf = new PartyCollectionSet(this.partOf);
        _.lock.all(this);
    }

}

module.exports = Party;