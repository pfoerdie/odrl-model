const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class Operator extends metamodel.Resource {

    #operator;

    constructor(param, operator) {
        _.assert.object(param);
        _.assert.function(operator);
        super(param['@id']);
        this.#operator = operator;
        _.lock.all(this);
    }

    async apply(leftOperand, rightOperand) {
        _.assert.object(leftOperand);
        _.assert.object(rightOperand);
        return await this.#operator.call(null, leftOperand, rightOperand);
    }

}

module.exports = Operator;