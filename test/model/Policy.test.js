const { Rule, Policy, Constraint } = require('../../src/model');

describe('model / Policy', function () {

    test('should instanciate', function () {
        const policy = new Policy({
            '@id': 'ex:test',
            permission: [
                new Rule({
                    uid: 'ex:hello'
                })
            ]
        });
        // console.log(JSON.stringify(policy, null, 4));
        expect(policy.uid).toBe('ex:test');
    });

});