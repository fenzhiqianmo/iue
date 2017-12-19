import _ from '../../util';

/**
 * 插入iue实例
 * @param target {Element}
 */
exports.$before = function (target) {
    this.before(this.$el, target);
};

/**
 * 移除iue实例
 */
exports.$remove = function () {
    if (this.$el.parentNode) {
        this.remove(this.$el);
    }
};
