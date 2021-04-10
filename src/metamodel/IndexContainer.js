const
    _ = require('../util'),
    model = require('.'),
    KeyType = _.create.classType(_.is.string),
    ValueType = _.create.classType(
        value => value instanceof model.Resource || value instanceof model.Literal
    );

class IndexContainer extends model.Container {

    static get KeyType() { return KeyType; }
    static get ValueType() { return ValueType; }

    #map = new Map();

    constructor(map) {
        super(map);
        if (map) {
            _.assert.object(map);
            for (let [key, value] of Object.entries(map)) {
                _.assert.instance(value, model.Resource, model.Literal);
                _.assert.string(key);
                this.#map.set(key, value);
            }
        }
    }

    get size() { return this.#map.size; }
    toJSON() { return Object.fromEntries(this.entries()); }

    keys() { return this.#map.keys(); }
    values() { return this.#map.values(); }
    entries() { return this.#map.entries(); }

    has(key) { return _.is.string(key) && this.#map.has(key); }
    get(key) { return (_.is.string(key) || undefined) && this.#map.get(key); }

    add(value) {
        if (this.locked) return;
        return this.set(_.generateUID(), value);
    }

    set(key, value) {
        if (this.locked) return;
        _.assert.instance(value, model.Resource, model.Literal);
        _.assert.string(key);
        this.#map.set(key, value);
        return key;
    }

    delete(key) {
        if (this.locked) return false;
        return _.is.string(key) && this.#map.delete(key);
    }

    clear() {
        if (this.locked) return false;
        this.#map.clear();
        return true;
    }

}

module.exports = IndexContainer;