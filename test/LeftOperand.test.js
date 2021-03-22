const
    odrl = require('../src');

describe('odrl.LeftOperand', function () {

    test('odrl.dateTime', function () {
        expect(odrl.dateTime).toBeInstanceOf(odrl.LeftOperand);
    });

});