const
    _ = require('../util'),
    model = require('../model');

async function dateTime() {
    return {
        '@type': 'xsd:date',
        '@value': new Date().toUTCString()
    };
}

module.exports = new model.LeftOperand('odrl:dateTime', dateTime);