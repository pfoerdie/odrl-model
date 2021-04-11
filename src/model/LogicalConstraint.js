const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class ConstraintSet extends metamodel.ListContainer {
    static validValue(value) { return value instanceof model.Constraint; }
}

class LogicalConstraint extends metamodel.Resource {

    constructor(param) {
        _.assert.object(param);
        _.assert.instance(param.operator, model.LogicalOperator);
        super(param['@id'] || _.generateUID());
        this.operator = param.operator;
        this.operand = new ConstraintSet(param.operand);
        _.lock.all(this);
    }

}

module.exports = LogicalConstraint;