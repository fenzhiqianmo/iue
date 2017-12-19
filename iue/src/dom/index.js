import config from '../config';
import api from './api';
import _ from '../util';

_.extend(exports, api);

exports.before = function (el, target) {
    target.parentNode.insertBefore(el, target);
};

exports.after = function (el, target) {
    if (target.nextSibling) {
        exports.before(el, target.nextSibling);
    } else {
        target.parentNode.appendChild(el);
    }
};

exports.remove = function (el) {
    el.parentNode.removeChild(el);
};

exports.replace = function (target, el) {
    let parent = target.parentNode;
    parent.insertBefore(el, target);
    parent.removeChild(target);
};

exports.attr = function (node, attr) {
    var _attr = config.prefix + attr;
    let val = node.getAttribute(_attr);
    if (val) {
        node.removeAttribute(_attr);
    }
    return val;
};

exports.on = function (el, event, cb) {
    el.addEventListener(event, cb);
};

exports.getBindAttr = function (node, name) {
    return exports.getAttr(node, `:${name}`) || exports.getAttr(node, `${config.prefix}bind:${name}`);
};

exports.getAttr = function (node, attr) {
    let val = node.getAttribute(attr);
    if (val) {
        node.removeAttribute(attr);
    }
    return val;
};