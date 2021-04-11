const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class RuleSet extends metamodel.GraphContainer {
    static validValue(value) { return value instanceof model.Rule; }
}

class PolicySet extends metamodel.IdContainer {
    static validValue(value) { return value instanceof model.Policy; }
}

class Policy extends metamodel.Resource {

    constructor(param) {
        _.assert.object(param);
        super(param['@id']);
        this.permission = new RuleSet(param.permission);
        this.prohibition = new RuleSet(param.prohibition);
        this.obligation = new RuleSet(param.obligation);
        this.inheritFrom = new PolicySet(param.inheritFrom);
        _.lock.all(this);
    }

    async evaluate(...args) {

    }

}

module.exports = Policy;