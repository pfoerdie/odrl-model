const
    _ = require('../util'),
    model = require('../model');

/**
 * The relation is satisfied when each of the Constraints are satisfied in the order specified.
 */
module.exports = new model.LogicalOperator(
    { '@id': _.ODRL.andSequence },
    async function (...callbacks) {
        for (let callback of callbacks) {
            if (!(await callback())) return false;
        }
        return true;
    }
);