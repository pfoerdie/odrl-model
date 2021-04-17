const _ = require('../util');

// Resource Concepts (hidden)
exports.AssetCollectionGraph = require('./AssetCollectionGraph');
exports.PartyCollectionGraph = require('./PartyCollectionGraph');

// Policy Concepts (hidden)
exports.ConflictTerm = require('./ConflictTerm');
exports.PolicyGraph = require('./PolicyGraph');
exports.PermissionGraph = require('./PermissionGraph');
exports.ProhibitionGraph = require('./ProhibitionGraph');
exports.DutyGraph = require('./DutyGraph');
exports.ObligationGraph = require('./ObligationGraph');

// Action Concepts (hidden)
exports.ActionGraph = require('./ActionGraph');

// Constraint Concepts (hidden)
exports.Operator = require('./Operator');
exports.LogicalOperator = require('./LogicalOperator');
exports.LeftOperand = require('./LeftOperand');
exports.ConstraintGraph = require('./ConstraintGraph');
exports.ConstraintList = require('./ConstraintList');

_.lock.all.hidden(exports);

// Resource Concepts
exports.Asset = require('./Asset');
exports.AssetCollection = require('./AssetCollection');
exports.Party = require('./Party');
exports.PartyCollection = require('./PartyCollection');

// Policy Concepts
exports.Policy = require('./Policy');
exports.Rule = require('./Rule');
exports.Permission = require('./Permission');
exports.Prohibition = require('./Prohibition');
exports.Duty = require('./Duty');

// Action Concepts
exports.Action = require('./Action');

// Constraint Concepts
exports.LogicalConstraint = require('./LogicalConstraint');
exports.Constraint = require('./Constraint');
exports.RightOperand = require('./RightOperand');

_.lock.all(exports);