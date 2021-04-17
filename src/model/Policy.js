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

    }

}

module.exports = Policy;