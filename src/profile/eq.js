const
    _ = require('../util'),
    model = require('../model');

async function eq(left, right) {
    if (left['@id'] || right['@id'])
        return left['@id'] === right['@id'];
    if (left['@language'] || right['@language'])
        return left['@language'] === right['@language'] && left['@value'] === right['@value'];
    if (!left['@type'] || !right['@type'])
        return !left['@type'] === !right['@type'] && left['@value'] === right['@value'];
    if (left['@type'] !== right['@type'])
        return false;
    switch (left['@type']) {
        case 'xsd:date':
            return Date.parse(left['@value']) === Date.parse(right['@value']);
        case 'xsd:integer':
            return parseInt(left['@value']) === parseInt(right['@value']);
        case 'xsd:decimal':
            return parseFloat(left['@value']) === parseFloat(right['@value']);
        default:
            return left['@value'] === right['@value'];
    }
}

module.exports = new model.Operator('odrl:eq', eq);