const
    _ = require('../util'),
    model = require('.');

class LeftOperand {

    #resolver;

    constructor(uid, resolver) {
        _.assert.string(uid, _.pattern.IRI);
        _.assert.function(resolver);
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