const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class ObligationContainer extends metamodel.GraphContainer {
    static validValue(value) { return value instanceof model.Duty; }
}

module.exports = ObligationContainer;