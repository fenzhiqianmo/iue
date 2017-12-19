import Watcher from '../watcher';
import _ from '../util';

function Directive(name, el, vm, descriptor) {
    this.name = name;
    this.el = el;
    this.vm = vm;
    this.expression = descriptor.expression;
    this.arg = descriptor.arg;
    this._initDef();
    this._bind();
}

Directive.prototype._bind = function () {
    if (!this.expression) return;

    this.bind && this.bind();

    if (this.name === 'component') {
        this.update && this.update();
    } else {
        this._watcher = new Watcher(
            (this.name === 'prop' ? this.vm.$parent : this.vm),
            this.expression,
            this._update,
            this
        );
        this.update(this._watcher.value);
    }
};

Directive.prototype._initDef = function () {
    let def = this.vm.$options.directives[this.name];
    _.extend(this, def);
};

Directive.prototype._update = function (value, oldValue) {
    this.update(value, oldValue);
};

module.exports = Directive;
