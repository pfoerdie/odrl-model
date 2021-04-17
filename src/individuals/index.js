const _ = require('../util');

// Logical Operators
exports.and = require('./and');
exports.andSequence = require('./andSequence');
exports.or = require('./or');
exports.xone = require('./xone');

// Operators
exports.eq = require('./eq');
exports.lt = require('./lt');
exports.lteq = require('./lteq');
exports.gt = require('./gt');
exports.gteq = require('./gteq');
exports.neq = require('./neq');

// Left Operands
exports.dateTime = require('./dateTime');

// Conflict Terms
exports.prohibit = require('./prohibit');
exports.perm = require('./perm');
exports.invalid = require('./invalid');

_.lock.all(exports);