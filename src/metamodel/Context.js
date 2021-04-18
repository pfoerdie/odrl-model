const
    _ = require('../util'),
    metamodel = require('.'),
    findRoot = (ctx) => (ctx.parent && findRoot(ctx.parent)) || ctx;

class Context {

    /**
     * @param {model.Entity} target 
     * @param {model.Context} [parent] 
     */
    constructor(target, parent) {
        _.assert.instance(target, metamodel.Entity);
        if (new.target === Context) {
            parent = null;
        } else {
            _.assert.instance(parent, Context);
        }
        this.type = new.target;
        this.target = target;
        this.parent = parent;
        /** @type {model.Context} */
        this.root = findRoot(this);
        _.lock.all.hidden(this);
    }

}

module.exports = Context;