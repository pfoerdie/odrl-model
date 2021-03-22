const
    odrl = require('../src');

describe('odrl.Constraint', function () {

    test('construct a Constraint', function () {
        const c = new odrl.Constraint({
            leftOperand: odrl.dateTime,
            operator: odrl.eq,
            rightOperand: {
                '@type': 'xsd:date',
                '@value': 'Mon, 22 Mar 2021 22:36:09 GMT'
            }
        });
        const c2 = JSON.parse(JSON.stringify(c));
        debugger;
    });

});