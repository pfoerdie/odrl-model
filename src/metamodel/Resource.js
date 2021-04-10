const
    _ = require('../util'),
    model = require('.');

class Resource {

    #uid = '';
    #type = null;

    constructor(param) {
        if (_.is.string(param)) {
            _.assert.string(param, _.pattern.IRI);
            this.#uid = param;
        } else {
            _.assert.object(param);
            _.assert.string(param['@id'], _.pattern.IRI);
            this.#uid = param['@id'];
        }
        this.#type = new.target;
    }

    get uid() { return this.#uid; }
    get type() { return this.#type; }

    toJSON() {
        return { '@id': this.#uid };
    }

}

module.exports = Resource;