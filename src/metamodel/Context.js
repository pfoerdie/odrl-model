const
    _ = require('../util'),
    model = require('.');

class Context {

    #type = null;
    #parent = null;

    constructor(parent) {
        this.#type = new.target;
        if (this.#type !== Context) {
            _.assert.instance(parent, Context);
            this.#parent = parent;
        }
    }

}

module.exports = Context;