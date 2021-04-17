const
    _ = require('../util'),
    model = require('../model');

async function prohibit() {
    // TODO
    _.assert(false);
}

module.exports = new model.ConflictTerm({ '@id': _.ODRL.prohibit }, prohibit);