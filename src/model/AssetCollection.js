const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * An Asset that is collection of individual resources.
 */
class AssetCollection extends model.Asset {

    constructor(param) {
        super(param);
        this.refinement = new model.ConstraintGraph(param.refinement);
        if (param.source) _.assert.string(param.source, _.pattern.IRI);
        this.source = param.source || null;
        _.lock.all(this);
    }

}

module.exports = AssetCollection;