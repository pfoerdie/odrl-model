const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class ConstraintList extends metamodel.ListContainer {
    static validValue(value) { return value instanceof model.Constraint || value instanceof model.LogicalConstraint; }
}

module.exports = ConstraintList;