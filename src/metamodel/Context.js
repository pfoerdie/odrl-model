const
    _ = require('../util'),
    metamodel = require('.'),
    findRoot = (ctx) => (ctx.parent && findRoot(ctx.parent)) || ctx;

class Context {

    /** @type {Map<_.IRI, metamodel.Entity>} */
    #cache = new Map();

    /**
     * @param {metamodel.Entity} target 
     * @param {metamodel.Context} [parent] 
     */
    constructor(target, parent) {
        _.assert.instance(target, metamodel.Entity);
        if (new.target === Context) {
            parent = null;
        } else {
            _.assert.instance(parent, Context);
        }
        this.type = new.target;
        this.target = target;
        this.parent = parent;
        /** @type {metamodel.Context} */
        this.root = findRoot(this);
        _.lock.all.hidden(this);
    }

    /**
     * @param {_.IRI} key 
     * @returns {boolean}
     */
    has(key) {
        return this.#cache.has(key);
    }

    /**
     * @param {_.IRI} key 
     * @returns {metamodel.Entity}
     */
    get(key) {
        return this.#cache.get(key);
    }

    /**
     * @param {_.IRI} key 
     * @param {metamodel.Entity} value 
     * @returns {metamodel.Entity}
     */
    set(key, value) {
        _.assert.string(key, _.pattern.IRI);
        _.assert.instance(value, metamodel.Entity);
        _.assert(!this.#cache.has(key), 'already set');
        this.#cache.set(key, value);
        return value;
    }

}

module.exports = Context;