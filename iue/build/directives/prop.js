module.exports = {
    bind: function () {
        this.vm.initProp(this.arg, this.expression, true);
    },

    update: function (value) {
        this.vm.$set(this.arg, value);
    }
};
