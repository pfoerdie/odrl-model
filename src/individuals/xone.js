const
    _ = require('../util'),
    model = require('../model');

/**
 * The relation is satisfied when only one, and not more, of the Constaints is satisfied.
 */
module.exports = new model.LogicalOperator(
    { '@id': _.ODRL.xone },
    async function (...callbacks) {
        const results = await Promise.all(callbacks.map(callback => callback()));
        return results.filter(val => val).size === 1;
    }
);