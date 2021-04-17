const
    _ = require('../util'),
    model = require('../model');

/**
 * The relation is satisfied when at least one of the Constraints is satisfied.
 */
module.exports = new model.LogicalOperator(
    { '@id': _.ODRL.or },
    async function (...callbacks) {
        const results = await Promise.all(callbacks.map(callback => callback()));
        return results.some(val => val);
    }
);