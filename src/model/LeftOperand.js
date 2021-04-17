const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * Left operand for a constraint expression.
 */
class LeftOperand extends metamodel.Resource {

    #resolver;

    constructor(param, resolver) {
        _.assert.object(param);
        _.assert.function(resolver);
        super(param['@id']);
        this.#resolver = resolver;
        _.lock.all(this);
    }

    async resolve(...args) {
        return await this.#resolver.apply(null, args);
    }

}

module.exports = LeftOperand;