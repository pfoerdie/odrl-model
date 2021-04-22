const
    _ = require('../../src/util'),
    { Literal, Resource } = require('../../src/metamodel');

describe('test: metamodel.Literal', function () {

    beforeAll(() => _.audit('test: metamodel.Literal'));

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
                '@type': 'xsd:integer'
            });
    });

    test('should instanciate from native types', function () {
        expect(new Literal(42).toJSON()).toMatchObject({
            '@value': '42',
            '@type': 'xsd:integer'
        });
        expect(new Literal(true).toJSON()).toMatchObject({
            '@value': 'true',
            '@type': 'xsd:boolean'
        });
        expect(new Literal(false).toJSON()).toMatchObject({
            '@value': 'false',
            '@type': 'xsd:boolean'
        });
        expect(new Literal(0).toJSON()).toMatchObject({
            '@value': '0',
            '@type': 'xsd:integer'
        });
        expect(new Literal(13.37).toJSON()).toMatchObject({
            '@value': '13.37',
            '@type': 'xsd:float'
        });
        expect(new Literal(new Date(0)).toJSON()).toMatchObject({
            '@value': '1970-01-01T00:00:00.000Z',
            '@type': 'xsd:date'
        });
        expect(new Literal('lorem ipsum').toJSON()).toMatchObject({
            '@value': 'lorem ipsum',
            '@type': 'xsd:string'
        });
    });

});