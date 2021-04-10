const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

class Policy {

    constructor({
        uid,
        profile,
        conflictTerm = 'invalid',
        inheritFrom = [],
        permission = [],
        prohibition = [],
        obligation = []
    }) {
        _.assert(_.is.IRI(uid), 'Policy#constructor - The uid must be an IRI.');
        // _.assert(_.is.IRI(profile), 'Policy#constructor - The profile must be an IRI.');
        _.assert(_.is.array(inheritFrom) && inheritFrom.every(val => val instanceof model.Policy), 'Policy#constructor - The inheritFrom must be an array of Policies.');
        _.assert(_.is.array(permission) && permission.every(val => val instanceof model.Rule), 'Policy#constructor - The permission must be an array of Rules.');
        _.assert(_.is.array(prohibition) && prohibition.every(val => val instanceof model.Rule), 'Policy#constructor - The prohibition must be an array of Rules.');
        _.assert(_.is.array(obligation) && obligation.every(val => val instanceof model.Rule), 'Policy#constructor - The obligation must be an array of Rules.');
        _.assert(permission.length + prohibition.length + obligation.length > 0, 'Policy#constructor - The total number of Rules must not be 0.');
    }

    async evaluate(...args) {

    }

}

module.exports = Policy;