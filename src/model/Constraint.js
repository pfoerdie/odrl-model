const
    _ = require('../util'),
    model = require('.');

class Constraint {

    constructor({
        uid = _.generateUID(),
        operator,
        leftOperand,
        rightOperand = null,
        rightOperandReference = null
    }) {
        _.assert.string(uid, _.pattern.IRI);
        _.assert.instance(operator, model.Operator);
        _.assert.instance(leftOperand, model.LeftOperand);
        _.assert(_.is.object(rightOperand) || _.is.string(rightOperandReference) || _.is.array(rightOperandReference));
        this.uid = uid;
        this.operator = operator;
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.rightOperandReference = rightOperandReference;
        _.lock.all(this);
    }

    async evaluate(...args) {

    }

}

module.exports = Constraint;