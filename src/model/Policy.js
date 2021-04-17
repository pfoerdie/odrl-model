const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * A non-empty group of Permissions and/or Prohibitions.
 */
class Policy extends metamodel.Resource {

    constructor(param) {
        _.assert.object(param);
        super(param['@id']);
        _.assert.instance(param.conflict, model.ConflictTerm);
        this.conflict = param.conflict;
        this.permission = new model.PermissionGraph(param.permission);
        this.prohibition = new model.ProhibitionGraph(param.prohibition);
        this.obligation = new model.ObligationGraph(param.obligation);
        this.inheritFrom = new model.PolicyGraph(param.inheritFrom);
        _.lock.all(this);
    }

    async evaluate(...args) {
        // TODO integrate inheritFrom
        const [permissions, prohibitions] = await Promise.all([
            Promise.all(Array.from(this.permission)
                .map(rule => rule.evaluate(...args))),
            Promise.all(Array.from(this.prohibition)
                .map(rule => rule.evaluate(...args)))
        ]);
        // TODO what to do next?
        const conflict = await this.conflict.apply(permissions, prohibitions);
        // TODO what is the conflict result and what to do with it?
        if (conflict) return;
        const obligation = await Promise.all(Array.from(this.obligation)
            .map(rule => rule.evaluate(...args)));
        // TODO which action must be performed and what result should be returned?
        const decision = obligation.every(val => val) ? 'Permit' : 'Prohibit';
        return decision;
    }

}

module.exports = Policy;