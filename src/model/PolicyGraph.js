const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class PolicyContainer extends metamodel.IdContainer {
    static validValue(value) { return value instanceof model.Policy; }
}

module.exports = PolicyContainer;