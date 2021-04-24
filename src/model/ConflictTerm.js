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
        super(param['@id'] || param.uid);
        this.#operator = operator;
        _.lock.all(this);
    }

    async apply(permissions, prohibitions) {
        _.audit(this, 'apply', arguments);
        _.assert.array(permissions, val => val instanceof model.Action);
        _.assert.array(prohibitions, val => val instanceof model.Action);
        const result = [], operator = this.#operator;
        for (let perm of permissions) {
            for (let prohibit of prohibitions) {
                try {
                    const conflicting = await operator.call(null, perm, prohibit);
                    if (!conflicting) result.push(perm);
                } catch (err) {
                    return [];
                }
            }
        }
        return result;
    }

}

module.exports = ConflictTerm;