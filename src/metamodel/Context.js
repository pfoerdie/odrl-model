const
    _ = require('../util'),
    metamodel = require('.'),
    findRoot = (ctx) => (ctx.parent && findRoot(ctx.parent)) || ctx;

class Context {

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
        /** @type {Function<metamodel.Context>} */
        this.type = new.target;
        /** @type {metamodel.Entity} */
        this.target = target;
        /** @type {metamodel.Context} */
        this.parent = parent;
        /** @type {metamodel.Context} */
        this.root = findRoot(this);
        _.lock.all.hidden(this);
        _.audit(this, 'constructor', arguments);
    }

    find(callback) {
        // TODO maybe unnecessary
        _.assert.function(callback);
        if (callback(this)) return this;
        if (this.parent) return this.parent.find(callback);
        return null;
    }

    /**
     * @param {_.IRI} key 
     * @param {boolean} [recursive] 
     * @returns {boolean}
     */
    has(key, recursive) {
        if (!_.is.string(key)) return false;
        return this.#cache.has(key) || recursive && this.parent?.has(key, recursive) || false;
    }

    /**
     * IDEA differentiate recursive methods, e.g. find
     * @param {_.IRI} key 
     * @param {boolean} [recursive] 
     * @returns {metamodel.Entity}
     */
    get(key, recursive) {
        if (!_.is.string(key)) return false;
        return this.#cache.get(key) || recursive && this.parent?.get(key, recursive) || null;
    }

    /**
     * @param {_.IRI} key 
     * @param {metamodel.Entity} value 
     * @returns {metamodel.Entity}
     */
    set(key, value) {
        _.assert.string(key, _.pattern.IRI);
        _.assert.instance(value, metamodel.Entity);
        const current = this.#cache.get(key);
        _.assert(!current || current.equals(value), 'already set');
        // _.assert(!this.#cache.has(key), 'already set');
        this.#cache.set(key, value);
        _.audit(this, 'set', arguments);
        return value;
    }

}

module.exports = Context;