const
    _ = require('../util'),
    metamodel = require('.');

class ListContainer extends metamodel.Container {

    static validKey(key) { return _.is.number(key); }
    static validValue(value) { return value instanceof metamodel.Resource || value instanceof metamodel.Literal; }

    #list = [];

    constructor(list) {
        super(list);
        if (list) {
            _.assert.array(list);
            for (let value of list) {
                this.add(value);
            }
        }
    }

    get size() { return this.#list.length; }
    toJSON() { return Array.from(this.#list); }

    keys() { this.#list.keys(); }
    values() { this.#list.values(); }
    entries() { this.#list.entries(); }

    has(key) {
        super.has(key);
        return Number.isInteger(key) && key >= 0 && key < this.size;
    }

    get(key) {
        super.get(key);
        return this.#list[key];
    }

    add(value) {
        super.add(value);
        this.#list.push(value);
        return this.size - 1;
    }

    set(key, value) {
        super.set(key, value);
        if (Number.isInteger(key) && key >= 0 && key < this.size) {
            this.#list[key] = value;
        } else if (value < 0) {
            this.#list.unshift(value);
            key = 0;
        } else if (value > this.size - 1) {
            this.#list.push(value);
            key = this.size - 1;
        } else {
            key = Math.ceil(key);
            this.#list.splice(key, 0, value);
        }
        return key;
    }

    delete(key) {
        super.delete(key);
        if (!(Number.isInteger(key) && key >= 0 && key < this.size))
            return false;
        this.#list.splice(key, 1);
        return true;
    }

    clear() {
        super.clear();
        this.#list = [];
    }

}

module.exports = ListContainer;