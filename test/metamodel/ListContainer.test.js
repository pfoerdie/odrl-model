const
    { Literal, Resource, ListContainer } = require('../../src/metamodel');

describe('metamodel / ListContainer', function () {

    const
        ex_hello = new Resource('ex:hello'),
        ex_lorem = new Resource('ex:lorem'),
        ex_test = new Resource('ex:test'),
        lorem = new Literal('Lorem Ipsum'),
        hello = new Literal({ '@value': 'Hello World!', '@language': 'en' });

    test('should instanciate with a list of literals', function () {
        const container = new ListContainer([
            lorem, hello
        ]);
        expect(container.size).toBe(2);
    });

    test('should serialization into json-ld', function () {
        const container = new ListContainer([
            lorem, hello
        ]);
        expect(JSON.parse(JSON.stringify(container)))
            .toMatchObject([{
                '@value': lorem.value
            }, {
                '@value': hello.value,
                '@language': hello.language
            }]);
    });

});