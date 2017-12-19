import Binding from './Binding';

exports._updateBindingAt = function () {
    this._updateSelfBindingAt(...arguments);
    this._updateChildrenBindingAt(...arguments);
};

exports._updateSelfBindingAt = function (event, path) {
    let pathAry = path.split('.');
    let r = this._rootBinding;
    for (let i = 0, l = pathAry.length; i < l; i++) {
        let key = pathAry[i];
        r = r[key];
        if (!r) return;
    }
    let subs = r._subs;
    subs.forEach((watcher) => {
        watcher.cb();
    });
};

exports._updateChildrenBindingAt = function () {
    if (!this.$children.length) return;
    this.$children.forEach((child) => {
        if (child.$options.isComponent) return;
        child._updateBindingAt(...arguments);
    });
};

exports._initBindings = function () {
    this._rootBinding = new Binding();

    this.observer.on('set', this._updateBindingAt.bind(this))
        .on('get', this._collectDep.bind(this));
};

exports._getBindingAt = function (path) {
    let b = this._rootBinding;
    let pathAry = path.split('.');
    for (let i = 0; i < pathAry.length; i++) {
        let key = pathAry[i];
        b = b[key];
        if (!b) return false;
    }
    return b;
};

exports._createBindingAt = function (path) {
    let b = this._rootBinding;
    let pathAry = path.split('.');

    for (let i = 0; i < pathAry.length; i++) {
        let key = pathAry[i];
        b = b[key] = b._addChild(key);
    }
    return b;
};

exports._collectDep = function (event, path) {
    let watcher = this._activeWatcher;
    if (watcher) {
        watcher.addDep(path);
    }
};
