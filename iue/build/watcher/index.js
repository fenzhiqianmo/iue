/*       */
import Batcher from './batcher';
import expParser from '../compile/parse/expression';
import Observer from '../observer/observer';

let uid = 0;
let batcher = new Batcher();

function Watcher(vm        , expression        , cb          , ctx        ) {
    this.id = ++uid;
    this.vm = vm;
    this.expression = expression;
    this.cb = cb;
    this.ctx = ctx || vm;
    this.deps = Object.create(null);
    this.getter = expParser.compileGetter(expression);
    this.initDeps(expression);
}

Watcher.prototype.initDeps = function (path) {
    this.addDep(path);
    this.value = this.get();
};

Watcher.prototype.addDep = function (path) {
    let vm = this.vm;
    let deps = this.deps;
    if (deps[path]) return;
    deps[path] = true;
    let binding = vm._getBindingAt(path) || vm._createBindingAt(path);
    binding._addSub(this);
};

Watcher.prototype.update = function () {
    if (!batcher.isFlushing) {
        batcher.push(this);
    } else {
        setTimeout(() => {
            batcher.push(this);
        });
    }
};

Watcher.prototype.beforeGet = function () {
    Observer.emitGet = true;
    this.vm._activeWatcher = this;
};

Watcher.prototype.get = function () {
    this.beforeGet();
    let value = this.getter.call(this.vm, this.vm);
    this.afterGet();
    return value;
};

Watcher.prototype.afterGet = function () {
    Observer.emitGet = false;
    this.vm._activeWatcher = null;
};

Watcher.prototype.run = function () {
    let value = this.get();
    let oldValue = this.value;
    this.value = value;
    this.cb.call(this.ctx, value, oldValue);
};

module.exports = Watcher;
