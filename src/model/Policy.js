const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

// function filterRules(ctx, rules) {
//     const { target, assignee, assigner } = ctx.root.target;
//     _.assert.instance(target, model.Asset);
//     if (assignee) _.assert.instance(assignee, model.Party);
//     if (assigner) _.assert.instance(assigner, model.Party);
//     return Array.from(rules).filter(function (rule) {
//         if (rule.target) {
//             // if (!target) return false;
//             if (!(target.equals(rule.target) || target.isPartOf(rule.target))) return false;
//         } else {
//             return false;
//         }
//         if (rule.assignee) {
//             if (!assignee) return false;
//             if (!(assignee.equals(rule.assignee) || assignee.isPartOf(rule.assignee))) return false;
//         }
//         if (rule.assigner) {
//             if (!assigner) return false;
//             if (!(assigner.equals(rule.assigner) || assigner.isPartOf(rule.assigner))) return false;
//         }
//         return true;
//     });
// }

/**
 * A non-empty group of Permissions and/or Prohibitions.
 */
class Policy extends metamodel.Resource {

    constructor(param) {
        _.assert.object(param);
        super(param['@id'] || param.uid);
        _.assert.instance(param.conflict, model.ConflictTerm);
        this.conflict = param.conflict;
        this.permission = new model.PermissionGraph(param.permission);
        this.prohibition = new model.ProhibitionGraph(param.prohibition);
        this.obligation = new model.ObligationGraph(param.obligation);
        this.inheritFrom = new model.PolicyGraph(param.inheritFrom);
        if (param.target) _.assert.instance(param.target, model.Asset, model.Identifier);
        this.target = param.target || null;
        if (param.assigner) _.assert.instance(param.assigner, model.Party, model.Identifier);
        this.assigner = param.assigner || null;
        if (param.assignee) _.assert.instance(param.assignee, model.Party, model.Identifier);
        this.assignee = param.assignee || null;
        _.lock.all(this);
    }

    /**
     * @param {metamodel.Context} ctx 
     * @param  {...any} args 
     * @returns {Promise<metamodel.Context>}
     */
    async evaluate(ctx, ...args) {
        _.assert.instance(ctx, metamodel.Context);
        _.assert(ctx.target === this);

        const [permissionCtxs, prohibitionCtxs] = await Promise.all([
            Promise.all(Array.from(this.permission)
                .map(rule => rule.evaluate(new model.RuleContext(rule, ctx), ...args))),
            Promise.all(Array.from(this.prohibition)
                .map(rule => rule.evaluate(new model.RuleContext(rule, ctx), ...args)))
        ]);

        // NOTE The question is, what do I need here? 
        //      Then settle on arguments and returns. 
        //      And find a general pattern for the entity methods!

        const conflict = await this.conflict.apply(
            permissionCtxs.filter(ctx => model.TRUE.equals(ctx.get(_.ODRL.status))),
            prohibitionCtxs.filter(ctx => model.TRUE.equals(ctx.get(_.ODRL.status)))
        );
        if (!conflict) return null;
        ctx.set(_.ODRL.conflict, conflict);

        const inheritCtxs = await Promise.all(Array.from(this.inheritFrom)
            .map(policy => policy.evaluate(new model.PolicyContext(policy, ctx), ...args)));



        // TODO integrate inheritFrom, use ctx as parent
        // const [permissions, prohibitions] = await Promise.all([
        //     Promise.all(filterRules(ctx, this.permission)
        //         .map(rule => rule.evaluate(new model.RuleContext(rule, ctx), ...args))),
        //     Promise.all(filterRules(ctx, this.prohibition)
        //         .map(rule => rule.evaluate(new model.RuleContext(rule, ctx), ...args)))
        // ]);
        // debugger;
        // TODO what to do next?
        // const conflict = await this.conflict.apply(permissions, prohibitions);
        // debugger;
        // TODO what is the conflict result and what to do with it?
        // if (conflict) return;
        // const obligation = await Promise.all(Array.from(this.obligation)
        //     .map(rule => rule.evaluate(...args)));
        // debugger;
        // TODO which action must be performed and what result should be returned?
        // const decision = obligation.every(val => val) ? 'Permit' : 'Prohibit';

        debugger;
        return ctx;
    }

}

module.exports = Policy;