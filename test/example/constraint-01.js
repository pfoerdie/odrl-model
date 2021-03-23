const
    odrl = require('../../src');

module.exports = new odrl.Constraint({
    uid: 'ex:constraint-01',
    leftOperand: odrl.dateTime,
    operator: odrl.eq,
    rightOperand: {
        '@type': 'xsd:date',
        '@value': new Date().toUTCString()
    }
});