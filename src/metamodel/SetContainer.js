const
    _ = require('../util'),
    model = require('.');

class SetContainer extends model.Container {

    #set = new Set();

    constructor(set) {
        super();
        if (set) {
            _.assert.array(set);
            for (let value of set) {
                _.assert.instance(value, model.Resource, model.Literal);
                this.#set.add(value);
            }
        }
    }

    get size() { return this.#set.size; }
    toJSON() { return Array.from(this.#set.values()); }

    keys() { return this.#set.values(); }
    values() { return this.#set.values(); }
    entries() { return this.#set.entries(); }

    has(key) { return (key instanceof model.Resource || key instanceof model.Literal) && this.#set.has(key); }
    get(key) { return (this.has(key) && key) || undefined; }

    add(value) {
        if (this.locked) return;
        _.assert.instance(value, model.Resource, model.Literal);
        this.#set.add(value);
        return value;
    }

    set(key, value) {
        if (this.locked) return;
        _.assert.instance(value, model.Resource, model.Literal);
        _.assert.equal(key, value);
        this.#set.add(value);
        return value;
    }

    delete(key) {
        if (this.locked) return false;
        return this.#set.delete(key);
    }

    clear() {
        if (this.locked) return false;
        this.#set.clear();
        return true;
    }

}

module.exports = SetContainer;