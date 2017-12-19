import _ from '../../util';
const objectFn = {};

_.define(objectFn, '$add', function (key, val) {
    if (this.hasOwnProperty(key)) return;
    _.define(this, key, val, true);
    let ob = this.$observer;
    ob.observe(key, val);
    ob.convert(key, val);
});

_.define(objectFn, '$delete', function (key) {
    if (!this.hasOwnProperty(key)) return;
    delete this[key];
});

module.exports = objectFn;
