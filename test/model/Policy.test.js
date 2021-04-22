const
    _ = require('../../src/util'),
    { Literal, Resource } = require('../../src/metamodel'),
    { Policy } = require('../../src/model'),
    { prohibit } = require('../../src/individuals');

describe('test: model.Policy', function () {

    beforeAll(() => _.audit('test: model.Policy'));

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