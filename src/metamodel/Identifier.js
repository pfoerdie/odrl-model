const
    _ = require('../util'),
    metamodel = require('.');

/**
 * @extends metamodel.Resource
 */
class Identifier extends metamodel.Resource {

    /**
     * @param {metamodel.Literal} other 
     * @returns {boolean}
     */
    equals(other) { return other instanceof Resource && this.uid === other.uid; }

    /** @returns {{'@id': _.IRI}} */
    toJSON() { return { '@id': this.uid }; }

}

module.exports = Identifier;