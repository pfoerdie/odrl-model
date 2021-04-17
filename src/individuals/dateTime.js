const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('../model');

/**
 * The date (and optional time and timezone) of exercising the action of the Rule. 
 * Right operand value MUST be an xsd:date or xsd:dateTime.
 */
module.exports = new model.LeftOperand(
    { '@id': _.ODRL.dateTime },
    async function (...args) {
        // TODO The date of exercising the action of the Rule.
        return new metamodel.Literal({
            '@type': 'xsd:date',
            '@value': Date.now()
        });
    }
);