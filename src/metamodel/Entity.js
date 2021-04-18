const
    _ = require('../util'),
    metamodel = require('.');

class Entity {

    constructor() {
        _.assert(new.target !== Entity, 'abstract class');
    }

    toJSON() { null; }

}

module.exports = Entity;