const
    _ = require('../util'),
    model = require('.'),
    ValueType = _.create.classType(
        value => value instanceof model.Resource || value instanceof model.Literal
    ),
    KeyType = _.create.classType(
        value => _.is.number(value) || _.is.string(value) || value instanceof ValueType
    );

class Container {

    static get KeyType() { return KeyType; }
    static get ValueType() { return ValueType; }

    #type = null;

    constructor(entries) {
        _.assert(new.target !== Container, 'abstract class');
        this.#type = new.target;
    }

    get size() { return 0; }
    toJSON() { return null; }

    keys() { return null; }
    values() { return null; }
    entries() { return null; }

    has(key) {
        _.assert.instance(key, this.type.KeyType);
        return false;
    }

    get(key) {
        _.assert.instance(key, this.type.KeyType);
        return null;
    }

    add(value) {
        _.assert(!this.locked, 'locked');
        _.assert.instance(value, this.type.ValueType);
        return null;
    }

    set(key, value) {
        _.assert(!this.locked, 'locked');
        _.assert.instance(key, this.type.KeyType);
        _.assert.instance(value, this.type.ValueType);
        return null;
    }

    delete(key) {
        _.assert(!this.locked, 'locked');
        _.assert.instance(key, this.type.KeyType);
        return false;
    }

    clear() {
        _.assert(!this.locked, 'locked');
        return false;
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