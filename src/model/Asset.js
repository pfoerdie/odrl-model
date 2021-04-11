const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class AssetCollectionSet extends metamodel.IdContainer {
    static validValue(value) { return value instanceof model.AssetCollection; }
}

class Asset extends metamodel.Resource {

    constructor(param) {
        _.assert.object(param);
        super(param['@id']);
        this.partOf = new AssetCollectionSet(this.partOf);
        _.lock.all(this);
    }

}

module.exports = Asset;