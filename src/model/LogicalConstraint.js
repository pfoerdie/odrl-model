const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * A logical expression that refines the semantics of an Action and Party/Asset Collection 
 * or declare the conditions applicable to a Rule.
 */
class LogicalConstraint extends metamodel.Resource {

    constructor(param) {
        _.assert.object(param);
        _.assert.instance(param.operator, model.LogicalOperator);
        super(param['@id'] || param.uid || _.generateUID());
        this.operator = param.operator;
        this.operand = new model.ConstraintList(param.operand);
        _.lock.all(this);
    }

    async evaluate(...args) {
        const operandInvoker = Array.from(this.operand)
            .map(constraint => () => constraint.evaluate(...args));
        return await this.operator.apply(...operandInvoker);
    }

}

module.exports = LogicalConstraint;