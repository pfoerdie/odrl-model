const
    _ = require('../../src/util'),
    { Literal, Resource, SetContainer } = require('../../src/metamodel');

describe('test: metamodel.SetContainer', function () {

    beforeAll(() => _.audit('test: metamodel.SetContainer'));

    const
        ex_hello = new Resource('ex:hello'),
        ex_lorem = new Resource('ex:lorem'),
        ex_test = new Resource('ex:test'),
        lorem = new Literal('Lorem Ipsum'),
        hello = new Literal({ '@value': 'Hello World!', '@language': 'en' });

    test('should instanciate with a set of resources', function () {
        const container = new SetContainer([
            ex_hello, hello
        ]);
        expect(container.size).toBe(2);
    });

    test('should serialization into json-ld', function () {
        const container = new SetContainer([
            ex_lorem, lorem
        ]);
        expect(JSON.parse(JSON.stringify(container)))
            .toMatchObject([
                { '@id': ex_lorem.uid },
                { '@value': lorem.value }
            ]);
    });

    test('should filter to a new set', function () {
        const container = new SetContainer([
            ex_hello, hello, ex_lorem, lorem
        ]);
        const filtered = container.filter(value => value instanceof Resource);
        expect(filtered).toBeInstanceOf(SetContainer);
        expect(container === filtered).toBeFalsy();
        expect(filtered.size).toBe(2);
        expect(filtered.has(ex_hello)).toBeTruthy();
        expect(filtered.has(ex_lorem)).toBeTruthy();
    });

});