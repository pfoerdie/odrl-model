const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * A resource or a collection of resources that are the subject of a Rule.
 */
class Asset extends metamodel.Resource {

    constructor(param) {
        _.assert.object(param);
        super(param['@id']);
        this.partOf = new model.AssetCollectionGraph(param.partOf);
        this.hasPolicy = new model.PolicyGraph(param.hasPolicy);
        _.lock.all(this);
    }

}

module.exports = Asset;