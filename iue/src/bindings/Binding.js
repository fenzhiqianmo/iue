/**
 * Binding构造函数
 */
function Binding() {
    // 用来存放各种watcher实例
    this._subs = [];
}

/**
 * 给你一个键值, 如果原来就有这个键值对应的Binding, 那么乖乖返回就好了
 * 否则就新建一个再返回
 */
Binding.prototype._addChild = function (key) {
    return this[key] || new Binding();
};

/**
 * 这个就是把watcher塞到_subs数组里面啦
 * 之后触发update的话,是会遍历这个数组滴
 */
Binding.prototype._addSub = function (sub) {
    this._subs.push(sub);
};

module.exports = Binding;
