const
    _ = require('../util'),
    model = require('.');

class GraphContainer extends model.Container {

    /** @type {Map<model.EntryKey, model.EntryValue>} */
    #graph = new Map();

    /**
     * @param {model.EntriesJSON} set 
     */
    constructor(graph) {
        if (graph) {
            _.assert.array(graph);
            for (let value of graph) {
                _.assert.instance(value, model.Resource);
                _.assert(!this.#graph.has(value.uid));
                this.#graph.set(value.uid, value);
            }
        }
    }

    /**
     * @returns {model.EntriesJSON} 
     */
    toJSON() {
        return Array.from(this.#graph.values());
    }

    /**
     * @returns {number} 
     */
    get size() {
        return this.#graph.size;
    }

    /**
     * @returns {Interator<model.EntryKey>}
     */
    keys() {
        return this.#graph.keys();
    }

    /**
     * @returns {Interator<model.EntryValue>}
     */
    values() {
        return this.#graph.values();
    }

    /**
     * @returns {Interator<[model.EntryKey, model.EntryValue]>}
     */
    entries() {
        return this.#graph.entries();
    }

    /**
     * @param {model.EntryKey} key 
     * @returns {boolean}
     */
    has(key) {
        return _.is.string(key) && this.#graph.has(key);
    }

    /**
     * @param {model.EntryKey} key 
     * @returns {model.EntryValue}
     */
    get(key) {
        return (_.is.string(key) || undefined) && this.#graph.get(key);
    }

    /**
     * @param {model.EntryValue} value 
     * @returns {model.EntryKey | undefined}
     */
    add(value) {
        _.assert.instance(value, model.Resource);
        if (this.#graph.has(value.uid)) return;
        this.#graph.set(value.uid, value);
        return value.uid;
    }

    /**
     * @param {model.EntryKey} key 
     * @param {model.EntryValue} value 
     * @returns {model.EntryKey | undefined}
     */
    set(key, value) {
        if (Object.isFrozen(this)) return;
        _.assert.instance(value, model.Resource);
        _.assert.equal(key, value.uid);
        this.#graph.set(value.uid, value);
        return value.uid;
    }

    /**
     * @param {model.EntryKey} key 
     * @returns {boolean}
     */
    delete(key) {
        if (Object.isFrozen(this)) return false;
        return _.is.string(key) && this.#graph.delete(key);
    }

    /**
     * @returns {boolean}
     */
    clear() {
        if (Object.isFrozen(this)) return false;
        this.#graph.clear();
        return true;
    }

}

module.exports = GraphContainer;