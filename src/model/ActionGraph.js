const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class ActionGraph extends metamodel.IdContainer {
    static validValue(value) { return value instanceof model.Action; }
}

module.exports = ActionGraph;