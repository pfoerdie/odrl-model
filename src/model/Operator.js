const
    _ = require('../util'),
    model = require('.');

class Operator {

    #operator;

    constructor(uid, operator) {
        _.assert(_.is.IRI(uid), 'Operator#constructor - The uid must be an IRI.');
        _.assert(_.is.function(operator), 'Operator#constructor - The operator must be a function.');
        this.uid = uid;
        this.#operator = operator;
        _.lock.all(this);
    }

    async apply(leftOperand, rightOperand) {
        _.assert.object(leftOperand);
        _.assert.object(rightOperand);
        return await this.#operator.call(null, leftOperand, rightOperand);
    }

    toJSON() {
        return this.uid;
    }

}

module.exports = Operator;