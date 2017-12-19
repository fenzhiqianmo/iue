import _ from '../util';
import config from '../config';

exports.bind = function () {
    let el = this.el;
    this.ref = document.createComment(`${config.prefix}-if`);
    _.after(this.ref, el);
    _.remove(el);
    this.inserted = false;
};

exports.update = function (value) {
    if (value) {
        // 挂载子实例
        if (!this.inserted) {
            if (!this.childBM) {
                this.build();
            }
            this.childBM.$before(this.ref);
            this.inserted = true;
        }
    } else {
        // 卸载子实例
        if (this.inserted) {
            this.childBM.$remove();
            this.inserted = false;
        }
    }
};

exports.build = function () {
    this.childBM = new _.Iue({
        el: this.el,
        parent: this.vm
    });
};
