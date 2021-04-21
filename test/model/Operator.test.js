const
    { Literal, Resource } = require('../../src/metamodel'),
    { Operator } = require('../../src/model'),
    { dateTime, eq } = require('../../src/individuals');

describe('model / Operator', function () {

    test('odrl.eq', async function () {
        expect(eq).toBeInstanceOf(Operator);
        expect((await eq.apply({
            '@type': 'xsd:date',
            '@value': new Date().toUTCString()
        }, {
            '@type': 'xsd:date',
            '@value': new Date().toUTCString()
        })).toJSON()).toMatchObject({
            '@type': 'xsd:boolean',
            '@value': 'true'
        });
        expect((await eq.apply({
            '@type': 'xsd:string',
            '@value': '1e2'
        }, {
            '@type': 'xsd:string',
            '@value': '100.0'
        })).toJSON()).toMatchObject({
            '@type': 'xsd:boolean',
            '@value': 'false'
        });
        expect((await eq.apply({
            '@type': 'xsd:decimal',
            '@value': '1e2'
        }, {
            '@type': 'xsd:decimal',
            '@value': '100.0'
        })).toJSON()).toMatchObject({
            '@type': 'xsd:boolean',
            '@value': 'true'
        });
    });

});