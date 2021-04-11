const
    _ = require('../util'),
    model = require('.');
const { validValue } = require('./Container');

class IndexContainer extends model.Container {

    static validKey(key) { return _.is.string(key); }
    static validValue(value) { return value instanceof model.Resource || value instanceof model.Literal; }

    #map = new Map();

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
        if (value instanceof model.Resource) {
            const key = value.uid;
            return this.set(key, value);
        } else if (value instanceof model.Literal) {
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