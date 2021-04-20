const
    _ = require('../util'),
    metamodel = require('.');

/**
 * @template {_.IRI} Key
 * @template {metamodel.Identifier} Value
 * @extends metamodel.GraphContainer<Key,Value>
 */
class IdContainer extends metamodel.GraphContainer {

    static validValue(value) { return value instanceof metamodel.Identifier; }

    /**
     * @returns {Array<{'@id': _.IRI}>}
     */
    toJSON() {
        const toJSON = metamodel.Identifier.prototype.toJSON;
        return Array.from(this.values())
            .map(value => toJSON.call(value));
    }

}

module.exports = IdContainer;