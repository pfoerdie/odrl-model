const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class ConstraintContext extends metamodel.Context {

    constructor(target, parent) {
        _.assert.instance(target, model.Constraint, model.LogicalConstraint);
        _.assert.instance(parent, model.RuleContext);
        super(target, parent);
    }

}

module.exports = ConstraintContext;