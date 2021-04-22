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

    async apply(permissionCtxs, prohibitionCtxs) {
        _.assert.array(permissionCtxs, val => val instanceof model.RuleContext);
        _.assert.array(prohibitionCtxs, val => val instanceof model.RuleContext);
        permissionCtxs = permissionCtxs.filter(ctx => model.TRUE.equals(ctx.get(_.ODRL.status)));
        prohibitionCtxs = prohibitionCtxs.filter(ctx => model.TRUE.equals(ctx.get(_.ODRL.status)));
        const result = await this.#operator.call(null, permissions, prohibitions);
        if (_.is.boolean(result))
            return result && model.TRUE || model.FALSE;
        else
            return null;
    }

}

module.exports = ConflictTerm;