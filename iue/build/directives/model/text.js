exports.bind = function () {
    let el = this.el;
    this.handler = () => {
        this.vm.$set(this.expression, el.value);
    };
    this.vm.on(el, 'input', this.handler);
};

exports.update = function (value) {
    this.el.value = value;
};
