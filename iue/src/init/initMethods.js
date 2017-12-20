/**
 * 初始化方法: 将method底下的方法proxy到vm实例上面去
 * @private
 */
exports.initMethods = function () {
    let {methods} = this.$options;
    if (!methods) return this;
    for (let key in methods) {
        this[key] = () => {
            methods[key].apply(this, arguments);
        };
    }
    return this;
};