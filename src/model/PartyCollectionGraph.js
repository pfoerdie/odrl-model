const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class PartyCollectionGraph extends metamodel.IdContainer {
    static validValue(value) { return value instanceof model.PartyCollection; }
}

module.exports = PartyCollectionGraph;