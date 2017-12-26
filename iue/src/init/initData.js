import Observer from '@/observer';
/**
 * 初始化监听者数据Observer
 */
exports.initData = function (data) {
    this.observer = Observer.create(data);
    return this;
};
