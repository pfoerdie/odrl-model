const
    metamodel = require('../src/metamodel');

describe('metamodel.Resource', function () {

    test('should instanciate with an IRI', function () {
        const resource = new metamodel.Resource('ex:hello');
        expect(resource.uid).toBe('ex:hello');
    });

    test('should serialization into json-ld', function () {
        expect(JSON.parse(JSON.stringify(new metamodel.Resource('ex:test'))))
            .toMatchObject({
                '@id': 'ex:test'
            });
    });

});