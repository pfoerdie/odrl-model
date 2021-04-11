const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class ConstraintSet extends metamodel.GraphContainer {
    static validValue(value) { return value instanceof model.Constraint || value instanceof model.LogicalConstraint; }
}

class AssetCollection extends model.Asset {

    constructor(param) {
        super(param);
        this.refinement = new ConstraintSet(this.refinement);
        _.lock.all(this);
    }

}

module.exports = AssetCollection;