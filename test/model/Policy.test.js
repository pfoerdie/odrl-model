const
    odrl = require('../../src');

describe('model / Policy', function () {

    test('should instanciate', function () {
        const policy = new odrl.Policy({
            '@id': 'ex:test',
            permission: [],
            conflict: odrl.prohibit
        });
        // console.log(JSON.stringify(policy, null, 4));
        expect(policy.uid).toBe('ex:test');
    });

});