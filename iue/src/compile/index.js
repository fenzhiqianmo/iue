import Directive from '../directives';
import textParser from './parse/text';
import dirParser from './parse/directive';
import _ from '../util';
import config from '../config';
import transclude from './transclude';
import props from './props';

_.extend(exports, props);

const priorityDirs = [
    'if',
    'repeat'
];

exports._compile = function () {
    this.$el = transclude(this.$el, this.$options);
    this._compileNode(this.$el);
};

exports._compileElement = function (node) {
    if (this._checkComponentDirs(node)) {
        return;
    }

    let hasAttributes = node.hasAttributes();
    if (hasAttributes && this._checkPriorityDirs(node)) {
        return;
    }
    if (hasAttributes) {
        this._compileAttrs(node);
    }

    if (node.hasChildNodes()) {
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }
};

exports._compileTextNode = function (node) {
    let tokens = textParser.parse(node.nodeValue);
    if (!tokens) return;

    tokens.forEach((token) => {
        if (token.tag) {
            let value = token.value;
            let el = document.createTextNode('');
            this.before(el, node);
            this._bindDirective('text', value, el);
        } else {
            let el = document.createTextNode(token.value);
            this.before(el, node);
        }
    });

    this.remove(node);
};

exports._compileNode = function (node) {
    switch (node.nodeType) {
    // text
    case 1:
        this._compileElement(node);
        break;
    // node
    case 3 :
        this._compileTextNode(node);
        break;
    default:
        return;
    }
};

exports._bindDirective = function (name, value, node) {
    let descriptors = dirParser.parse(value);
    let dirs = this._directives;
    descriptors.forEach((descriptor) => {
        dirs.push(
            new Directive(name, node, this, descriptor)
        );
    });
};

exports._checkPriorityDirs = function (node) {
    for (let i = 0, length = priorityDirs.length; i < length; i++) {
        let dir = priorityDirs[i];  
        let value = this.attr(node, dir);
        if (value) {
            this._bindDirective(dir, value, node);
            return true;
        }
    }
};

exports._checkComponentDirs = function (node) {
    let tagName = node.tagName.toLowerCase();
    if (this.$options.components[tagName]) {
        let dirs = this._directives;
        dirs.push(
            new Directive('component', node, this, {
                expression: tagName
            })
        );
        return true;
    }
};

exports._compileAttrs = function (node) {
    let attrs = Array.from(node.attributes);
    let registry = this.$options.directives;
    attrs.forEach((attr) => {
        let attrName = attr.name;
        let attrValue = attr.value;
        if (attrName.indexOf(config.prefix) === 0) {
            // 特殊属性 如: v-on:"submit"
            let dirName = attrName.slice(config.prefix.length);
            if (!registry[dirName]) return;
            this._bindDirective(dirName, attrValue, node);
        } else {
            // 普通属性 如: data-id="{{user.id}}"
            this._bindAttr(node, attr);
        }
    });
};

exports._bindAttr = function (node, attr) {
    let {name, value} = attr;
    let tokens = textParser.parse(value);
    if (!tokens) return;
    this._bindDirective('attr', `${name}:${tokens[0].value}`, node);
};
