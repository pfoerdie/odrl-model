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

    async apply(permissions, prohibitions) { // TODO what kind of arguments?
        _.assert.instance(permissions, model.PermissionContainer);
        _.assert.object(prohibitions);
        const result = await this.#operator.call(null, permissions, prohibitions);
        // TODO what kind od result?
        return result;
    }

}

module.exports = ConflictTerm;