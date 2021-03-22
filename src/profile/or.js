const
    _ = require('../util'),
    model = require('../model');

async function or(...callbacks) {
    for (let callback of callbacks) {
        if (await callback()) return true;
    }
    return false;
}

module.exports = new model.LogicalOperator('odrl:or', or);