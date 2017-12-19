module.exports = function (el, options) {
    let tpl = options.template;
    if (!tpl) {
        return el;
    }
    let ret = document.querySelector(options.template);
    if (ret) {
        return ret.content.children[0];
    }
    var parser = new DOMParser();
    var doc = parser.parseFromString(tpl, 'text/html');
    return doc.querySelector('body').firstChild;
};
