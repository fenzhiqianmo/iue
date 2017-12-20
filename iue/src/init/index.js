import { extend } from '@/util';
import Observer from '@/observer';

(function e(o) { 
    extend(exports, o); 
    return e; 
})
(require('./element'))
(require('./api'))
(require('./api/lifecycle'))
(require('./initProps'))
(require('./initData'))
(require('./initComputed'))
(require('./initMethods'))
(require('./initProxy'));

exports.init = function (options) {
    let o = Object.assign(this, {
        $options: options,
        $parent: options.parent,
        $children: [],
        $data: {},
        _activeWatcher: {},
        _events: {},
        _directives: []
    }, false);
    !o.$options.isComponent && (o.__proto__ = o.$parent);
    extend(o.$options, o.constructor.options);
    o.$parent && (o.$parent.$children.push(o));
    o.$data = o.$options.data || {};
    o.initProps().initData(o.$data).initComputed().initProxy().initMethods().initEvents().initBindings();
    o.$options.el && o.$mount(o.$options.el);
};
