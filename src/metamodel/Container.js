const
    _ = require('../util'),
    model = require('.');

class Container {

    #type = null;

    constructor(entries) {
        _.assert(new.target !== Container, 'abstract class');
        this.#type = new.target;
    }

    get size() { }
    toJSON() { }

    keys() { }
    values() { }
    entries() { }

    has(key) { }
    get(key) { }

    add(value) { }
    set(key, value) { }
    delete(key) { }
    clear() { }

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