const
    _ = require('../util'),
    model = require('../model');

/**
 * Indicating that a given value is not equal to the right operand of the Constraint.
 */
module.exports = new model.Operator(
    { '@id': _.ODRL.neq },
    async function (left, right) {
        if (left['@id'] || right['@id'])
            return left['@id'] !== right['@id'];
        if (left['@language'] || right['@language'])
            return left['@language'] !== right['@language'] || left['@value'] !== right['@value'];
        if (left['@type'] !== right['@type'])
            return true;
        switch (left['@type']) {
            case _.XSD.date:
            case _.XSD.dateTime:
                return Date.parse(left['@value']) !== Date.parse(right['@value']);
            case _.XSD.integer:
                return parseInt(left['@value']) !== parseInt(right['@value']);
            case _.XSD.decimal:
            case _.XSD.float:
            case _.XSD.double:
                return parseFloat(left['@value']) !== parseFloat(right['@value']);
            default:
                return left['@value'] !== right['@value'];
        }
    }
);