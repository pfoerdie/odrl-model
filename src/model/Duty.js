const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * The obligation to perform an Action.
 */
class Duty extends model.Rule {

    constructor(param) {
        super(param);
        this.consequence = new model.DutyGraph(param.consequence);
        _.lock.all(this);
    }

}

module.exports = Duty;