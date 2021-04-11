const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class ConstraintSet extends metamodel.GraphContainer {
    static validValue(value) { return value instanceof model.Constraint || value instanceof model.LogicalConstraint; }
}

class PartyCollection extends model.Party {

    constructor(param) {
        super(param);
        this.refinement = new ConstraintSet(this.refinement);
        _.lock.all(this);
    }

}

module.exports = PartyCollection;