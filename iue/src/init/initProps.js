/**
 * 初始化组件的props,将props解析并且填充到$data中去
 * 在这个过程中,如果是动态属性, 那么会在父实例生成对应的directive和watcher
 * 用于prop的动态更新
 * @private
 */
exports.initProps = function () {
    let {el, props, isComponent} = this.$options;
    if (!isComponent || !props) return this;
    let compiledProps = this.compileProps(el, props);
    this.applyProps(compiledProps);
    return this;
};