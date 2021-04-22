const
    _ = require('../../src/util'),
    { Literal, Resource } = require('../../src/metamodel');

describe('test: metamodel.Resource', function () {

    beforeAll(() => _.audit('test: metamodel.Resource'));

    test('should instanciate with an IRI', function () {
        const resource = new Resource('ex:hello');
        expect(resource.uid).toBe('ex:hello');
    });

    test('should serialization into json-ld', function () {
        expect(JSON.parse(JSON.stringify(new Resource('ex:test'))))
            .toMatchObject({
                '@id': 'ex:test'
            });
    });

});