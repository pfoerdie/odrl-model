const
    _ = require('../util'),
    metamodel = require('../metamodel'),
    model = require('../model');

async function dateTime() {
    return new metamodel.Literal({
        '@type': 'xsd:date',
        '@value': new Date()
    });
}

module.exports = new model.LeftOperand({ '@id': _.ODRL.dateTime }, dateTime);