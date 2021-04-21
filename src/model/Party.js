const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * An entity or a collection of entities that undertake Roles in a Rule.
 */
class Party extends metamodel.Resource {

    constructor(param) {
        _.assert.object(param);
        super(param['@id'] || param.uid);
        this.partOf = new model.PartyCollectionGraph(param.partOf);
        _.lock.all(this);
    }

    isPartOf(target) {
        if (!(target instanceof model.PartyCollection)) return false;
        return this.partOf.some((parent) => {
            if (target.uid === parent.uid) return true;
            if (parent.isPartOf(target)) return true;
        });
    }

}

module.exports = Party;