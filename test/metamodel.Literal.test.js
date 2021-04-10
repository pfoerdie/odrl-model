const
    metamodel = require('../src/metamodel');

describe('metamodel.Literal', function () {

    test('should instanciate with a string', function () {
        const literal = new metamodel.Literal('Hello World!');
        expect(literal.value).toBe('Hello World!');
    });

    test('should serialization into json-ld', function () {
        expect(JSON.parse(JSON.stringify(new metamodel.Literal('Test'))))
            .toMatchObject({
                '@value': 'Test'
            });
        expect(JSON.parse(JSON.stringify(new metamodel.Literal(0))))
            .toMatchObject({
                '@value': '0'
            });
    });

});