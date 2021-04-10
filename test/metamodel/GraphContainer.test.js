const { Literal, Resource, GraphContainer } = require('../../src/metamodel');

describe('metamodel / GraphContainer', function () {

    const
        ex_hello = new Resource('ex:hello'),
        ex_lorem = new Resource('ex:lorem'),
        ex_test = new Resource('ex:test'),
        lorem = new Literal('Lorem Ipsum'),
        hello = new Literal({ '@value': 'Hello World!', '@language': 'en' });

    test('should instanciate with a graph of resources', function () {
        const container = new GraphContainer([
            ex_hello, ex_lorem, ex_test
        ]);
        expect(container.size).toBe(3);
    });

    test('should serialization into json-ld', function () {
        const container = new GraphContainer([
            ex_hello, ex_lorem, ex_test
        ]);
        expect(JSON.parse(JSON.stringify(container)))
            .toMatchObject([
                { '@id': ex_hello.uid },
                { '@id': ex_lorem.uid },
                { '@id': ex_test.uid }
            ]);
    });

});