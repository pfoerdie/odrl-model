const odrl = require('../../src');

exports.assets = new odrl.AssetCollection({
    uid: 'ex:assets'
});

exports.date_constraint = new odrl.Constraint({
    uid: 'ex:date-constraint',
    leftOperand: odrl.dateTime,
    operator: odrl.eq,
    rightOperand: new odrl.Literal({
        '@type': 'xsd:date',
        '@value': new Date(Date.now() + 60e3).toUTCString()
    })
});

exports.policy_1 = new odrl.Policy({
    uid: 'ex:policy-1',
    conflict: odrl.invalid,
    permission: [new odrl.Permission({
        action: odrl.use,
        target: exports.assets,
        constraint: [exports.date_constraint]
    })]
});