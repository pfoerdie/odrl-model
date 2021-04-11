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
            const uid = param['@id'] || param.uid || param.id;
            _.assert.string(uid, _.pattern.IRI);
            this.#uid = uid;
        }
        this.#type = new.target;
    }

    get uid() { return this.#uid; }
    get type() { return this.#type; }

    toJSON() {
        return Object.assign({ '@id': this.#uid }, this);
    }

}

module.exports = Resource;