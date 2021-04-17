const _ = require('../util');

exports.AssetCollectionGraph = require('./AssetCollectionGraph');
exports.PartyCollectionGraph = require('./PartyCollectionGraph');

exports.PolicyGraph = require('./PolicyGraph');
exports.PermissionGraph = require('./PermissionGraph');
exports.ProhibitionGraph = require('./ProhibitionGraph');
exports.DutyGraph = require('./DutyGraph');
exports.ObligationGraph = require('./ObligationGraph');
exports.ActionGraph = require('./ActionGraph');

exports.ConstraintGraph = require('./ConstraintGraph');
exports.ConstraintList = require('./ConstraintList');

exports.Operator = require('./Operator');
exports.LogicalOperator = require('./LogicalOperator');
exports.LeftOperand = require('./LeftOperand');
exports.ConflictTerm = require('./ConflictTerm');

_.lock.all.hidden(exports);

exports.Asset = require('./Asset');
exports.AssetCollection = require('./AssetCollection');
exports.Party = require('./Party');
exports.PartyCollection = require('./PartyCollection');

exports.Policy = require('./Policy');
exports.Rule = require('./Rule');
exports.Permission = require('./Permission');
exports.Prohibition = require('./Prohibition');
exports.Duty = require('./Duty');
exports.Action = require('./Action');

exports.LogicalConstraint = require('./LogicalConstraint');
exports.Constraint = require('./Constraint');
exports.RightOperand = require('./RightOperand');

_.lock.all(exports);