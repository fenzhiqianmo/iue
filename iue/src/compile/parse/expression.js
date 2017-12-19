exports.compileGetter = function (path) {
    var _path = path;
    _path = path.split('.');
    let boby = 'if (o !=null';
    let pathString = 'o';
    let key;
    for (let i = 0; i < _path.length - 1; i++) {
        key = _path[i];
        pathString += `.${key}`;
        boby += ` && ${pathString} != null`;
    }
    key = _path[_path.length - 1];
    pathString += `.${key}`;
    boby += `) return ${pathString}`;
    return new Function('o', boby);
};
