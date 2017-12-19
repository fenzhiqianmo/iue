exports.$on = function (event, fn) {
    (this._events[event] || (this._events[event] = [])).push(fn);
    return this;
};

exports.$emit = function (event, val) {
    let cbs = this._events[event];
    let shouldPropagate = true;
    if (cbs) {
        shouldPropagate = false;
        let args = new Array(Array.from(arguments)[1]);
        cbs.forEach((cb) => {
            let res = cb.apply(this, args);
            if (res === true) {
                shouldPropagate = true;
            }
        });
    }

    return shouldPropagate;
};

exports.$dispatch = function (event, val) {
    let shouldPropagate = this.$emit.apply(this, arguments);
    if (!shouldPropagate) return this;
    let parent = this.$parent;
    // 遍历父链
    while (parent) {
        shouldPropagate = parent.$emit.apply(parent, arguments);
        parent = shouldPropagate ? parent.$parent : null;
    }
    return this;
};

exports.$broadcast = function (event, val) {
    let children = this.$children;
    let shouldPropagate = true;
    children.forEach((child) => {
        shouldPropagate = child.$emit.apply(child, arguments);
        if (shouldPropagate) {
            child.$broadcast.apply(child, arguments);
        }
    });
    return this;
};
