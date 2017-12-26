import _ from '@/util';
import Directive from '../../directives';

/**
 * 应用属性到vm实例上
 * 如果是动态属性, 需要额外走Directive、Watcher那一套流程
 * 因为只有这样,当父实例/组件的属性发生变化时,才能将变化传导到子组件
 * @param props {Array} 解析之后的props数组
 */
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
