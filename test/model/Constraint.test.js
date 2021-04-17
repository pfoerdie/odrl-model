const
    { Literal, Resource } = require('../../src/metamodel'),
    { Constraint } = require('../../src/model'),
    { dateTime, eq } = require('../../src/individuals');

describe('model / Constraint', function () {

    test('construct a Constraint', function () {
        const c = new Constraint({
            leftOperand: dateTime,
            operator: eq,
            rightOperand: new Literal({
                '@type': 'xsd:date',
                '@value': 'Mon, 22 Mar 2021 22:36:09 GMT'
            })
        });
        const c2 = JSON.parse(JSON.stringify(c));
        debugger;
    });

    test('evaluate a Constraint', async function () {
        const c = new Constraint({
            leftOperand: dateTime,
            operator: eq,
            rightOperand: await dateTime.resolve()
        });
        const result = await c.evaluate();
        expect(result).toBe(true);
        debugger;
    });

});