const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * A boolean expression that refines the semantics of an Action and Party/Asset Collection 
 * or declare the conditions applicable to a Rule.
 */
class Constraint extends metamodel.Resource {

    constructor(param) {
        _.assert.object(param);
        _.assert.instance(param.operator, model.Operator);
        _.assert.instance(param.leftOperand, model.LeftOperand);
        if (param.rightOperand) {
            _.assert.instance(param.rightOperand, metamodel.Entity);
            _.assert(!param.rightOperandReference);
        } else {
            _.assert.instance(param.rightOperandReference, metamodel.Identifier, metamodel.IdContainer);
        }
        super(param['@id'] || _.generateUID());
        this.operator = param.operator;
        this.leftOperand = param.leftOperand;
        this.rightOperand = param.rightOperand || null;
        this.rightOperandReference = param.rightOperandReference || null;
        _.lock.all(this);
    }

    async evaluate(...args) {

    }

}

module.exports = Constraint;