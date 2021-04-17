const
    _ = require('../util'),
    model = require('.');

class IdContainer extends model.GraphContainer {

    static validValue(value) { return value instanceof model.Identifier; }

    toJSON() {
        return Array.from(this.values())
            .map(value => model.Identifier.prototype.toJSON.call(value));
    }

}

module.exports = IdContainer;