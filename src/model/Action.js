const
    _ = require('../util'),
    model = require('.');

class Action {

    #executor;

    constructor(uid, executor) {
        _.assert(_.is.IRI(uid), 'Action#constructor - The uid must be an IRI.');
        _.assert(_.is.function(executor), 'Action#constructor - The executor must be a function.');
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