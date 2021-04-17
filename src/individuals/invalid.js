const
    _ = require('../util'),
    model = require('../model');

/**
 * The policy is void.
 */
module.exports = new model.ConflictTerm(
    { '@id': _.ODRL.invalid },
    async function () {
        // TODO
        _.assert(false);
    }
);