import arrayFn from './api/array';
import objectFn from './api/object';

const ARRAY = 0;
const OBJECT = 1;

let uid = 0;

Observer.emitGet = true;

Observer.create = function (val) {
    if (Array.isArray(val)) {
        return new Observer(val, ARRAY);
    } else if (typeof val === 'object') {
        return new Observer(val, OBJECT);
    }
};

function Observer(obj, type) {
    this.obj = obj;
    this.id = ++uid;
    Object.defineProperty(obj, '$observer', {
        value: this,
        enumerable: false,
        writable: true,
        configurable: true
    });
    if (type === ARRAY) {
        obj.__proto__ = arrayFn;
        this.link(obj);
    } else if (type === OBJECT) {
        obj.__proto__ = objectFn;
        this.walk(obj);
    }
}

Observer.prototype.walk = function (obj) {
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) return;
        // 递归
        this.observe(key, obj[key]);
        this.convert(key, obj[key]);
    }
};

Observer.prototype.link = function (items) {
    items.forEach((val, index) => {
        this.observe(index, val);
    });
};

Observer.prototype.observe = function (key, val) {
    let ob = Observer.create(val);
    if (!ob) return;
    ob.parent = {
        key,
        ob: this
    };
};

Observer.prototype.convert = function (key, val) {
    let ob = this;
    let _val = val;
    Object.defineProperty(this.obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            if (Observer.emitGet) {
                ob.notify('get', key);
            }
            return _val;
        },
        set: function (newVal) {
            if (newVal === _val) return;
            _val = newVal;
            ob.notify('set', key, newVal);
        }
    });
};

Observer.prototype.on = function (event, fn) {
    this._cbs = this._cbs || {};
    if (!this._cbs[event]) {
        this._cbs[event] = [];
    }
    this._cbs[event].push(fn);

    // 这里return this是为了实现.on(...).on(...)这样的级联调用
    return this;
};

Observer.prototype.off = function (event, fn) {
    this._cbs = this._cbs || {};
    // 取消所有订阅事件
    if (!arguments.length) {
        this._cbs = {};
        return this;
    }
    let callbacks = this._cbs[event];
    if (!callbacks) return this;

    // 取消特定事件
    if (arguments.length === 1) {
        delete this._cbs[event];
        return this;
    }
    // 取消特定事件的特定回调函数
    for (let i = 0, cb; i < callbacks.length; i++) {
        cb = callbacks[i];
        if (cb === fn) {
            callbacks.splice(i, 1);
            break;
        }
    }
    return this;
};

Observer.prototype.notify = function (event, path, val) {
    this.emit(event, path, val);
    let parent = this.parent;
    if (!parent) return;
    let ob = parent.ob;
    let key = parent.key;
    let parentPath;
    // 此处为为了兼容数组的情况
    if (path) {
        parentPath = `${key}.${path}`;
    } else {
        parentPath = key;
    }
    ob.notify(event, parentPath, val);
};

Observer.prototype.emit = function (event, path, val) {
    this._cbs = this._cbs || {};
    let callbacks = this._cbs[event];
    if (!callbacks) return;
    callbacks = callbacks.slice(0);
    callbacks.forEach((cb, i) => {
        callbacks[i].apply(this, arguments);
    });
};

module.exports = Observer;
