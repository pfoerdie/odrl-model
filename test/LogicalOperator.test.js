const
    odrl = require('../src');

describe('odrl.LogicalOperator', function () {

    test('odrl.and', function () {
        expect(odrl.and).toBeInstanceOf(odrl.LogicalOperator);
    });

    test('odrl.or', function () {
        expect(odrl.or).toBeInstanceOf(odrl.LogicalOperator);
    });

});