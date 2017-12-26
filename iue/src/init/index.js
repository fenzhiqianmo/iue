import { extend } from '@/util';
import Observer from '@/observer';
import Watcher from '@/watcher';
import initSelector from './initSelector';
import initProps from './initProps';
import initData from './initData';
import initComputed from './initComputed';
import initMethods from './initMethods';
import initProxy from './initProxy';

(function ex(obj) {
    extend(exports, obj);
    return ex;
})
(initSelector)
(initProps)
(initData)
(initComputed)
(initMethods)
(initProxy);

exports.init = function (options) {
    function $set(exp, val) {
        let ee = exp.split('.');
        let length = ee.length;
        let data = this.$data;
        for (let i = 0; i < length - 1; i++) {
            let key = ee[i];
            data = data[key];
        }
        data[ee[length - 1]] = val;
    };
    function $watch(exp, cb) { // vm.$watch(function(){...})
        new Watcher(this, exp, cb, this);
    };
    function $mount (el) {
        this.initSelector(el);
        this._compile();
    };
    let o = Object.assign(this, {
        $options: options,
        $parent: options.parent,
        $children: [],
        $data: {},
        $set,
        $watch,
        $mount,
        _activeWatcher: {},
        _events: {},
        _directives: []
    }, false);
    // 
    !o.$options.isComponent && (o.__proto__ = o.$parent);
    extend(o.$options, o.constructor.options);
    // 判断如果有父组件的话，则将自己加入父组件的子组件列表中
    o.$parent && (o.$parent.$children.push(o));
    // 初始化
    o.$data = o.$options.data || {};
    o.initProps().initData(o.$data).initComputed().initProxy().initMethods().initEvents().initBindings();
    o.$options.el && o.$mount(o.$options.el);
};
