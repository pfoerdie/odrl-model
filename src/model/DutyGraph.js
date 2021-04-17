const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class DutyContainer extends metamodel.IdContainer {
    static validValue(value) { return value instanceof model.Duty; }
}

module.exports = DutyContainer;