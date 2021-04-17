const
    _ = require('../util'),
    model = require('../model');

/**
 * Indicating that a given value is greater than the right operand of the Constraint.
 */
module.exports = new model.Operator(
    { '@id': _.ODRL.gt },
    async function (left, right) {
        if (left['@id'] || right['@id'])
            return false;
        if (left['@language'] || right['@language'])
            return false;
        if (left['@type'] !== right['@type'])
            return false;
        switch (left['@type']) {
            case _.XSD.date:
            case _.XSD.dateTime:
                return Date.parse(left['@value']) > Date.parse(right['@value']);
            case _.XSD.integer:
                return parseInt(left['@value']) > parseInt(right['@value']);
            case _.XSD.decimal:
            case _.XSD.float:
            case _.XSD.double:
            default:
                return parseFloat(left['@value']) > parseFloat(right['@value']);
        }
    }
);