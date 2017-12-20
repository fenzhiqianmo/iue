/**
 * 代理属性
 * @param to {Object} 目标对象
 * @param from {Object} 当前对象
 * @param key {String} 键值
 */
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
