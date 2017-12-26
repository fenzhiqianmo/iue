import Directive from '@/directives';
import { textParser } from './textParser.js';
import { dirParser } from './dirParser.js';
import { extend } from '@/util';
import config from '@/config';
import transclude from './transclude';
import applyProps from './props/applyProps';
import compileProps from './props/compileProps';
import initProps from './props/initProps';

(function ex(obj) {
    extend(exports, obj);
    return ex;
})
(applyProps)
(compileProps)
(initProps)
const priorityDirs = [
    'if',
    'repeat'
];

exports._compile = function () {
    this.$el = transclude(this.$el, this.$options);
    this._compileNode(this.$el);
};

/**
 * 渲染节点
 */
exports._compileElement = function (node) {
    // 判断节点是否是组件指令
    if (this._checkComponentDirs(node)) {
        return;
    }

    let hasAttributes = node.hasAttributes();

    // 解析高优指令
    if (hasAttributes && this._checkPriorityDirs(node)) {
        return;
    }

    // 解析属性
    if (hasAttributes) {
        this._compileAttrs(node);
    }

    if (node.hasChildNodes()) {
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }
};

/**
 * 渲染文本节点
 */
exports._compileTextNode = function (node) {
    let tokens = textParser(node.nodeValue);
    // console.log(tokens);
    if (!tokens) return;

    tokens.forEach((token) => {
        if (token.tag) {
            // 指令节点
            let value = token.value;
            let el = document.createTextNode('');
            this.before(el, node);
            this._bindDirective('text', value, el);
        } else {
            // 普通文本节点
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

/**
 * 生成指令
 */
exports._bindDirective = function (name, value, node) {
    let descriptors = dirParser(value);
    let dirs = this._directives;
    descriptors.forEach((descriptor) => {
        dirs.push(
            new Directive(name, node, this, descriptor)
        );
    });
};

/**
 * 检查node节点是否包含某些如 "v-if" 这样的高优先级指令
 * 如果包含,那么就不用走原先的DOM遍历了, 直接走指令绑定
 */
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

/**
 * 判断节点是否是组件指令,如 <my-component></my-component>
 * 如果是,则构建组件指令
 */
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

/**
 * 循环解析属性(包括特殊属性和普通属性)
 */
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
    let tokens = textParser(value);
    if (!tokens) return;
    this._bindDirective('attr', `${name}:${tokens[0].value}`, node);
};
