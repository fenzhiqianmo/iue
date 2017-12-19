import _ from '../util';
import Observer from '../observer/observer';

exports._initProps = function () {
    let {el, props, isComponent} = this.$options;
    if (!isComponent || !props) return;
    let compiledProps = this.compileProps(el, props);
    this.applyProps(compiledProps);
};

exports._initData = function (data) {
    this.observer = Observer.create(data);
};

exports._initComputed = function () {
    let computed = this.$options.computed;
    if (!computed) return;
    for (let key in computed) {
        let def = computed[key];
        if (typeof def === 'function') {
            def = {
                get: def
            };
            def.enumerable = true;
            def.configurable = true;
            Object.defineProperty(this.$data, key, def);
        }
    }
};

exports._initMethods = function () {
    let {methods} = this.$options;
    if (!methods) return;
    for (let key in methods) {
        this[key] = () => {
            methods[key].apply(this, arguments);
        };
    }
};

exports._initProxy = function () {
    for (let key in this.$data) {
        // this[key] = this.$data[key];
        _.proxy(this, this.$data, key);
    }
};