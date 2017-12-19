import _ from '../util';
import Directive from './';
import {compileGetter} from './parse/expression';

exports.compileProps = function (el, propOptions) {
    let props = [];
    Object.keys(propOptions).forEach((name) => {
        let options = propOptions[name] || {};
        let prop = {
            name,
            options,
            raw: null
        };
        let value;
        if ((value = _.getBindAttr(el, name))) { // 动态props
            prop.raw = value;
            prop.dynamic = true;
            prop.parentPath = value;
        } else if ((value = _.getAttr(el, name))) { // 静态props
            prop.raw = value;
        }
        props.push(prop);
    });
    return props;
};

exports.applyProps = function (props) {
    props.forEach((prop) => {
        if (prop.dynamic) {
            // 动态props
            let dirs = this.$parent._directives;
            dirs.push(
                new Directive('prop', null, this, {
                    expression: prop.raw,  // prop对应的父实例/组件的哪个数据, 如:user.name
                    arg: prop.name          // prop在当前组件中的属性键值, 如:name
                })
            );
        } else {
            this.initProp(prop.name, prop.raw, prop.dynamic);
        }
    });
};

exports.initProp = function (path, val, dynamic) {
    if (!dynamic) {
        // 静态prop
        this.$data[path] = val;
    } else {
        // 动态prop
        this.$data[path] = compileGetter(val)(this.$parent.$data);
    }
};
