const
    _ = require('../util'),
    metamodel = require('.');

/**
 * The only purpose for this class is to group Resource, Entity and Container together.
 */
class Entity {

    constructor() {
        _.assert(new.target !== Entity, 'abstract class');
    }

    equals(other) { return this === other; }

    /** @returns {null} */
    toJSON() { null; }

}

module.exports = Entity;