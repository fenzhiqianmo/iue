/*       */
import _ from './util';
import installGlobalAPI from './init/api/global';
import init from './init';
import compile from './compile';
import bindings from './bindings';
import dom from './dom';
import event from './event';
import directives from './directives/directives';

function Iue(options        ) {
    this._init(options);
}

Iue.prototype = {
    constructor: Iue,
    ...init,
    ...compile,
    ...bindings,
    ...dom,
    ...event
};

Iue.options = {
    directives: {...directives},
    components: {}
};

installGlobalAPI(Iue);

module.exports = window.Iue = _.Iue = Iue;
