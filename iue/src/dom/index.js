import config from '@/config';
import api from './api.js';
import _ from '@/util';

_.extend(exports, api);
/**
 * insertBefore
 */
exports.before = function (el, target) {
    target.parentNode.insertBefore(el, target);
};

/**
 * 因为没有原声的insertAfter方法, 所以需要迂回处理一下
 */
exports.after = function (el, target) {
    if (target.nextSibling) {
        exports.before(el, target.nextSibling);
    } else {
        target.parentNode.appendChild(el);
    }
};

/**
 * removeSelf
 */
exports.remove = function (el) {
    el.parentNode.removeChild(el);
};

/**
 * 用新的节点代替旧的节点
 */
exports.replace = function (target, el) {
    let parent = target.parentNode;
    parent.insertBefore(el, target);
    parent.removeChild(target);
};

/**
 * 把node节点的attr取出来(并且移除该attr)
 * 注意! 这里会把该attr移除! 专门用来处理v-if这样的属性
 */
exports.attr = function (node, attr) {
    var _attr = config.prefix + attr;
    let val = node.getAttribute(_attr);
    if (val) {
        node.removeAttribute(_attr);
    }
    return val;
};

/**
 * 事件绑定
 */
exports.on = function (el, event, cb) {
    el.addEventListener(event, cb);
};

/**
 * 获取动态数据绑定属性值,
 * 比如 b-bind:name="user.name" 和 :name="user.name"
 */
exports.getBindAttr = function (node, name) {
    return exports.getAttr(node, `:${name}`) || exports.getAttr(node, `${config.prefix}bind:${name}`);
};

/**
 * 获取节点属性值,并且移除该属性
 */
exports.getAttr = function (node, attr) {
    let val = node.getAttribute(attr);
    if (val) {
        node.removeAttribute(attr);
    }
    return val;
};