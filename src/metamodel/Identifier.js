const
    _ = require('../util'),
    metamodel = require('.');

class Identifier extends metamodel.Resource {

    /**
     * @param {string|{'@id': string}} param 
     */
    constructor(param) {
        super((_.is.object(param) && (param['@id'] || param.uid || param.id)) || param);
    }

    toJSON() { return { '@id': this.uid }; }

}

module.exports = Identifier;