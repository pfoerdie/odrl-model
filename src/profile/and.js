const
    _ = require('../util'),
    model = require('../model');

async function and(...callbacks) {
    for (let callback of callbacks) {
        if (!await callback()) return false;
    }
    return callbacks.length > 0;
}

module.exports = new model.LogicalOperator('odrl:and', and);