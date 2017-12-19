const arrMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayFn = [];

arrMethods.forEach((method) => {
    arrayFn[method] = function () {
        let result = Array.prototype[method].apply(this, arguments);
        this.$observer.notify('set', null, this.length); // ???
        return result;
    };
});

export default arrayFn;
