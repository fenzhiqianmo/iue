import _ from '@/util';
/**
 * 初始化代理,将 $data里面的数据代理到vm实例上面去
 * @private
 */
exports.initProxy = function () {
    for (let key in this.$data) {
        _.proxy(this, this.$data, key);
    }
    return this;
};