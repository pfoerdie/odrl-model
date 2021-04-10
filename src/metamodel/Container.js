const
    _ = require('../util'),
    model = require('.'),
    /** @implements {model.ContainerTypes} */
    ContainerTypes = {};

ContainerTypes['@graph'] = class GraphContainer {

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
        return _.is.string(key) && this.#graph.delete(key);
    }

    /**
     * @returns {void}
     */
    clear() {
        this.#graph.clear();
    }

};

ContainerTypes['@list'] = class ListContainer {

    /** @type {Array<model.EntryValue>} */
    #list = [];

    /**
     * @param {model.EntriesJSON} set 
     */
    constructor(list) {
        if (list) {
            _.assert.array(list);
            for (let value of list) {
                _.assert.instance(value, model.Resource, model.Literal);
                this.#list.push(value);
            }
        }
    }

    /**
     * @returns {model.EntriesJSON} 
     */
    toJSON() {
        return Array.from(this.#list);
    }

    /**
     * @returns {number} 
     */
    get size() {
        return this.#list.length;
    }

    /**
     * @returns {Interator<model.EntryKey>}
     */
    keys() {
        this.#list.keys();
    }

    /**
     * @returns {Interator<model.EntryValue>}
     */
    values() {
        this.#list.values();
    }

    /**
     * @returns {Interator<[model.EntryKey, model.EntryValue]>}
     */
    entries() {
        this.#list.entries();
    }

    /**
     * @param {model.EntryKey} key 
     * @returns {boolean}
     */
    has(key) {
        return _.is.number.integer(key) && key >= 0 && key < this.size;
    }

    /**
     * @param {model.EntryKey} key 
     * @returns {model.EntryValue}
     */
    get(key) {
        return (this.has(key) || undefined) && this.#list[key];
    }

    /**
     * @param {model.EntryValue} value 
     * @returns {model.EntryKey | undefined}
     */
    add(value) {
        _.assert.instance(value, model.Resource, model.Literal);
        this.#list.push(value);
        return this.size - 1;
    }

    /**
     * @param {model.EntryKey} key 
     * @param {model.EntryValue} value 
     * @returns {model.EntryKey | undefined}
     */
    set(key, value) {
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

    /**
     * @param {model.EntryKey} key 
     * @returns {boolean}
     */
    delete(key) {
        if (!this.has(key)) return false;
        this.#list.splice(key, 1);
        return true;
    }

    /**
     * @returns {void}
     */
    clear() {
        this.#list = [];
    }

};

ContainerTypes['@set'] = class SetContainer {

    /** @type {Set<model.EntryValue>} */
    #set = new Set();

    /**
     * @param {model.EntriesJSON} set 
     */
    constructor(set) {
        if (set) {
            _.assert.array(set);
            for (let value of set) {
                _.assert.instance(value, model.Resource, model.Literal);
                this.#set.add(value);
            }
        }
    }

    /**
     * @returns {model.EntriesJSON} 
     */
    toJSON() {
        return Array.from(this.#set.values());
    }

    /**
     * @returns {number} 
     */
    get size() {
        return this.#set.size;
    }

    /**
     * @returns {Interator<model.EntryKey>}
     */
    keys() {
        return this.#set.values();
    }

    /**
     * @returns {Interator<model.EntryValue>}
     */
    values() {
        return this.#set.values();
    }

    /**
     * @returns {Interator<[model.EntryKey, model.EntryValue]>}
     */
    entries() {
        return this.#set.entries();
    }

    /**
     * @param {model.EntryKey} key 
     * @returns {boolean}
     */
    has(key) {
        return (key instanceof model.Resource || key instanceof model.Literal) && this.#set.has(key);
    }

    /**
     * @param {model.EntryKey} key 
     * @returns {model.EntryValue}
     */
    get(key) {
        return (this.has(key) && key) || undefined;
    }

    /**
     * @param {model.EntryValue} value 
     * @returns {model.EntryKey | undefined}
     */
    add(value) {
        _.assert.instance(value, model.Resource, model.Literal);
        this.#set.add(value);
        return value;
    }

    /**
     * @param {model.EntryKey} key 
     * @param {model.EntryValue} value 
     * @returns {model.EntryKey | undefined}
     */
    set(key, value) {
        _.assert.instance(value, model.Resource, model.Literal);
        _.assert.equal(key, value);
        this.#set.add(value);
        return value;
    }

    /**
     * @param {model.EntryKey} key 
     * @returns {boolean}
     */
    delete(key) {
        return this.#set.delete(key);
    }

    /**
     * @returns {void}
     */
    clear() {
        this.#set.clear();
    }

};

module.exports = class Container {

    /** @type {model.ContainerType} */
    #tag = '';
    /** @type {model.ContainerAdapter['constructor']} */
    #type = null;
    /** @type {model.ContainerAdapter} */
    #adapter = null;

    /**
     * @param {model.ContainerJSON} param 
     */
    constructor(param) {
        _.assert.object(param);
        const types = Object.entries(ContainerTypes)
            .filter(([tag, type]) => param instanceof type || _.is.object(param[tag]))
            .map(([tag]) => tag);
        _.assert(types.length === 1, 'Container#constructor - A unique container type is not defined.');
        this.#tag = types[0];
        this.#type = ContainerTypes[this.#tag];
        this.#adapter = param instanceof this.#type ? param : new this.#type(param[this.#tag]);
    }

    /**
     * @type {model.ContainerType}
     */
    get type() {
        return this.#tag;
    }

    /**
     * @returns {model.ContainerJSON}
     */
    toJSON() {
        return { [this.#tag]: this.#adapter.toJSON() };
    }

    /** @returns {Iterator<model.EntryValue>} */
    [Symbol.iterator]() { return this.values(); }
    /** @returns {string} */
    [Symbol.toStringTag]() { return 'Container<' + this.#tag + '>'; }

    /**
     * @type {number}
     */
    get size() {
        return this.#adapter.size;
    }

    /**
     * @returns {Interator<model.EntryKey>}
     */
    keys() {
        return this.#adapter.keys();
    }

    /**
     * @returns {Interator<model.EntryValue>}
     */
    values() {
        return this.#adapter.values();
    }

    /**
     * @returns {Interator<[model.EntryKey, model.EntryValue]>}
     */
    entries() {
        return this.#adapter.entries();
    }

    /**
     * @param {model.EntryKey} key 
     * @returns {boolean}
     */
    has(key) {
        return this.#adapter.has(key);
    }

    /**
     * @param {model.EntryKey} key 
     * @returns {model.EntryValue}
     */
    get(key) {
        return this.#adapter.get(key);
    }


    /**
     * @param {model.EntryValue} value 
     * @returns {model.EntryKey | undefined}
     */
    add(value) {
        if (Object.isFrozen(this)) return;
        return this.#adapter.add(key, value);
    }

    /**
     * @param {model.EntryKey} key 
     * @param {model.EntryValue} value 
     * @returns {model.EntryKey | undefined}
     */
    set(key, value) {
        if (Object.isFrozen(this)) return;
        return this.#adapter.set(key, value);
    }

    /**
     * @param {model.EntryKey} key 
     * @returns {boolean}
     */
    delete(key) {
        if (Object.isFrozen(this)) return false;
        return this.#adapter.delete(key);
    }

    /**
     * @returns {boolean}
     */
    clear() {
        if (Object.isFrozen(this)) return false;
        this.#adapter.clear();
        return true;
    }

    /**
     * @param {model.Iteratee<boolean>} iteratee 
     * @returns {model.EntryValue}
     */
    find(iteratee) {
        _.assert.function(iteratee);
        for (let [key, value] of this.entries()) {
            if (iteratee(value, key)) return value;
        }
    }

    /**
     * @param {model.Iteratee<boolean>} iteratee 
     * @returns {model.EntryKey}
     */
    findKey(iteratee) {
        _.assert.function(iteratee);
        for (let [key, value] of this.entries()) {
            if (iteratee(value, key)) return key;
        }
    }

    /**
     * @param {model.Iteratee<void>} iteratee 
     * @returns {this}
     */
    forEach(iteratee) {
        _.assert.function(iteratee);
        for (let [key, value] of this.entries()) {
            iteratee(value, key);
        }
        return this;
    }

    /**
     * @param {model.Iteratee<boolean>} iteratee 
     * @returns {model.Container}
     */
    filter(iteratee) {
        _.assert.function(iteratee);
        const result = new this.#type();
        for (let [key, value] of this.entries()) {
            if (iteratee(value, key)) result.set(key, value);
        }
        return new Container(result);
    }

    /**
     * @param {model.Iteratee<model.EntryValue>} iteratee 
     * @returns {model.Container}
     */
    map(iteratee) {
        _.assert.function(iteratee);
        const result = new this.#type();
        for (let [key, value] of this.entries()) {
            result.set(key, iteratee(value, key));
        }
        return new Container(result);
    }

    /**
     * @param {model.Iteratee<boolean>} iteratee 
     * @returns {boolean}
     */
    every(iteratee) {
        _.assert.function(iteratee);
        for (let [key, value] of this.entries()) {
            if (!iteratee(value, key))
                return false;
        }
        return true;
    }

    /**
     * @param {model.Iteratee<boolean>} iteratee 
     * @returns {boolean}
     */
    some(iteratee) {
        _.assert.function(iteratee);
        for (let [key, value] of this.entries()) {
            if (iteratee(value, key))
                return true;
        }
        return false;
    }

};