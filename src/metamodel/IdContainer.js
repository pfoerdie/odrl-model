const
    _ = require('../util'),
    model = require('.');

class IdContainer extends model.GraphContainer {

    toJSON() { return Array.from(this.values()).map(value => ({ '@id': value.uid })); }

}

module.exports = IdContainer;