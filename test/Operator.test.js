const
    odrl = require('../src');

describe('odrl.Operator', function () {

    test('odrl.eq', async function () {
        expect(odrl.eq).toBeInstanceOf(odrl.Operator);
        expect(await odrl.eq.apply({
            '@type': 'xsd:date',
            '@value': new Date().toUTCString()
        }, {
            '@type': 'xsd:date',
            '@value': new Date().toUTCString()
        })).toBeTruthy();
        expect(await odrl.eq.apply({
            '@type': 'xsd:string',
            '@value': '1e2'
        }, {
            '@type': 'xsd:string',
            '@value': '100.0'
        })).toBeFalsy();
        expect(await odrl.eq.apply({
            '@type': 'xsd:decimal',
            '@value': '1e2'
        }, {
            '@type': 'xsd:decimal',
            '@value': '100.0'
        })).toBeTruthy();
    });

});