const
    _ = require('../util'),
    model = require('.');

class Action {

    #executor;

    constructor(uid, executor) {
        _.assert.string(uid, _.pattern.IRI);
        _.assert.function(executor);
        this.uid = uid;
        this.#executor = executor;
        _.lock.all(this);
    }

    async execute(...args) {
        return await this.#executor.apply(null, args);
    }

    toJSON() {
        return this.uid;
    }

}

module.exports = Action;