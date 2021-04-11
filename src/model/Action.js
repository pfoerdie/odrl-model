const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class ActionSet extends metamodel.IdContainer {
    static validValue(value) { return value instanceof model.Action; }
}

class Action extends metamodel.Resource {

    #executor;

    constructor(param, executor) {
        _.assert.object(param);
        _.assert.function(executor);
        super(param['@id']);
        if (this.uid === _.ODRL.use || this.uid === _.ODRL.transfer) {
            this.includedIn = null;
            this.implies = null;
        } else {
            _.assert.instance(param.includedIn, model.Action);
            this.includedIn = param.includedIn;
            this.implies = new ActionSet(param.implies);
        }
        this.#executor = executor;
        _.lock.all(this);
    }

    async execute(...args) {
        return await this.#executor.apply(null, args);
    }

}

module.exports = Action;