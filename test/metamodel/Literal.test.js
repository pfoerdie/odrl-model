const { Literal, Resource } = require('../../src/metamodel');

describe('metamodel / Literal', function () {

    test('should instanciate with a string', function () {
        const literal = new Literal('Hello World!');
        expect(literal.value).toBe('Hello World!');
    });

    test('should serialization into json-ld', function () {
        expect(JSON.parse(JSON.stringify(new Literal('Test'))))
            .toMatchObject({
                '@value': 'Test'
            });
        expect(JSON.parse(JSON.stringify(new Literal(0))))
            .toMatchObject({
                '@value': '0',
                '@type': 'xsd:decimal'
            });
    });

});