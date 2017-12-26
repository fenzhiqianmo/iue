/**
 * 初始化所有计算属性
 * 将计算属性定义的function当成是该属性的getter函数
 */
exports.initComputed = function () {
    let computed = this.$options.computed;
    if (!computed) return this;
    for (let key in computed) {
        let def = computed[key];
        if (typeof def === 'function') {
            def = {
                get: def
            };
            def.enumerable = true;
            def.configurable = true;
            Object.defineProperty(this.$data, key, def);
        }
    }
    return this;
};