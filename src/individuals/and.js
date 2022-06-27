const
    _ = require('../util'),
    model = require('../model');

/**
 * The relation is satisfied when all of the Constraints are satisfied.
 */
module.exports = new model.LogicalOperator(
    { '@id': _.ODRL.and },
    async function (...callbacks) {
        const results = await Promise.all(callbacks.map(async callback => callback()));
        return results.every(val => val);
    }
);