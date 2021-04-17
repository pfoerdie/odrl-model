const
    _ = require('../util'),
    model = require('../model');

/**
 * Permissions take preference over prohibitions.
 */
module.exports = new model.ConflictTerm(
    { '@id': _.ODRL.perm },
    async function () {
        // TODO
        _.assert(false);
    }
);