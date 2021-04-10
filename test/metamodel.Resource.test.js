const
    { Resource } = require('../src/metamodel');

describe('metamodel.Resource.test', function () {

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