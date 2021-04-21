const
    _ = require('../util'),
    metamodel = require('.');

/**
 * @abstract 
 * @template {string|number|Value} Key
 * @template {metamodel.Resource|metamodel.Literal} Value
 * @extends metamodel.Entity
 */
class Container extends metamodel.Entity {

    static validKey(key) { return _.is.number(key) || _.is.string(key) || this.validValue(key); }
    static validValue(value) { return value instanceof metamodel.Resource || value instanceof metamodel.Literal; }
    static validEntry(key, value) { return this.validKey(key) && this.validValue(value); }

    /** @type {Function} */
    #type = null;

    /**
     * @param {Array<Value>|Object<Value>} [entries] 
     */
    constructor(entries) {
        _.assert(new.target !== Container, 'abstract class');
        super();
        this.#type = new.target;
        _.audit(this, 'constructor', arguments);
    }

    /** @type {number} */
    get size() { return 0; }

    /** @returns {Iterator<Key>} */
    keys() { return null; }

    /** @returns {Iterator<Value>} */
    values() { return null; }

    /** @returns {Iterator<[Key, Value]>} */
    entries() { return null; }

    /**
     * @param {Key} key 
     * @returns {boolean}
     */
    has(key) {
        _.assert(this.type.validKey(key), 'invalid key');
        return false;
    }

    /**
     * @param {Key} key 
     * @returns {Value|null}
     */
    get(key) {
        _.assert(this.type.validKey(key), 'invalid key');
        return null;
    }

    /**
     * @param {Value} value 
     * @returns {Key|null}
     */
    add(value) {
        _.assert(!this.locked, 'locked');
        _.assert(this.type.validValue(value), 'invalid value');
        return null;
    }

    /**
     * @param {Key} key 
     * @param {Value|null} value 
     * @returns {Key}
     */
    set(key, value) {
        _.assert(!this.locked, 'locked');
        _.assert(this.type.validEntry(key, value), 'invalid key/value');
        return null;
    }

    /**
     * @param {Key} key 
     * @returns {boolean}
     */
    delete(key) {
        _.assert(!this.locked, 'locked');
        _.assert(this.type.validKey(key), 'invalid key');
        return false;
    }

    /**
     * @returns {void}
     */
    clear() {
        _.assert(!this.locked, 'locked');
        return;
    }

    /** @type {Function<metamodel.Container>} */
    get type() { return this.#type; }

    /** @type {boolean} */
    get locked() { return Object.isFrozen(this); }

    /** @returns {Iterator<Value>} */
    [Symbol.iterator]() { return this.values(); }

    /**
     * @param {(value: Value, key: Key) => boolean} iteratee 
     * @returns {Value}
     */
    find(iteratee) {
        _.assert.function(iteratee);
        for (let [key, value] of this.entries()) {
            if (iteratee(value, key)) return value;
        }
    }

    /**
     * @param {(value: Value, key: Key) => boolean} iteratee 
     * @returns {Key}
     */
    findKey(iteratee) {
        _.assert.function(iteratee);
        for (let [key, value] of this.entries()) {
            if (iteratee(value, key)) return key;
        }
    }

    /**
     * @param {(value: Value, key: Key) => void} iteratee 
     * @returns {this}
     */
    forEach(iteratee) {
        _.assert.function(iteratee);
        for (let [key, value] of this.entries()) {
            iteratee(value, key);
        }
        return this;
    }

    /**
     * @param {(value: Value, key: Key) => boolean} iteratee 
     * @returns {metamodel.Container<Key,Value>}
     */
    filter(iteratee) {
        _.assert.function(iteratee);
        const result = new this.#type();
        for (let [key, value] of this.entries()) {
            if (iteratee(value, key)) result.add(value);
        }
        return result;
    }

    /**
     * @param {(value: Value, key: Key) => Value} iteratee 
     * @returns {metamodel.Container<Key,Value>}
     */
    map(iteratee) {
        _.assert.function(iteratee);
        const result = new this.#type();
        for (let [key, value] of this.entries()) {
            result.set(key, iteratee(value, key));
        }
        return result;
    }

    /**
     * @param {(value: Value, key: Key) => boolean} iteratee 
     * @returns {boolean}
     */
    every(iteratee) {
        _.assert.function(iteratee);
        for (let [key, value] of this.entries()) {
            if (!iteratee(value, key))
                return false;
        }
        return true;
    }

    /**
     * @param {(value: Value, key: Key) => boolean} iteratee 
     * @returns {boolean}
     */
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