
exports.parse = function (s) {
    let dirs = [];
    if (s.indexOf(':') !== -1) {
        let ss = s.split(':');
        dirs.push({
            raw: s,
            arg: ss[0],
            expression: ss[1]
        });
    } else {
        dirs.push({
            raw: s,
            expression: s
        });
    }

    return dirs;
};
