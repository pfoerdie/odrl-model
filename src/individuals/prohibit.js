const
    _ = require('../util'),
    model = require('../model');

/**
 * Prohibitions take preference over permissions.
 */
module.exports = new model.ConflictTerm(
    { '@id': _.ODRL.prohibit },
    async function () {
        // TODO
        _.assert(false, 'not implemented');
    }
);