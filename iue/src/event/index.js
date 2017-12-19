import api from './api';
import _ from '../util';

_.extend(exports, api);

exports._initEvents = function () {
    let options = this.$options;
    registerCallbacks(this, '$on', options.events);
};

function registerCallbacks(vm, action, events) {
    if (!events) return;
    for (let key in events) {
        let event = events[key];
        register(vm, action, key, event);
    }
}

function register(vm, action, key, event) {
    if (typeof event !== 'function') return;
    vm[action](key, event);
}
