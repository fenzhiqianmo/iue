/**
 * 初始化方法: 将method底下的方法代理到vm实例上面去
 */
exports.initMethods = function () {
    let {methods} = this.$options;
    if (methods) {
    	for (let key in methods) {
	        this[key] = () => {
	            methods[key].apply(this, arguments);
	        };
	    }
    }
    return this;
};