const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * Used to establish strategies to resolve conflicts that arise from the merging of Policies 
 * or conflicts between Permissions and Prohibitions in the same Policy.
 */
class ConflictTerm extends metamodel.Resource {

    #operator;

    constructor(param, operator) {
        _.assert.object(param);
        _.assert.function(operator);
        super(param['@id']);
        this.#operator = operator;
        _.lock.all(this);
    }

    async apply(permissions, prohibitions) {
        _.assert.instance(permissions, model.PermissionContainer);
        _.assert.object(prohibitions);
        return await this.#operator.call(null, permissions, prohibitions);
    }

}

module.exports = ConflictTerm;