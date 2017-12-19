import _ from '../../util';

module.exports = function (iue) {
    iue.extend = function (extendOptions) {
        let Super = this;
        let _extendOptions = extendOptions || {};
        let Sub = createClass();
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = _.mergeOptions(Super.options, _extendOptions);
        return Sub;
    };

    function createClass() {
        return new Function('return function iueComponent(options){ this._init(options)}')();  // eslint-disable-line
    }

    iue.component = function (id, definition) {
        this.options.components[id] = definition;
        return definition;
    };
};
