const
    _ = require('../util'),
    model = require('../model');

/**
 * Permissions take preference over prohibitions.
 */
module.exports = new model.ConflictTerm(
    { '@id': _.ODRL.perm },
    /**
     * @param {model.Action} permission 
     * @param {model.Action} prohibition 
     * @returns {boolean} conflicting
     */
    function conflicting(permission, prohibition) {
        // TODO think about it, maybe only having actions is not enough, maybe you need the whole array
        return false;
    }
);