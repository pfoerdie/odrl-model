const
    _ = require('../util'),
    url = require('url'),
    metamodel = require('../metamodel'),
    model = require('.'),
    individuals = require('../individuals');

/**
 * A Policy that proposes a Rule over an Asset from an assignee.
 */
class RequestPolicy extends model.Policy {

    constructor(request) {
        _.assert.object(request);
        _.assert.string(request.originalUrl);
        _.assert.function(request.get);
        super({
            uid: _.generateUID(),
            conflict: individuals.invalid,
            target: new model.Asset({
                uid: new url.URL(request.originalUrl, 'http://' + request.get('host')).toString()
            }),
            // assignee: new model.Party({
            //     uid: null // TODO
            // })
        });
        this.request = request;
        _.lock.all.hidden(this);
    }

    async evaluate(response, next) {
        _.assert.object(response);
        _.assert.function(response.send);
        _.assert.function(next);
        const ctx = new metamodel.Context(this);
        ctx.set(_.ODRL.target, this.target);
        if (this.assignee) ctx.set(_.ODRL.assignee, this.assignee);
        if (this.assigner) ctx.set(_.ODRL.assigner, this.assigner);
        return await super.evaluate(ctx, response, next);
    }

}

module.exports = RequestPolicy;