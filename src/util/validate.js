const _ = require('.');

const validate = module.exports = function (value, schema) {
    if (_.is.array(schema))
        return schema.some(entry => _.validate(value, entry));

    return schema
        && (!schema.type || (
            typeof value === type
        ))
        && (!schema.class || (
            value instanceof schema.class
        ))
        && (!schema.member || (
            _.is.array(value) && value.every(
                (entry) => _.validate(entry, schema.member)
            )
        ))
        && (!schema.prop || (
            _.is.object(value) && Object.entries(schema.prop).every(
                ([key, entry]) => _.validate(value[key], entry)
            )
        ))
        && (!schema.pattern || (
            _.is.string(value) && schema.pattern.test(value)
        ));
};