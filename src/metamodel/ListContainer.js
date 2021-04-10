const
    _ = require('../util'),
    model = require('.'),
    KeyType = _.create.classType(_.is.number),
    ValueType = _.create.classType(
        value => value instanceof model.Resource || value instanceof model.Literal
    );

class ListContainer extends model.Container {

    static get KeyType() { return KeyType; }
    static get ValueType() { return ValueType; }

    #list = [];

    constructor(list) {
        super(list);
        if (list) {
            _.assert.array(list);
            for (let value of list) {
                _.assert.instance(value, model.Resource, model.Literal);
                this.#list.push(value);
            }
        }
    }

    get size() { return this.#list.length; }
    toJSON() { return Array.from(this.#list); }

    keys() { this.#list.keys(); }
    values() { this.#list.values(); }
    entries() { this.#list.entries(); }

    has(key) { return _.is.number.integer(key) && key >= 0 && key < this.size; }
    get(key) { return (this.has(key) || undefined) && this.#list[key]; }

    add(value) {
        if (this.locked) return;
        _.assert.instance(value, model.Resource, model.Literal);
        this.#list.push(value);
        return this.size - 1;
    }

    set(key, value) {
        if (this.locked) return;
        _.assert.instance(value, model.Resource, model.Literal);
        _.assert.number(key, -1, this.size);
        if (this.has(key)) {
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
        if (this.locked) return false;
        if (!this.has(key)) return false;
        this.#list.splice(key, 1);
        return true;
    }

    clear() {
        if (this.locked) return false;
        this.#list = [];
        return true;
    }

}

module.exports = ListContainer;