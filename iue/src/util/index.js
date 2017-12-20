let extend = exports.extend = function (to, from) {
    for (let key in from) {
        to[key] = from[key];
    }
    return exports;
};
(function e(o) {
	extend(exports, o);
	return e;
})
(require('./define'))
(require('./proxy'))
(require('./warn'))
(require('./mergeOptions'))

