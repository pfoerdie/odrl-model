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

    toJSON() { null; }

}

module.exports = Entity;