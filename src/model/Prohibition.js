const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class DutySet extends metamodel.IdContainer {
    static validValue(value) { return value instanceof model.Duty; }
}

class Prohibition extends model.Rule {

    constructor(param) {
        super(param);
        this.remedy = new DutySet(param.remedy);
        _.lock.all(this);
    }

}

module.exports = Prohibition;