const
    _ = require('../util'),
    model = require('.');

/**
 * @abstract
 */
class Container extends model.Entity {

    static validKey(key) { return _.is.number(key) || _.is.string(key) || this.validValue(key); }
    static validValue(value) { return value instanceof model.Resource || value instanceof model.Literal; }
    static validEntry(key, value) { return this.validKey(key) && this.validValue(value); }

    #type = null;

    constructor(entries) {
        _.assert(new.target !== Container, 'abstract class');
        super();
        this.#type = new.target;
    }

    get size() { return 0; }

    keys() { return null; }
    values() { return null; }
    entries() { return null; }

    has(key) {
        _.assert(this.type.validKey(key), 'invalid key');
        return false;
    }

    get(key) {
        _.assert(this.type.validKey(key), 'invalid key');
        return null;
    }

    add(value) {
        _.assert(!this.locked, 'locked');
        _.assert(this.type.validValue(value), 'invalid value');
        return null;
    }

    set(key, value) {
        _.assert(!this.locked, 'locked');
        _.assert(this.type.validEntry(key, value), 'invalid key/value');
        return null;
    }

    delete(key) {
        _.assert(!this.locked, 'locked');
        _.assert(this.type.validKey(key), 'invalid key');
        return false;
    }

    clear() {
        _.assert(!this.locked, 'locked');
        return;
    }

    get type() { return this.#type; }
    get locked() { return Object.isFrozen(this); }
    [Symbol.iterator]() { return this.values(); }

    find(iteratee) {
        _.assert.function(iteratee);
        for (let [key, value] of this.entries()) {
            if (iteratee(value, key)) return value;
        }
    }

    findKey(iteratee) {
        _.assert.function(iteratee);
        for (let [key, value] of this.entries()) {
            if (iteratee(value, key)) return key;
        }
    }

    forEach(iteratee) {
        _.assert.function(iteratee);
        for (let [key, value] of this.entries()) {
            iteratee(value, key);
        }
        return this;
    }

    filter(iteratee) {
        _.assert.function(iteratee);
        const result = new this.#type();
        for (let [key, value] of this.entries()) {
            if (iteratee(value, key)) result.add(value);
        }
        return result;
    }

    map(iteratee) {
        _.assert.function(iteratee);
        const result = new this.#type();
        for (let [key, value] of this.entries()) {
            result.set(key, iteratee(value, key));
        }
        return result;
    }

    every(iteratee) {
        _.assert.function(iteratee);
        for (let [key, value] of this.entries()) {
            if (!iteratee(value, key))
                return false;
        }
        return true;
    }

    some(iteratee) {
        _.assert.function(iteratee);
        for (let [key, value] of this.entries()) {
            if (iteratee(value, key))
                return true;
        }
        return false;
    }

}

module.exports = Container;