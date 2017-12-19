exports.define = function (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
};

exports.extend = function (to, from) {
    for (let key in from) {
        to[key] = from[key];
    }
};

exports.proxy = function (to, from, key) {
    if (to.hasOwnProperty(key)) return;
    Object.defineProperty(to, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return from[key];
        },
        set: function (val) {
            from[key] = val;
        }
    });
};
