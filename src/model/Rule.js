const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class ConstraintSet extends metamodel.GraphContainer {
    static validValue(value) { return value instanceof model.Constraint || value instanceof model.LogicalConstraint; }
}

class Rule extends metamodel.Resource {

    constructor(param) {
        _.assert.object(param);
        _.assert.instance(param.action, model.Action);
        super(param['@id'] || _.generateUID());
        this.action = param.action;
        this.constraint = new ConstraintSet(param.constraint);
        _.lock.all(this);
    }

    async evaluate(...args) {

    }

}

module.exports = Rule;