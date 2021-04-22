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
    }

    /** @type {string} */
    get uid() { return this.#uid; }

    /** @type {Function} */
    get type() { return this.#type; }

    /**
     * @param {metamodel.Literal} other 
     * @returns {boolean}
     */
    equals(other) {
        return super.equals(other) || other instanceof Resource
            && this.uid === other.uid
            && this.type === other.type;
    }

    /**
     * @returns {{'@id': _.IRI, '@type': string, [key: string]: metamodel.Entity}}
     */
    toJSON() {
        const result = { '@id': this.uid, '@type': this.type.name };
        for (let [key, value] of Object.entries(this)) {
            if (value instanceof metamodel.Entity)
                result[key] = value;
        }
        return result;
    }

}

module.exports = Resource;