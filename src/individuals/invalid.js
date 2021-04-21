const
    _ = require('../util'),
    model = require('../model');

/**
 * The policy is void.
 */
module.exports = new model.ConflictTerm(
    { '@id': _.ODRL.invalid },
    /**
     * @param {Array<model.RuleContext>} permissionCtxs 
     * @param {Array<model.RuleContext>} prohibitionCtxs 
     */
    async function (permissionCtxs, prohibitionCtxs) {
        const
            permissions = permissionCtxs.filter(ctx => ctx.get(_.ODRL.status));
        // TODO
        _.assert(false, 'not implemented');
    }
);