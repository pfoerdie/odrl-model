const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class RuleContext extends metamodel.Context {

    constructor(target, parent) {
        _.assert.instance(target, model.Rule);
        _.assert.instance(parent, model.PolicyContext);
        super(target, parent);
    }

}

module.exports = RuleContext;