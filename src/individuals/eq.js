const
    _ = require('../util'),
    model = require('../model');

/**
 * Indicating that a given value equals the right operand of the Constraint.
 */
module.exports = new model.Operator(
    { '@id': _.ODRL.eq },
    async function (left, right) {
        if (left['@id'] || right['@id'])
            return left['@id'] === right['@id'];
        if (left['@language'] || right['@language'])
            return left['@language'] === right['@language'] && left['@value'] === right['@value'];
        if (left['@type'] !== right['@type'])
            return false;
        switch (left['@type']) {
            case _.XSD.date:
            case _.XSD.dateTime:
                return Date.parse(left['@value']) === Date.parse(right['@value']);
            case _.XSD.integer:
                return parseInt(left['@value']) === parseInt(right['@value']);
            case _.XSD.decimal:
            case _.XSD.float:
            case _.XSD.double:
                return parseFloat(left['@value']) === parseFloat(right['@value']);
            default:
                return left['@value'] === right['@value'];
        }
    }
);