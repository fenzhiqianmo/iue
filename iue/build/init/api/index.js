import Watcher from '../../watcher';

exports.$watch = function (exp, cb) {
    new Watcher(this, exp, cb, this);
};

exports.$set = function (exp, val) {
    let ee = exp.split('.');
    let length = ee.length;
    let data = this.$data;
    for (let i = 0; i < length - 1; i++) {
        let key = ee[i];
        data = data[key];
    }
    data[ee[length - 1]] = val;
};

