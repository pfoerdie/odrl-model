const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class DutySet extends metamodel.IdContainer {
    static validValue(value) { return value instanceof model.Duty; }
}

class Duty extends model.Rule {

    constructor(param) {
        super(param);
        this.consequence = new DutySet(param.consequence);
        _.lock.all(this);
    }

}

module.exports = Duty;