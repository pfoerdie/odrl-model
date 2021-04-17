const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('.');

/**
 * Right operand for constraint expression.
 */
class RightOperand extends metamodel.Resource {

    constructor(param) {
        _.assert.object(param);
        super(param['@id'] || _.generateUID());
        for (let [key, value] of Object.entries(param)) {
            if (_.is.string.IRI(key)) {
                _.assert.instance(value, metamodel.Entity);
                param[key] = value;
            }
        }
        _.lock.all(this);
    }

}

module.exports = RightOperand;