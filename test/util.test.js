const
    _ = require('../src/util');

describe('util', function () {

    test('audit', async function () {
        _.audit({ uid: 'ex:test' }, 'constructor', new Error('bad error'));
        _.audit(Object, 'hasOwnProperty', new Error('bad error'));
    });

});