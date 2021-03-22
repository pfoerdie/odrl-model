const
    _ = require('../util'),
    model = require('.');

class Operator {

    #operator;

    constructor(uid, operator) {
        _.assert.string(uid, _.pattern.IRI);
        _.assert.function(operator);
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