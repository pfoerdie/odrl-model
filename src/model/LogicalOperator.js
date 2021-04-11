const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class LogicalOperator extends metamodel.Resource {

    #operator;

    constructor(param, operator) {
        _.assert.function(operator);
        super(param);
        this.#operator = operator;
        _.lock.all(this);
    }

    async apply(...operandInvoker) {
        _.assert(operandInvoker.every(_.is.function));
        return await this.#operator.apply(null, operandInvoker);
    }

}

module.exports = LogicalOperator;