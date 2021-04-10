const
    _ = require('../util'),
    model = require('.');

class TypeContainer extends model.IdContainer {

    toJSON() { return Array.from(this.values()).map(value => value.uid); }

}

module.exports = TypeContainer;