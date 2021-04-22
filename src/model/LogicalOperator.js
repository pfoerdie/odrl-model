const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * Operator for logical constraint expression.
 */
class LogicalOperator extends metamodel.Resource {

    #operator;

    constructor(param, operator) {
        _.assert.object(param);
        _.assert.function(operator);
        super(param['@id'] || param.uid);
        this.#operator = operator;
        _.lock.all(this);
    }

    async apply(...operandInvoker) {
        _.audit(this, 'apply', arguments);
        _.assert.array(operandInvoker, _.is.function);
        const result = await this.#operator.apply(null, operandInvoker);
        _.assert.boolean(result);
        return result;
    }

}

module.exports = LogicalOperator;