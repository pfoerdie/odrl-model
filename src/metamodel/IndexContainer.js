const
    _ = require('../util'),
    metamodel = require('.');

/**
 * @template {string} Key
 * @template {metamodel.Resource|metamodel.Literal} Value
 * @extends metamodel.Container<Key,Value>
 */
class IndexContainer extends metamodel.Container {

    static validKey(key) { return _.is.string(key); }
    static validValue(value) { return value instanceof metamodel.Resource || value instanceof metamodel.Literal; }

    /** @type {Map<Key,Value>} */
    #map = new Map();

    /**
     * @param {{[key: string]: Value}} [map] 
     */
    constructor(map) {
        super(map);
        if (map) {
            _.assert.object(map);
            for (let [key, value] of Object.entries(map)) {
                this.set(key, value);
            }
        }
    }

    get size() { return this.#map.size; }

    /** @returns {Object<Value>} */
    toJSON() { return Object.fromEntries(this.entries()); }

    keys() { return this.#map.keys(); }
    values() { return this.#map.values(); }
    entries() { return this.#map.entries(); }

    has(key) {
        super.has(key);
        return this.#map.has(key);
    }

    get(key) {
        super.get(key);
        return this.#map.get(key);
    }

    add(value) {
        super.add(value);
        if (value instanceof metamodel.Resource) {
            const key = value.uid;
            return this.set(key, value);
        } else if (value instanceof metamodel.Literal) {
            const key = value.language || value.datatype;
            return this.set(key, value);
        }
    }

    set(key, value) {
        super.set(key, value);
        this.#map.set(key, value);
        return key;
    }

    delete(key) {
        super.delete(key);
        return this.#map.delete(key);
    }

    clear() {
        super.clear();
        this.#map.clear();
    }

}

module.exports = IndexContainer;