const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * An abstract concept that represents the common characteristics of Permissions, Prohibitions, and Duties.
 * @abstract
 */
class Rule extends metamodel.Resource {

    constructor(param) {
        _.assert(new.target !== Rule, 'abstract class');
        _.assert.object(param);
        _.assert.instance(param.action, model.Action);
        super(param['@id'] || param.uid || _.generateUID());
        this.action = param.action;
        this.constraint = new model.ConstraintGraph(param.constraint);
        if (param.target) _.assert.instance(param.target, model.Asset);
        this.target = param.target || null;
        if (param.assigner) _.assert.instance(param.assigner, model.Party);
        this.assigner = param.assigner || null;
        if (param.assignee) _.assert.instance(param.assignee, model.Party);
        this.assignee = param.assignee || null;
        _.lock.all(this);
    }

    async evaluate(ctx, ...args) {
        _.audit(this, 'evaluate', arguments);
        _.assert.instance(ctx, metamodel.Context);
        _.assert(ctx.target === this);

        if (this.target) {
            const target = ctx.get(_.ODRL.target, true);
            if (!target) return ctx;
            _.assert.instance(target, model.Asset);
            if (!(target.equals(this.target) || target.isPartOf(this.target))) return ctx;
        }

        if (this.assigner) {
            const assigner = ctx.get(_.ODRL.assigner, true);
            if (!assigner) return ctx;
            _.assert.instance(assigner, model.Asset);
            if (!(assigner.equals(this.assigner) || assigner.isPartOf(this.assigner))) return ctx;
        }

        if (this.assignee) {
            const assignee = ctx.get(_.ODRL.assignee, true);
            if (!assignee) return ctx;
            _.assert.instance(assignee, model.Asset);
            if (!(assignee.equals(this.assignee) || assignee.isPartOf(this.assignee))) return ctx;
        }

        const constraintCtxs = await Promise.all(Array.from(this.constraint)
            .map(constraint => constraint.evaluate(new model.ConstraintContext(constraint, ctx), ...args)));

        if (!constraintCtxs.every(ctx => model.TRUE.equals(ctx.get(_.ODRL.status)))) return ctx;

        ctx.set(_.ODRL.action, this.action);
        return ctx;
    }

}

module.exports = Rule;