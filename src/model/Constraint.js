const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class Constraint extends metamodel.Resource {

    constructor(param) {
        _.assert.object(param);
        _.assert.instance(param.operator, model.Operator);
        super(param['@id'] || _.generateUID());
        this.operator = param.operator;
        _.lock.all(this);
    }

    async evaluate(...args) {

    }

}

module.exports = Constraint;