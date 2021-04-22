const
    _ = require('../src/util');

describe('test: util', function () {

    beforeAll(() => _.audit('test: util'));

    test('audit', async function () {
        _.audit({ uid: 'ex:test' }, 'constructor', new Error('bad error'));
        _.audit(Object, 'hasOwnProperty', new Error('bad error'));
    });

});