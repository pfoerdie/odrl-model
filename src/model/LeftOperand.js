const
    _ = require('../util'),
    model = require('.');

class LeftOperand {

    #resolver;

    constructor(uid, resolver) {
        _.assert(_.is.IRI(uid), 'LeftOperand#constructor - The uid must be an IRI.');
        _.assert(_.is.function(resolver), 'LeftOperand#constructor - The resolver must be a function.');
        this.uid = uid;
        this.#resolver = resolver;
        _.lock.all(this);
    }

    async resolve(...args) {
        return await this.#resolver.apply(null, args);
    }

    toJSON() {
        return this.uid;
    }

}

module.exports = LeftOperand;