const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * The ability to perform an Action over an Asset.
 */
class Permission extends model.Rule {

    constructor(param) {
        super(param);
        this.duty = new model.DutyGraph(param.duty);
        _.assert(this.target);
        _.lock.all(this);
    }

}

module.exports = Permission;