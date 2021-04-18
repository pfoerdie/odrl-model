const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class ActionContext extends metamodel.Context {

    constructor(target, parent) {
        _.assert.instance(target, model.Action);
        _.assert.instance(parent, model.RuleContext);
        super(target, parent);
    }

}

module.exports = ActionContext;