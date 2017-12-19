import _ from '../util';
import element from './element';
import api from './api';
import lifecycle from './api/lifecycle';
import Observer from '../observer/observer';
import init from './init';

let self = exports;
_.extend(self, element);
_.extend(self, api);
_.extend(self, lifecycle);
_.extend(self, init);

exports._init = function (options) {
    this._activeWatcher = null;
    this.$options = options;
    this.$parent = options.parent;
    this.$children = [];
    this._events = {};

    if (!this.$options.isComponent) {
        this.__proto__ = this.$parent; 
    }
    _.extend(this.$options, this.constructor.options);

    if (this.$parent) {
        this.$parent.$children.push(this);
    }
    
    this.$data = options.data || {};

    // 初始化组件props
    this._initProps();
    
    // 初始化data, 主要是做Observer,数据监听这一块
    this._initData(this.$data);
    
    // 初始化计算属性
    this._initComputed();
    
    // 初始化数据代理
    this._initProxy();

    // 初始化方法
    this._initMethods();

    /********以上函数由init.js直接定义********/

    // 初始化事件
    this._initEvents();

    // binding、watcher、directive是实现动态数据绑定的三大核心对象
    this._initBindings();

    // 指令数组,用于存放解析DOM模板的时候生成的指令
    this._directives = [];

    // 解析DOM模板, 渲染真实的DOM
    if (options.el) {
        this.$mount(options.el);
    }
};
