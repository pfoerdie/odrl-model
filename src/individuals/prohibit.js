const
    _ = require('../util'),
    model = require('../model');

/**
 * Prohibitions take preference over permissions.
 */
module.exports = new model.ConflictTerm(
    { '@id': _.ODRL.prohibit },
    /**
     * @param {model.Action} permission 
     * @param {model.Action} prohibition 
     * @returns {boolean} conflicting
     */
    function conflicting(permission, prohibition) {
        if (permission.equals(prohibition)) return true;
        if (permission.includedIn && conflicting(permission.includedIn, prohibition)) return true;
        for (let implied of permission.implies) {
            if (conflicting(implied, prohibition))
                return true;
        }
        return false;
    }
);