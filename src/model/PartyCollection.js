const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * A Party that is a group of individual entities.
 */
class PartyCollection extends model.Party {

    constructor(param) {
        super(param);
        this.refinement = new model.ConstraintGraph(param.refinement);
        if (param.source) _.assert.string(param.source, _.pattern.IRI);
        this.source = param.source || null;
        _.lock.all(this);
    }

}

module.exports = PartyCollection;