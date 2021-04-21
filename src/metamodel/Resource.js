const
    _ = require('../util'),
    metamodel = require('.');

/**
 * @extends metamodel.Entity
 */
class Resource extends metamodel.Entity {

    #uid = '';
    #type = null;

    /**
     * @param {_.IRI | {'@id': _.IRI} | {uid: _.IRI} | {id: _.IRI}} param 
     */
    constructor(param) {
        super();
        if (_.is.string(param)) {
            _.assert.string(param, _.pattern.IRI);
            this.#uid = param;
        } else {
            _.assert.object(param);
            const uid = param['@id'] || param.uid || param.id;
            _.assert.string(uid, _.pattern.IRI);
            this.#uid = uid;
        }
        this.#type = new.target;
        _.audit(this, 'constructor', arguments);
    }

    /** @type {string} */
    get uid() { return this.#uid; }

    /** @type {Function} */
    get type() { return this.#type; }

    /**
     * @returns {{'@id': _.IRI, '@type': string, [key: string]: any}}
     */
    toJSON() {
        return Object.assign({ '@id': this.#uid, '@type': this.#type.name }, this);
    }

}

module.exports = Resource;