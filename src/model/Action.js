const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * An operation on an Asset.
 */
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
            this.implies = new model.ActionGraph(param.implies);
        }
        this.#executor = executor;
        this.refinement = new model.ConstraintGraph(param.refinement);
        _.lock.all(this);
    }

    async execute(...args) {
        return await this.#executor.apply(null, args);
    }

}

module.exports = Action;