const
    _ = require('../util'),
    model = require('.');

class Identifier extends model.Resource {

    constructor(param) {
        super(_.is.object(param) ? param['@id'] : param);
    }

    toJSON() { return { '@id': this.uid }; }

}

module.exports = Identifier;