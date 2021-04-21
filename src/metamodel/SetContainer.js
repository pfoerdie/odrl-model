const
    _ = require('../util'),
    metamodel = require('.');

/**
 * @template {Value} Key
 * @template {metamodel.Resource|metamodel.Literal} Value
 * @extends metamodel.Container<Key,Value>
 */
class SetContainer extends metamodel.Container {

    static validKey(key) { return this.validValue(key); }
    static validValue(value) { return value instanceof metamodel.Resource || value instanceof metamodel.Literal; }
    static validEntry(key, value) { return key === value && this.validValue(value); }

    /** @type {Set<Value>} */
    #set = new Set();

    /**
     * @param {Array<Value>} [set] 
     */
    constructor(set) {
        super(set);
        if (set) {
            _.assert.array(set);
            for (let value of set) {
                this.add(value);
            }
        }
    }

    get size() { return this.#set.size; }
    toJSON() { return Array.from(this.#set.values()); }

    keys() { return this.#set.values(); }
    values() { return this.#set.values(); }
    entries() { return this.#set.entries(); }

    has(key) {
        super.has(key);
        return this.#set.has(key);
    }

    get(key) {
        super.get(key);
        return (this.#set.has(key) && key) || undefined;
    }

    add(value) {
        super.add(value);
        this.#set.add(value);
        return value;
    }

    set(key, value) {
        super.set(key, value);
        this.#set.add(value);
        return value;
    }

    delete(key) {
        super.delete(key);
        return this.#set.delete(key);
    }

    clear() {
        super.clear();
        this.#set.clear();
    }

}

module.exports = SetContainer;