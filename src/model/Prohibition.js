const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * The inability to perform an Action over an Asset.
 */
class Prohibition extends model.Rule {

    constructor(param) {
        super(param);
        this.remedy = new model.DutyGraph(param.remedy);
        _.assert(this.target);
        _.lock.all(this);
    }

}

module.exports = Prohibition;