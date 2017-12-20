import Observer from '@/observer';

exports.initData = function (data) {
    this.observer = Observer.create(data);
    return this;
};
