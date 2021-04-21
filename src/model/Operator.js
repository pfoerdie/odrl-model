const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * Operator for constraint expression.
 */
class Operator extends metamodel.Resource {

    #operator;

    constructor(param, operator) {
        _.assert.object(param);
        _.assert.function(operator);
        super(param['@id'] || param.uid);
        this.#operator = operator;
        _.lock.all(this);
    }

    async apply(leftOperand, rightOperand) {
        _.assert.object(leftOperand);
        _.assert.object(rightOperand);
        const result = await this.#operator.call(null, leftOperand, rightOperand);
        return new metamodel.Literal(!!result);
    }

}

module.exports = Operator;