const
    _ = require('../util'),
    metamodel = require('.');

/**
 * @extends metamodel.Resource
 */
class Identifier extends metamodel.Resource {

    /**
     * @returns {{'@id': _.IRI}}
     */
    toJSON() { return { '@id': this.uid }; }

}

module.exports = Identifier;