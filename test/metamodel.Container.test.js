const
    metamodel = require('../src/metamodel'),
    { Literal, Resource, Container } = metamodel;

describe('metamodel.Container.test', function () {

    const
        ex_hello = new Resource('ex:hello'),
        ex_lorem = new Resource('ex:lorem'),
        ex_test = new Resource('ex:test'),
        lorem = new Literal('Lorem Ipsum'),
        hello = new Literal({ '@value': 'Hello World!', '@language': 'en' });

    describe('@graph', function () {

        test('should instanciate with a graph of resources', function () {
            const container = new Container({
                '@graph': [ex_hello, ex_lorem, ex_test]
            });
            expect(container.size).toBe(3);
        });

        test('should serialization into json-ld', function () {
            const container = new Container({
                '@graph': [ex_hello, ex_lorem, ex_test,]
            });
            expect(JSON.parse(JSON.stringify(container)))
                .toMatchObject({
                    '@graph': [
                        { '@id': ex_hello.uid },
                        { '@id': ex_lorem.uid },
                        { '@id': ex_test.uid }
                    ]
                });
        });

    });

    describe('@list', function () {

        test('should instanciate with a list of literals', function () {
            const container = new Container({
                '@list': [lorem, hello]
            });
            expect(container.size).toBe(2);
        });

        test('should serialization into json-ld', function () {
            const container = new Container({
                '@list': [lorem, hello]
            });
            expect(JSON.parse(JSON.stringify(container)))
                .toMatchObject({
                    '@list': [{
                        '@value': lorem.value
                    }, {
                        '@value': hello.value,
                        '@language': hello.language
                    }]
                });
        });

    });

    describe('@set', function () {

        test('should instanciate with a set of resources', function () {
            const container = new Container({
                '@set': [ex_hello, hello]
            });
            expect(container.size).toBe(2);
        });

        test('should serialization into json-ld', function () {
            const container = new Container({
                '@set': [ex_lorem, lorem]
            });
            expect(JSON.parse(JSON.stringify(container)))
                .toMatchObject({
                    '@set': [
                        { '@id': ex_lorem.uid },
                        { '@value': lorem.value }
                    ]
                });
        });

        test('should filter to a new set', function () {
            const container = new Container({
                '@set': [ex_hello, hello, ex_lorem, lorem]
            });
            const filtered = container.filter(value => value instanceof Resource);
            expect(filtered).toBeInstanceOf(Container);
            expect(container === filtered).toBeFalsy();
            expect(filtered.size).toBe(2);
            expect(filtered.has(ex_hello)).toBeTruthy();
            expect(filtered.has(ex_lorem)).toBeTruthy();
        });

    });

});