const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class PermissionContainer extends metamodel.GraphContainer {
    static validValue(value) { return value instanceof model.Permission; }
    // static validValue(value) {
    //     return value instanceof model.Rule
    //         && (value.type === model.Permission || value.type === model.Rule);
    // }
}

module.exports = PermissionContainer;