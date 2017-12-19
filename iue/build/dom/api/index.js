import _ from '../../util';

exports.$before = function (target) {
    this.before(this.$el, target);
};

exports.$remove = function () {
    if (this.$el.parentNode) {
        this.remove(this.$el);
    }
};
