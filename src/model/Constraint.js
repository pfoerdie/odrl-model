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
        _.assert(_.is.IRI(uid), 'Constraint#constructor - The uid must be an IRI.');
        _.assert(operator instanceof model.Operator, 'Constraint#constructor - The operator must be an Operator.');
        _.assert(leftOperand instanceof model.LeftOperand, 'Constraint#constructor - The leftOperand must be a LeftOperand.');
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