const
    { Literal, Resource } = require('../../src/metamodel'),
    { Policy } = require('../../src/model'),
    { prohibit } = require('../../src/profile');

describe('model / Policy', function () {

    test('should instanciate', function () {
        const policy = new Policy({
            '@id': 'ex:test',
            permission: [],
            conflict: prohibit
        });
        // console.log(JSON.stringify(policy, null, 4));
        expect(policy.uid).toBe('ex:test');
    });

});