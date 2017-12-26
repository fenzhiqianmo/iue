import _ from '@/util';

/**
 * 解析props参数, 包括动态属性和静态属性
 * @param el {Element} 组件节点,比如: <my-component b-bind:name="user.name" message="hello"></my-component>
 * @param propOptions {Object} iue.extend的时候传进来的prop对象参数, 形如 {name:{}, message:{}}
 * @returns {Array} 解析之后的props数组,
 * 形如: [
 *          {
 *              "name":"name",     // 组件属性名
 *              "options":{},      // 原先iue.extend传过来的属性对应的参数, 暂时未空, 之后会放一些参数校验之类的
 *              "raw":"user.name", // 属性对应的值
 *              "dynamic":true,    // true代表是动态属性,也就是从父实例/组件那里获取值
 *              "parentPath":"user.name"   // 属性值在父实例/组件中的路径
 *          },
 *          {
 *              "name":"message",
 *              "options":{},
 *              "r
 *              
 *              aw":"How are you?"
 *          }
 *     ]
 */
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

