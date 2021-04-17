const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * An abstract concept that represents the common characteristics of Permissions, Prohibitions, and Duties.
 */
class Rule extends metamodel.Resource {

    constructor(param) {
        _.assert(new.target !== Rule, 'abstract class');
        _.assert.object(param);
        _.assert.instance(param.action, model.Action);
        super(param['@id'] || _.generateUID());
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

    async evaluate(...args) {
        const results = await Promise.all(Array.from(this.constraint)
            .map(constraint => constraint.evaluate(...args)));
        // TODO what to do next?
        if (!results.every(val => val)) return false;
        const result = await this.action(...args);
        // TODO what result is expected?
        return result;
    }

}

module.exports = Rule;