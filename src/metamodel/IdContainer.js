const
    _ = require('../util'),
    metamodel = require('.');

class IdContainer extends metamodel.GraphContainer {

    static validValue(value) { return value instanceof metamodel.Identifier; }

    toJSON() {
        return Array.from(this.values())
            .map(value => metamodel.Identifier.prototype.toJSON.call(value));
    }

}

module.exports = IdContainer;