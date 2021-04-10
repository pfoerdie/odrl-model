const
    _ = require('../util'),
    model = require('.'),
    KeyType = _.create.classType(_.is.string.IRI),
    ValueType = _.create.classType(
        value => value instanceof model.Resource
    );

class GraphContainer extends model.Container {

    static get KeyType() { return KeyType; }
    static get ValueType() { return ValueType; }

    #graph = new Map();

    constructor(graph) {
        super(graph);
        if (graph) {
            _.assert.array(graph);
            for (let value of graph) {
                _.assert.instance(value, model.Resource);
                _.assert(!this.#graph.has(value.uid));
                this.#graph.set(value.uid, value);
            }
        }
    }

    get size() { return this.#graph.size; }
    toJSON() { return Array.from(this.values()); }

    keys() { return this.#graph.keys(); }
    values() { return this.#graph.values(); }
    entries() { return this.#graph.entries(); }

    has(key) { return _.is.string(key) && this.#graph.has(key); }
    get(key) { return (_.is.string(key) || undefined) && this.#graph.get(key); }

    add(value) {
        if (this.locked) return;
        _.assert.instance(value, model.Resource);
        if (this.#graph.has(value.uid)) return;
        this.#graph.set(value.uid, value);
        return value.uid;
    }

    set(key, value) {
        if (this.locked) return;
        _.assert.instance(value, model.Resource);
        _.assert.equal(key, value.uid);
        this.#graph.set(value.uid, value);
        return value.uid;
    }

    delete(key) {
        if (this.locked) return false;
        return _.is.string(key) && this.#graph.delete(key);
    }

    clear() {
        if (this.locked) return false;
        this.#graph.clear();
        return true;
    }

}

module.exports = GraphContainer;