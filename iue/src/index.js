import { extend } from '@/util';

class Iue{
		constructor(options) {
			this.init(options);
		}
}

Iue.prototype = {
    constructor: Iue,
    ...
    (() => {
			let o = {};
			(function r(s) {
				extend(o, s);
				return r;
			})(require('./init'))(require('./compile'))(require('./bindings'))(require('./dom'))(require('./event'))
			return o;
		})()
};

Iue.options = {
    directives: {...require('@/directives/directives')},
    components: {}
};

require('@/init/api/global')(Iue);

module.exports = window.Iue = Iue;
