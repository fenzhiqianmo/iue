import _ from '../util';
import config from '../config';

module.exports = {
    bind: function () {
        if (!this.el.__iue__) {
            // 判断该组件是否已经被挂载
            this.anchor = document.createComment(`${config.prefix}component`);
            this.vm.replace(this.el, this.anchor);
            this.setComponent(this.expression);
        }
    },

    update: function () {

    },

    setComponent: function (value) {
        if (value) {
            this.Component = this.vm.$options.components[value];
            this.ComponentName = value;
            this.mountComponent();
        }
    },

    mountComponent: function () {
        let newComponent = this.build();
        newComponent.$before(this.anchor);
    },

    build: function () {
        if (this.Component) {
            let options = {
                name: this.ComponentName,
                el: this.el.cloneNode(),
                parent: this.vm,
                isComponent: true
            };
            let child = new this.Component(options);
            return child;
        }
    }
};
