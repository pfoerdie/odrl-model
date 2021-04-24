const
    _ = require('../util'),
    model = require('../model');

/**
 * The policy is void.
 */
module.exports = new model.ConflictTerm(
    { '@id': _.ODRL.invalid },
    /**
     * @param {model.Action} permission 
     * @param {model.Action} prohibition 
     * @returns {boolean} conflicting
     */
    function conflicting(permission, prohibition) {
        _.assert(!permission.equals(prohibition));
        if (permission.includedIn) conflicting(permission.includedIn, prohibition);
        for (let implied of permission.implies) {
            conflicting(implied, prohibition);
        }
        return false;
    }
);