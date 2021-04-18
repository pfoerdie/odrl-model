const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class PolicyContext extends metamodel.Context {

    constructor(target, parent) {
        _.assert.instance(target, model.Policy);
        super(target, parent);
    }

}

module.exports = PolicyContext;