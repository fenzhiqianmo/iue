import { extend } from '@/util';
import init from './init';
import compile from './compile';
import bindings from './bindings';
import dom from './dom';
import event from './event';
import global from '@/global';
import directives from '@/directives/directives';
class Iue{
		constructor(options) {
			this.init(options);
		}
}

Iue.prototype = {
    constructor: Iue,
    ...
    (function (ex, obj) {
			(function r(module) {ex(obj, module); return r})
			(init)(compile)(bindings)(dom)(event);
			return obj;
		})(extend, {})
};

Iue.options = {
    directives,
    components: {}
};

global(Iue);

module.exports = window.Iue = Iue;
