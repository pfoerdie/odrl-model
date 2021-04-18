const
    _ = require('../util'),
    metamodel = require('.');

class GraphContainer extends metamodel.Container {

    static validKey(key) { return _.is.string.IRI(key); }
    static validValue(value) { return value instanceof metamodel.Resource; }
    static validEntry(key, value) { return this.validKey(key) && this.validValue(value) && key === value.uid; }

    #graph = new Map();

    constructor(graph) {
        super(graph);
        if (graph) {
            _.assert.array(graph);
            for (let value of graph) {
                this.add(value);
            }
        }
    }

    get size() { return this.#graph.size; }
    toJSON() { return Array.from(this.values()); }

    keys() { return this.#graph.keys(); }
    values() { return this.#graph.values(); }
    entries() { return this.#graph.entries(); }

    has(key) {
        super.has(key);
        return this.#graph.has(key);
    }

    get(key) {
        super.get(key);
        return this.#graph.get(key);
    }

    add(value) {
        super.add(value);
        if (this.#graph.has(value.uid)) return;
        this.#graph.set(value.uid, value);
        return value.uid;
    }

    set(key, value) {
        super.set(key, value);
        this.#graph.set(value.uid, value);
        return value.uid;
    }

    delete(key) {
        super.delete(key);
        if (this.locked) return false;
        return this.#graph.delete(key);
    }

    clear() {
        super.clear();
        this.#graph.clear();
    }

}

module.exports = GraphContainer;