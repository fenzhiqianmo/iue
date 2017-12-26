import {compileGetter} from '../compileGetter.js';

/**
 * 将prop设置到当前组件实例的$data中去, 这样一会儿initData的时候才能监听到这些数据
 * 如果是动态属性, 还需要跑到父实例/组件那里去取值
 * @param path {String} 组件prop键值，如"name"
 * @param val {String} 组件prop值，如果是静态prop，那么直接是"How are you"这种。
                        如果是动态prop，那么是"user.name"这种，需要从父实例那里去获取实际值
 * @param dynamic {Boolean} true代表是动态prop， false代表是静态prop
 */
exports.initProp = function (path, val, dynamic) {
    if (!dynamic) {
        // 静态prop
        this.$data[path] = val;
    } else {
        // 动态prop
        this.$data[path] = compileGetter(val)(this.$parent.$data);
    }
};
