const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class Action extends metamodel.Resource {

    #executor;

    constructor(param, executor) {
        _.assert.function(executor);
        super(param);
        this.#executor = executor;
        _.lock.all(this);
    }

    async execute(...args) {
        return await this.#executor.apply(null, args);
    }

}

module.exports = Action;