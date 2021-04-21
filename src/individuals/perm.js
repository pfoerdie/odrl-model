const
    _ = require('../util'),
    model = require('../model');

/**
 * Permissions take preference over prohibitions.
 */
module.exports = new model.ConflictTerm(
    { '@id': _.ODRL.perm },
    async function (permissionResults, prohibitionResults) {
        // TODO
        _.assert(false, 'not implemented');
    }
);