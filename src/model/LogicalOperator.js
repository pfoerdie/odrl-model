const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class LogicalOperator {

    #operator;

    constructor(uid, operator) {
        _.assert(_.is.IRI(uid), 'LogicalOperator#constructor - The uid must be an IRI.');
        _.assert(_.is.function(operator), 'LogicalOperator#constructor - The operator must be a function.');
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