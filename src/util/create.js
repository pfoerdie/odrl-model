const _ = require('.');

const create = module.exports = function (obj = null) {
    return Object.create(obj);
};

create.classType = function (validator) {
    const ClassType = create();
    Object.defineProperty(ClassType, Symbol.hasInstance, {
        value: validator
    });
    return ClassType;
};