const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class DutySet extends metamodel.IdContainer {
    static validValue(value) { return value instanceof model.Duty; }
}

class Permission extends model.Rule {

    constructor(param) {
        super(param);
        this.duty = new DutySet(param.duty);
        _.lock.all(this);
    }

}

module.exports = Permission;