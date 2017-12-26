import api from './api.js';
import _ from '@/util';

_.extend(exports, api);
/**
 * 初始化事件events
 */
exports.initEvents = function () {
    let options = this.$options;
    registerCallbacks(this, '$on', options.events);
    return this;
};

/**
 * 遍历实例的所有事件
 */
function registerCallbacks(vm, action, events) {
    if (!events) return;
    for (let key in events) {
        let event = events[key];
        register(vm, action, key, event);
    }
}

/**
 * 注册单个事件
 */
function register(vm, action, key, event) {
    if (typeof event !== 'function') return;
    vm[action](key, event);
}
