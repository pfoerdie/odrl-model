const
    _ = require('../util'),
    model = require('.');

class Literal {

    #value = '';
    #language = '';
    #datatype = _.XSD.string;

    constructor(param) {
        let
            native = !_.is.object(param),
            value = native ? param : param['@value'],
            language = native ? null : param['@language'],
            datatype = native ? null : param['@type'];

        if (language) {
            this.datatype = _.RDF.langString;
            this.language = language;
            this.value = value
        } else if (datatype) {
            this.datatype = datatype;
            this.value = value;
        } else if (_.is.string(value)) {
            this.datatype = _.XSD.string;
            this.value = value;
        } if (_.is.boolean(value)) {
            this.datatype = _.XSD.boolean;
            this.value = value;
        } else if (_.is.number(value)) {
            this.datatype = _.is.number.integer(value) ? _.XSD.decimal : _.XSD.float;
            this.value = value;
        } else {
            this.value = value;
        }
    }

    get value() { return this.#value; }
    set value(value) {
        if (Object.isFrozen(this)) return;
        switch (this.#datatype) {
            case _.XSD.string:
            case _.RDF.langString:
                this.#value = _.parse.xsd_string(value).toString();
                break;
            case _.XSD.boolean:
                this.#value = _.parse.xsd_boolean(value).toString();
                break;
            case _.XSD.decimal:
                this.#value = _.parse.xsd_decimal(value).toString();
                break;
            case _.XSD.float:
                this.#value = _.parse.xsd_float(value).toString();
                break;
            default:
                this.#value = _.parse(value).toString();
                break;
        }
    }

    get language() { return this.#language; }
    set language(language) {
        if (Object.isFrozen(this)) return;
        _.assert.equal(this.#datatype, _.RDF.langString);
        _.assert.string(language, _.pattern.Language);
        this.#language = language;
    }

    get datatype() { return this.#datatype; }
    set datatype(datatype) {
        if (Object.isFrozen(this)) return;
        if (datatype === _.RDF.langString) {
            this.#datatype = _.RDF.langString;
            this.#language = this.#language || 'en';
        } else {
            _.assert.string(datatype, _.pattern.IRI);
            this.#datatype = datatype;
            this.#language = '';
        }
    }

    toJSON() {
        return this.#datatype === _.RDF.langString ? {
            '@language': this.#language,
            '@value': this.#value
        } : {
            '@type': this.#datatype,
            '@value': this.#value
        };
    }

    valueOf() {
        switch (this.#datatype) {
            case _.XSD.boolean:
                return this.#value === ('' + true);
            case _.XSD.decimal:
                return parseInt(this.#value);
            case _.XSD.float:
                return parseFloat(this.#value);
            default:
                return this.#value;
        }
    }

}

module.exports = Literal;