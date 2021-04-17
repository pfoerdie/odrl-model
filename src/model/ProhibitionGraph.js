const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class ProhibitionContainer extends metamodel.GraphContainer {
    static validValue(value) { return value instanceof model.Prohibition; }
}

module.exports = ProhibitionContainer;