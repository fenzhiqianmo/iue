import _ from '@/util';

/**
 * 初始化节点
 */
exports.initSelector = function (el) {
    let _el = el;
    if (typeof el === 'string') {
        let selector = el;
        this.$el = _el = document.querySelector(el);
        !_el && _.warn(`Cannot find element: ${selector}`);
    } else {
        this.$el = _el;
    }
    this.$el.__iue__ = this;
};
