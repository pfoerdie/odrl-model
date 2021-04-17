const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class ConstraintContainer extends metamodel.GraphContainer {
    static validValue(value) { return value instanceof model.Constraint || value instanceof model.LogicalConstraint; }
}

module.exports = ConstraintContainer;