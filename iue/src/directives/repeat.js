import config from '../config';
import _ from '../util';

let uid = 0;

exports.bind = function () {
    this.id = `__b_repeat_${++uid}`;
    this.ref = document.createComment(`${config.prefix}repeat`);
    _.replace(this.el, this.ref);
};

exports.update = function (data) {
    if (data && !Array.isArray(data)) {
        _.warn(`Invalid value for b-repeat:${data}\nExpects Array`);
        return;
    }
    this.vms = this.diff(
        data || [],
        this.vms
    );
};

exports.diff = function (data, oldVms) {
    let vms = new Array(data.length);
    let ref = this.ref;
    data.forEach((obj, i) => {
        let vm = this.getVm(obj);
        if (vm) {
            // 可复用的实例
            vm._reused = true;
        } else {
            vm = this.build(obj, i);
        }
        vms[i] = vm;

        if (!oldVms) {
            vm.$before(ref);
        }
    });
    if (!oldVms) return vms;
    oldVms.forEach((oldVm) => {
        if (oldVm._reused) return;
        oldVm.$remove();
    });
    for (let l = vms.length, i = l - 1; i >= 0; i--) {
        let vm = vms[i];
        let targetNext = vms[i + 1];
        if (!targetNext) {
            if (!vm._reused) vm.$before(ref);
        } else {
            if (vm._reused) {
                if (targetNext.$el !== vm.$el.nextSibling) {
                    vm.$before(targetNext.$el);
                }
            } else {
                vm.$before(targetNext.$el);
            }
        }
    }

    vms.forEach((vm) => {
        vm._reused = false;
    });

    return vms;
};

exports.build = function (data) {
    let alias = this.arg;
    let d = {};
    if (alias) {
        d[alias] = data;
    }
    let vm = new _.Iue({
        el: this.el.cloneNode(true),
        data: d,
        parent: this.vm
    });

    this.cacheVm(data, vm);
    return vm;
};

exports.getVm = function (data) {
    return data[this.id];
};

exports.cacheVm = function (data, vm) {
    data[this.id] = vm;
};
