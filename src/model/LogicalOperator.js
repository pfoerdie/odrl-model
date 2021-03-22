const
    _ = require('../util'),
    model = require('.');

class LogicalOperator {

    #operator;

    constructor(uid, operator) {
        _.assert.string(uid, _.pattern.IRI);
        _.assert.function(operator);
        this.uid = uid;
        this.#operator = operator;
        _.lock.all(this);
    }

    async apply(...operandInvoker) {
        _.assert(operandInvoker.every(_.is.function));
        return await this.#operator.apply(null, operandInvoker);
    }

    toJSON() {
        return this.uid;
    }

}

module.exports = LogicalOperator;