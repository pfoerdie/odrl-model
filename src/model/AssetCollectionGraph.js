const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class AssetCollectionGraph extends metamodel.IdContainer {
    static validValue(value) { return value instanceof model.AssetCollection; }
}

module.exports = AssetCollectionGraph;