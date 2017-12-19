/**
 * Binding构造函数
 * @constructor
 */
function Binding() {
    this._subs = [];
}

Binding.prototype._addChild = function (key) {
    return this[key] || new Binding();
};

Binding.prototype._addSub = function (sub) {
    this._subs.push(sub);
};

module.exports = Binding;
